const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  discount: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  memory: {
    type: Array,
  },
  color: {
    type: Array,
  },
  width: {
    type: String,
  },
  camera: {
    type: String,
  },
  //Màn hình
  // Công nghệ màn hình:
  screenTechnology: {
    type: String,
  },
  resolutionScreen: {
    //độ phân giải
    type: String,
  },
  // Màn hình rộng
  widescreen: {
    type: String,
  },
  // Độ sáng tối đa
  maximumBrightness: {
    type: String,
  },
  // Mặt kính cảm ứng
  touchScreen: {
    type: String,
  },
  // Camera sau

  //độ phân giải
  resolutionRearCamera: {
    type: String,
  },
  // Quay phim
  film: {
    type: String,
  },
  // Đèn Flash
  flash: {
    type: Number,
  },
  // Camera trước
  // Độ phân giải
  resolutionFrontCamera: {
    type: String,
  },
});

module.exports = mongoose.model("products", dataSchema);
