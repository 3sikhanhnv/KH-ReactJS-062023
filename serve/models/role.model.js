const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("roles", dataSchema);
