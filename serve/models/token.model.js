const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("tokens", dataSchema);
