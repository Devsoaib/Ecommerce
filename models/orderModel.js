const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "products"
    }],
    payment: {},
    buyer: {
        type: ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        default: "Not processed",
        enum: [
          "Not processed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ],
      },
},  { timestamps: true, versionKey: false })

const orderModel = mongoose.model("orders", orderSchema)

module.exports = orderModel