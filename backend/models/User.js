// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: {
//     type: String,
//     enum: ["user", "seller", "admin"],
//     default: "user"
//   }
// });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  campus: { 
    type: String, 
    required: true,
    enum: ["North Campus", "South Campus", "East Campus", "West Campus"], // Customize based on your campuses
    index: true
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);