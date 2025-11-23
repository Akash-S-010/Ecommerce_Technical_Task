import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { sendOTPEmail } from '../utils/mailer.js';
import { generateToken } from '../utils/Token.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// -----User Signup---------
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with OTP
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt,
    });

    await newUser.save();

    // Send OTP to user's email using the mailer utility
    await sendOTPEmail(email, otp, 'Verify your email');

    res.status(201).json({
      message: 'Signup successfully. OTP sent to your email.',
      userId: newUser._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
}



// -----OTP Verification
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Update user as verified
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.isVerified = true;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.email);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    };

    res
      .cookie('token', token, cookieOptions)
      .status(200).json({
        message: 'Email verified successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          addresses: user.addresses,
        }
      });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ message: 'Server error during OTP verification' });
  }
}



// -----User Login (Email & Password)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.email);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    };

    res
      .cookie('token', token, cookieOptions)
      .status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          addresses: user.addresses,
        }
      });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
}


// -----Verify Login OTP
export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id, user.email);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    };

    res
      .cookie('token', token, cookieOptions)
      .status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          addresses: user.addresses,
        }
      });
  } catch (error) {
    console.error('Login OTP verification error:', error);
    return res.status(500).json({ message: 'Server error during OTP verification' });
  }
}


// -----user profile data update
export const updateProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const userId = req.user.userId; // From auth middleware

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    user.name = name || user.name;
    user.mobile = mobile || user.mobile;

    // Save updated user
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ message: 'Server error during profile update' });
  }
};


// -----User Logout
export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
}


export const checkUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).select('_id name email mobile addresses');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Check user error:', error);
    return res.status(500).json({ message: 'Server error fetching user' });
  }
}


// -----Google OAuth Authentication---------
export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      console.log('❌ No credential provided');
      return res.status(400).json({ message: 'No credential provided' });
    }

    // Check if GOOGLE_CLIENT_ID is set
    if (!process.env.GOOGLE_CLIENT_ID) {
      console.log('❌ GOOGLE_CLIENT_ID not set in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    console.log('✓ Verifying Google token...');
    console.log('Expected audience:', process.env.GOOGLE_CLIENT_ID);

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    console.log('✓ Token verified successfully for:', email);

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      console.log('✓ User exists:', email);
      // User exists - check if it's a Google account
      if (!user.googleId) {
        // User registered with email/password, link Google account
        user.googleId = googleId;
        await user.save();
        console.log('✓ Linked Google account to existing user');
      }
    } else {
      console.log('✓ Creating new user:', email);
      // Create new user with Google account
      user = new User({
        name,
        email,
        googleId,
        isVerified: true, // Google accounts are pre-verified
      });
      await user.save();
      console.log('✓ New user created successfully');
    }

    // Generate JWT token
    const token = generateToken(user._id, user.email);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    };

    res
      .cookie('token', token, cookieOptions)
      .status(200).json({
        message: 'Google login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          addresses: user.addresses,
        }
      });
  } catch (error) {
    console.error('❌ Google auth error:', error.message);
    console.error('Full error:', error);
    return res.status(500).json({
      message: 'Server error during Google authentication',
      error: error.message
    });
  }
};