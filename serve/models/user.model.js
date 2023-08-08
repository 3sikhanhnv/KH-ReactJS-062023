const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  roleId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("users", dataSchema);
