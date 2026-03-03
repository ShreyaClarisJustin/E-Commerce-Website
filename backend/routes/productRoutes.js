const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { isStudent, verifyCampusAccess, isProductOwnerOrAdmin } = require("../middleware/roleMiddleware");

// Public
router.get("/", productController.getProducts);
router.get("/single/:id", productController.getSingleProduct);
router.get("/user/:userId", productController.getUserProducts);

// Protected - Student only
router.post("/", protect, isStudent, verifyCampusAccess, productController.createProduct);

// Protected - Owner or Admin
router.put("/:id", protect, isProductOwnerOrAdmin, productController.updateProduct);
router.delete("/:id", protect, isProductOwnerOrAdmin, productController.deleteProduct);

// Like product
router.post("/:id/like", protect, productController.likeProduct);

module.exports = router;