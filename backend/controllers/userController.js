const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Valid campuses - match with User model
const VALID_CAMPUSES = ["North Campus", "South Campus", "East Campus", "West Campus"];

// Email validation config - can be customized per campus
const EMAIL_CONFIG = {
  // Option A: Campus-specific email domains
  campusDomains: {
    "North Campus": "@north.edu",
    "South Campus": "@south.edu",
    "East Campus": "@east.edu",
    "West Campus": "@west.edu"
  },
  // Option B: Allow multiple global domains (fallback)
  allowedDomains: [
    "@yourcollege.edu",
    "@university.edu",
    "@campus.ac.in"
  ],
  // Set to true for campus-specific validation, false for global domains
  useCampusSpecificDomains: false
};


// =========================
// SIGNUP CONTROLLER
// =========================
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // check existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Signup failed", error });
//   }
// };

exports.signup = async (req, res) => {
  try {
    const { name, email, password, campus } = req.body;

    // Validate required fields
    if (!name || !email || !password || !campus) {
      return res.status(400).json({
        message: "Please provide name, email, password, and campus"
      });
    }

    // Validate campus
    if (!VALID_CAMPUSES.includes(campus)) {
      return res.status(400).json({
        message: `Invalid campus. Choose from: ${VALID_CAMPUSES.join(", ")}`
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    // 🔒 Validate college email
    let isValidEmail = false;
    let emailErrorMsg = "Invalid email domain";

    if (EMAIL_CONFIG.useCampusSpecificDomains) {
      // Campus-specific email validation
      const requiredDomain = EMAIL_CONFIG.campusDomains[campus];
      isValidEmail = email.endsWith(requiredDomain);
      emailErrorMsg = `For ${campus}, use email ending with ${requiredDomain}`;
    } else {
      // Global multi-domain validation
      isValidEmail = EMAIL_CONFIG.allowedDomains.some(domain => email.endsWith(domain));
      emailErrorMsg = `Only authorized college emails allowed: ${EMAIL_CONFIG.allowedDomains.join(", ")}`;
    }

    if (!isValidEmail) {
      return res.status(400).json({
        message: emailErrorMsg
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role = student
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      campus,
      role: "student"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        campus: user.campus,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};


// =========================
// ADMIN SIGNUP CONTROLLER
// =========================
exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password, campus, adminKey } = req.body;

    // Validate required fields
    if (!name || !email || !password || !campus || !adminKey) {
      return res.status(400).json({
        message: "Please provide name, email, password, campus, and adminKey"
      });
    }

    // Validate admin key
    if (adminKey !== process.env.ADMIN_REGISTRATION_KEY) {
      return res.status(403).json({
        message: "Invalid admin registration key"
      });
    }

    // Validate campus
    if (!VALID_CAMPUSES.includes(campus)) {
      return res.status(400).json({
        message: `Invalid campus. Choose from: ${VALID_CAMPUSES.join(", ")}`
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    // Validate college email
    let isValidEmail = false;
    let emailErrorMsg = "Invalid email domain";

    if (EMAIL_CONFIG.useCampusSpecificDomains) {
      const requiredDomain = EMAIL_CONFIG.campusDomains[campus];
      isValidEmail = email.endsWith(requiredDomain);
      emailErrorMsg = `For ${campus}, use email ending with ${requiredDomain}`;
    } else {
      isValidEmail = EMAIL_CONFIG.allowedDomains.some(domain => email.endsWith(domain));
      emailErrorMsg = `Only authorized college emails allowed: ${EMAIL_CONFIG.allowedDomains.join(", ")}`;
    }

    if (!isValidEmail) {
      return res.status(400).json({ message: emailErrorMsg });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      campus,
      role: "admin"
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, campus: user.campus },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        campus: user.campus,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Admin signup failed", error: error.message });
  }
};


// =========================
// LOGIN CONTROLLER
// =========================
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // compare passwords
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, campus: user.campus },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        campus: user.campus,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};



exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// =========================
// GET ALL USERS (Admin Only)
// =========================
exports.getAllUsers = async (req, res) => {
  try {
    const { campus, role } = req.query;
    let filter = {};

    if (campus) filter.campus = campus;
    if (role) filter.role = role;

    const users = await User.find(filter).select("-password").sort({ createdAt: -1 });

    res.json({
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// =========================
// UPDATE USER PROFILE
// =========================
exports.updateProfile = async (req, res) => {
  try {
    const { name, campus } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (campus) {
      if (!VALID_CAMPUSES.includes(campus)) {
        return res.status(400).json({
          message: `Invalid campus. Choose from: ${VALID_CAMPUSES.join(", ")}`
        });
      }
      updates.campus = campus;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

// =========================
// GET USERS BY CAMPUS (Admin Only)
// =========================
exports.getUsersByCampus = async (req, res) => {
  try {
    const { campus } = req.params;

    if (!VALID_CAMPUSES.includes(campus)) {
      return res.status(400).json({
        message: `Invalid campus. Choose from: ${VALID_CAMPUSES.join(", ")}`
      });
    }

    const users = await User.find({ campus }).select("-password").sort({ createdAt: -1 });

    res.json({
      campus,
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// =========================
// DELETE USER (Admin Only)
// =========================
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

// =========================
// CHECK USER (Verify logged-in user)
// =========================
exports.checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User verified",
      isAuthenticated: true,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to verify user", error: error.message });
  }
};

// =========================
// CHECK ADMIN (Verify if user is admin)
// =========================
exports.checkAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isAdmin = user.role === "admin";

    res.json({
      message: "Admin status checked",
      isAdmin,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to check admin status", error: error.message });
  }
};