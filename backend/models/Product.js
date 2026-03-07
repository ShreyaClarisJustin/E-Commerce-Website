const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  category: { 
    type: String, 
    required: true,
    enum: ["Books", "Electronics", "Clothing", "Furniture", "Sports", "Notes", "Other","Lab Equipment"],
    index: true
  },
  condition: {
    type: String,
    enum: ["New", "Like New", "Good", "Fair"],
    default: "Good"
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  campus: { 
    type: String, 
    required: true,
    enum: ["North Campus", "South Campus", "East Campus", "West Campus"],
    index: true
  },
  location: {
    type: String,
    description: "Building or location on campus"
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  images: [{
    type: [String],
    default:[],
    description: "URLs of product images"
  }],
  status: {
    type: String,
    enum: ["Available", "Sold", "Pending"],
    default: "Available",
    index: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);