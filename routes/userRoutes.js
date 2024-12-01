const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch Single User Data by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    console.log("Received request to fetch user with ID:", req.params.id); // Log user ID from request

    const { id } = req.params; // Fetch the ID from the URL parameter
    const user = await User.findById(id); // Find the user by ID in the database

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If user is not found, return a 404
    }

    res.status(200).json({ message: 'User fetched successfully', user }); // Send user data
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error }); // Send server error
  }
});




module.exports = router;
