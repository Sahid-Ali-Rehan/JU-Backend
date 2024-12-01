const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Fetch All Users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ message: 'Users fetched successfully', users });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// Fetch Single User Data
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User fetched successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
