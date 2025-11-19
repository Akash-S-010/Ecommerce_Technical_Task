import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { genOtp } from '../utils/otp.js';
import { sendEmail } from '../utils/mailer.js';


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
    const otp = genOtp();
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
    await sendEmail(email, 'otp', { otp, minutes: 10 });

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

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Update user as verified
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
}



// -----User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
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
    res.status(500).json({ message: 'Server error during profile update' });
  }
};


// -----User Logout
export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
}


export const checkUser = (req, res) => {
  const user = req.user;
  res.status(200).json({_id: user._id, name: user.name, email: user.email, mobile: user.mobile});
}