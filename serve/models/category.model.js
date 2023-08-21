const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("categories", dataSchema);
