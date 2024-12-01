const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Add Product (Admin Only)
router.post('/add', async (req, res) => {
    try {
      const {
        productName,
        description,
        images,
        availableColors,
        availableSizes,
        stock,
        price,
        discount,
        productCode,
        isBestSeller,
      } = req.body;
  
      // Create a new product
      const product = new Product({
        productName,
        description,
        images,
        availableColors,
        availableSizes,
        stock,
        price,
        discount,
        productCode,
        isBestSeller,
      });
  
      await product.save();
  
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

// Update Product (Admin Only)
router.put('/update/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete Product (Admin Only)
router.delete('/delete/:id',  async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the product by its ID
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

module.exports = router;
