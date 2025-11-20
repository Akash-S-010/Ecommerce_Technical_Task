import User from '../models/User.js';

// -------Add a new address to the user's profile for delivery select multiple address
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { label, street, city, state, pincode, country } = req.body;

    if (!label || !street || !city || !state || !pincode) {
      return res.status(400).json({ message: 'Please provide all required address fields' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses.push({ label, street, city, state, pincode, country });
    await user.save();

    res.status(201).json({ message: 'Address added successfully', addresses: user.addresses });
  } catch (error) {
    console.error('Error adding address:', error);
    return res.status(500).json({ message: 'Server error while adding address' });
  }
};

// -------Get all addresses for the logged-in user
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return res.status(500).json({ message: 'Server error while fetching addresses' });
  }
};

// -------Update a specific address of the   logged-in user
export const updateAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { addressId } = req.params;
    const { label, street, city, state, pincode, country } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    address.label = label || address.label;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.pincode = pincode || address.pincode;
    address.country = country || address.country;

    await user.save();

    res.status(200).json({ message: 'Address updated successfully', addresses: user.addresses });
  } catch (error) {
    console.error('Error updating address:', error);
    return res.status(500).json({ message: 'Server error while updating address' });
  }
};

// -------Delete a specific address of the logged-in user 
export const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses.pull({ _id: addressId });
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', addresses: user.addresses });
  } catch (error) {
    console.error('Error deleting address:', error);
    return res.status(500).json({ message: 'Server error while deleting address' });
  }
};