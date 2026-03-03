const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// ===== PUBLIC ROUTES =====
router.post("/signup", userController.signup);
router.post("/admin-signup", userController.adminSignup);
router.post("/login", userController.login);

// ===== PROTECTED - STUDENT ROUTES =====
router.get("/profile", protect, userController.profile);
router.put("/profile", protect, userController.updateProfile);


// ===== PROTECTED - ADMIN ONLY ROUTES =====
router.get("/admin/all", protect, isAdmin, userController.getAllUsers);
router.get("/admin/campus/:campus", protect, isAdmin, userController.getUsersByCampus);
router.delete("/admin/:userId", protect, isAdmin, userController.deleteUser);

module.exports = router;