const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { createProduct } = require("../controllers/productController");
const multer = require("multer");
const { isStudent, verifyCampusAccess, isProductOwnerOrAdmin,isAdmin } = require("../middleware/roleMiddleware");
const path = require("path");
const Product = require("../models/Product");
// PUT route to add images to an existing product
// Configure multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.put("/add-images/:id", protect, upload.array("images"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only allow owner or admin to add images
    if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Append new images to existing ones
    const newImages = req.files.map((f) => `/uploads/${f.filename}`);
    product.images = [...(product.images || []), ...newImages];
    await product.save();

    res.json({ message: "Images added successfully", images: product.images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding images", error: error.message });
  }
});





// Public
router.get("/", productController.getProducts);
router.get("/single/:id", productController.getSingleProduct);
router.get("/user/:userId", productController.getUserProducts);

// Protected - Student only
// router.post("/", protect, isStudent, verifyCampusAccess, productController.createProduct);
router.post("/", protect, isStudent,upload.array("images"), verifyCampusAccess, productController.createProduct);

// Protected - Owner or Admin
router.put("/:id", protect, isProductOwnerOrAdmin, productController.updateProduct);
router.delete("/:id", protect, isProductOwnerOrAdmin, productController.deleteProduct);

// Like product
router.post("/:id/like", protect, productController.likeProduct);
router.get("/admin/all", protect, isAdmin, productController.getAllProductsAdmin);
router.get("/my-products", protect, productController.getMyProducts);
router.put("/:id/sold", protect, isProductOwnerOrAdmin, productController.markAsSold);

// Use upload.array("images") for multiple images
// router.post("/products", protect, upload.array("images"), createProduct);
module.exports = router;