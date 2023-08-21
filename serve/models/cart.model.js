const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
  total: {
    type: String,
  },
});

module.exports = mongoose.model("carts", dataSchema);
