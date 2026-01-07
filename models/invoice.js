const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },

  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Customer", 
    required: true 
  },

  items: [invoiceItemSchema],

  subTotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },

  status: { 
    type: String, 
    enum: ["Pending", "Paid", "Cancelled"], 
    default: "Pending" 
  },

  createBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }

}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);
