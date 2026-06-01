import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Set token in httpOnly cookie
const setTokenCookie = (res, token) => {
  res.cookie('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/'
  });
};

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public (should be protected in production)
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      role: 'admin',
    });

    if (admin) {
      const token = generateToken(admin._id);
      setTokenCookie(res, token);
      
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id);
      setTokenCookie(res, token);
      
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie('adminToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/'
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update admin profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      admin.username = req.body.username || admin.username;
      admin.email = req.body.email || admin.email;
      
      if (req.body.password) {
        admin.password = req.body.password;
      }

      const updatedAdmin = await admin.save();

      res.json({
        _id: updatedAdmin._id,
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
