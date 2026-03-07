const Product = require("../models/Product");
const User = require("../models/User");

// =========================
// CREATE PRODUCT (Student Only)
// =========================
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, condition, quantity, campus, location, images } = req.body;

//     // Validate required fields
//     if (!name || !description || !price || !category || !campus) {
//       return res.status(400).json({ 
//         message: "Please provide all required fields: name, description, price, category, campus" 
//       });
//     }

//     // Verify user's campus matches request
//     if (campus !== req.user.campus) {
//       return res.status(403).json({ 
//         message: "You can only create products for your own campus" 
//       });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       condition: condition || "Good",
//       quantity: quantity || 1,
//       campus,
//       location,
//       images: images || [],
//       sellerId: req.user.id,
//       status: "Available"
//     });

//     await product.populate("sellerId", "name email");

//     res.status(201).json({
//       message: "Product created successfully",
//       product
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Error creating product", error: error.message });
//   }
// };









exports.createProduct = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    const {
      name,
      category,
      price,
      quantity,
      condition,
      campus,
      description
    } = req.body;
    const images = req.files && req.files.length > 0? req.files.map((file) => `/uploads/${file.filename}`) : [];

    if (!name || !description || !price || !category || !campus) {
      return res.status(400).json({
        message: "Please provide all required fields: name, description, price, category, campus",
      });
    }
if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    if (campus !== req.user.campus) {
      return res.status(403).json({
        message: "You can only create products for your own campus",
      });
    }

    // If images were uploaded

    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      condition: condition || "Good",
      campus,
      description,
      // location,
      images,
      sellerId: req.user._id,
      // status: "Available",
    });
   res.status(201).json(product);
    // await product.populate("sellerId", "name email");

    // res.status(201).json({
    //   message: "Product created successfully",
    //   product,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// =========================
// GET ALL PRODUCTS (Campus-filtered)
// =========================
exports.getProducts = async (req, res) => {
  try {
    const { campus, category, search, status } = req.query;

    // Build filter - only show products from user's campus if authenticated
    let filter = { status: "Available" };

    if (req.user) {
      filter.campus = req.user.campus;
    } else if (campus) {
      filter.campus = campus;
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(filter)
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// =========================
// GET SINGLE PRODUCT
// =========================
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("sellerId", "name email campus");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If user is from different campus, don't show
    if (req.user && product.campus !== req.user.campus && req.user.role !== "admin") {
      return res.status(403).json({ message: "Product not available in your campus" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// =========================
// UPDATE PRODUCT (Owner Only)
// =========================
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, condition, quantity, status, location, images } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership (owner or admin)
    if (product.sellerId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only edit your own products" });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (condition) product.condition = condition;
    if (quantity) product.quantity = quantity;
    if (status) product.status = status;
    if (location) product.location = location;
    if (images) product.images = images;

    await product.save();
    await product.populate("sellerId", "name email");

    res.json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// =========================
// DELETE PRODUCT (Owner Only)
// =========================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership (owner or admin)
    if (product.sellerId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// =========================
// GET USER PRODUCTS
// =========================
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.userId })
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching user products", error: error.message });
  }
};

// =========================
// LIKE PRODUCT
// =========================
exports.likeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already liked
    const alreadyLiked = product.likes.includes(req.user.id);

    if (alreadyLiked) {
      product.likes = product.likes.filter(id => id.toString() !== req.user.id);
      await product.save();
      return res.json({ message: "Product unliked", likes: product.likes.length });
    }

    product.likes.push(req.user.id);
    await product.save();

    res.json({ message: "Product liked", likes: product.likes.length });

  } catch (error) {
    res.status(500).json({ message: "Error liking product", error: error.message });
  }
};



exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id })
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching your products" });
  }
};
// exports.getMyProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ sellerId: req.user.id });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



exports.markAsSold = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = "Sold";

    await product.save();

    res.json({
      message: "Product marked as sold",
      product
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating product status" });
  }
};

exports.getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("sellerId", "name email campus")
      .sort({ createdAt: -1 });

    res.json({
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
