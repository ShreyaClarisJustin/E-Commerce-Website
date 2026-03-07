// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only" });
  }

  next();
};

// Middleware to check if user is a student
exports.isStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied. Student only" });
  }

  next();
};

// Middleware to allow both admin and student
exports.isStudentOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (!["student", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

// Middleware to verify campus access - ensures student can only access their own campus data
// exports.verifyCampusAccess = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   // Admin can access any campus
//   if (req.user.role === "admin") {
//     return next();
//   }

//   // Student can only access their own campus
//   const requestedCampus = req.params.campusId || req.body.campus || req.query.campus;
  
//   if (req.user.role === "student" && requestedCampus && requestedCampus !== req.user.campus) {
//     return res.status(403).json({ 
//       message: "Access denied. You can only access your own campus marketplace" 
//     });
//   }

//   next();
// };



exports.verifyCampusAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // Admin can access everything
  if (req.user.role === "admin") {
    return next();
  }

  const requestedCampus =
    (req.params && req.params.campusId) ||
    (req.body && req.body.campus) ||
    (req.query && req.query.campus);

  // If campus is provided, verify it
  if (
    req.user.role === "student" &&
    requestedCampus &&
    requestedCampus !== req.user.campus
  ) {
    return res.status(403).json({
      message: "Access denied. You can only access your own campus marketplace",
    });
  }

  next();
};

// Middleware to ensure student owns the product or is admin (for edit/delete operations)
// exports.isProductOwnerOrAdmin = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     // Admin can perform any action
//     if (req.user.role === "admin") {
//       return next();
//     }

//     const Product = require("../models/Product");
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Student can only modify their own products
//     if (product.sellerId.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Can only modify your own products" });
//     }

//     req.product = product;
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };




exports.isProductOwnerOrAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (req.user.role === "admin") {
      return next();
    }

    const Product = require("../models/Product");
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied. Can only modify your own products",
      });
    }

    req.product = product;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};