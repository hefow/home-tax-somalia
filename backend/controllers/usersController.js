import User from '../models/Users.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ 
      $or: [
        { email },
        { username }
      ] 
    });

    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email 
          ? 'Email already registered' 
          : 'Username already taken' 
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      phone_number
    });

    if (user) {
      // Generate token immediately after user creation
      const token = generateToken(user._id);
      
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        token // Include token in response
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    console.log('User ID:', req.user._id);
    const user = await User.findById(req.user._id);

    if (user) {
      console.log('User found:', user);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      });
    } else {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic info
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;

    // Handle password change
    if (req.body.newPassword) {
      const isMatch = await user.matchPassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = req.body.newPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req, res) => {
  try {
    // In a real-world scenario, you might want to invalidate the token on the server-side
    // For now, we'll just send a success response
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add this new controller function
export const verifyPassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { currentPassword } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    res.json({ message: 'Password verified' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
