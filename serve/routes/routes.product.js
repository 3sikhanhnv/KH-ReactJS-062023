const express = require("express");
const ModelProduct = require("../models/product.model");
// const ModelRole = require("../models/role.model");
// const ModelToken = require("../models/token.model");
const routesProducts = express.Router();
const jwt = require("jsonwebtoken");

//Get all Method
routesProducts.get("/", async (req, res) => {
  try {
    // if (req.headers.authorization) {
    const list = await ModelProduct.find(req.query ? req.query : null);
    res.status(200).json({
      statusCode: 200,
      data: list,
    });
    // } else {
    //   res.status(401).json({
    //     statusCode: 401,
    //     message: "Bạn không có quyền cho request này",
    //   });
    // }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesProducts.get("/:id", async (req, res) => {
  try {
    // if (req.headers.authorization) {
    const id = req.params.id;
    if (id) {
      const data = await ModelProduct.findById(id);

      if (data) {
        res.status(200).json({
          statusCode: 200,
          data,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy product",
        });
      }
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Không tìm thấy product",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

routesProducts.post("/", async (req, res) => {
  let data = new ModelProduct({
    name: req.body.name,
    price: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description ?? "",
    image: req.body.image,
    discount: req.body.discount ?? null,
    categoryId: req.body.categoryId,
    memory: req.body.memory ?? "",
    color: req.body.color ?? [],
    width: req.body.width ?? "",
    camera: req.body.camera ?? "",
    //Màn hình
    // Công nghệ màn hình:
    screenTechnology: req.body.screenTechnology ?? "",
    resolutionScreen: req.body.resolutionScreen ?? "",
    // Màn hình rộng
    widescreen: req.body.widescreen ?? "",
    // Độ sáng tối đa
    maximumBrightness: req.body.maximumBrightness ?? "",
    // Mặt kính cảm ứng
    touchScreen: req.body.touchScreen ?? "",
    // Camera sau

    //độ phân giải
    resolutionRearCamera: req.body.resolutionRearCamera ?? "",
    // Quay phim
    film: req.body.film ?? "",
    // Đèn Flash
    flash: req.body.flash ?? 0, //0 ko có, 1 có
    // Camera trước
    // Độ phân giải
    resolutionFrontCamera: req.body.resolutionFrontCamera ?? "",
  });
  try {
    // if (req.headers.authorization) {
    const requiredValue = Object.keys(req.body).reduce((obj, item) => {
      if (
        item === "name" ||
        item === "price" ||
        item === "quantity" ||
        item === "image" ||
        item === "categoryId"
      ) {
        if (req.body[item] === "") {
          obj[item] = `${item} không được bỏ trống`;
        }
        return obj;
      }
    }, {});

    if (Object.keys(requiredValue).length === 0) {
      await data.save();
      res.status(200).json({
        statusCode: 200,
        message: "Tạo mới product thành công",
      });
    } else {
      res.status(200).json({
        statusCode: 422,
        data: requiredValue,
      });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesProducts.put("/:id", async (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description ?? "",
    image: req.body.image,
    discount: req.body.discount ?? null,
    categoryId: req.body.categoryId,
    memory: req.body.memory ?? "",
    color: req.body.color ?? [],
    width: req.body.width ?? "",
    camera: req.body.camera ?? "",
    //Màn hình
    // Công nghệ màn hình:
    screenTechnology: req.body.screenTechnology ?? "",
    resolutionScreen: req.body.resolutionScreen ?? "",
    // Màn hình rộng
    widescreen: req.body.widescreen ?? "",
    // Độ sáng tối đa
    maximumBrightness: req.body.maximumBrightness ?? "",
    // Mặt kính cảm ứng
    touchScreen: req.body.touchScreen ?? "",
    // Camera sau

    //độ phân giải
    resolutionRearCamera: req.body.resolutionRearCamera ?? "",
    // Quay phim
    film: req.body.film ?? "",
    // Đèn Flash
    flash: req.body.film ?? 0, //0 ko có, 1 có
    // Camera trước
    // Độ phân giải
    resolutionFrontCamera: req.body.resolutionFrontCamera ?? "",
  };
  try {
    // if (req.headers.authorization) {
    const requiredValue = Object.keys(req.body).reduce((obj, item) => {
      if (
        item === "name" ||
        item === "price" ||
        item === "quantity" ||
        item === "image" ||
        item === "categoryId"
      ) {
        if (req.body[item] === "") {
          obj[item] = `${item} không được bỏ trống`;
        }
        return obj;
      }
    }, {});
    const id = req.params.id;
    if (Object.keys(requiredValue).length === 0) {
      const dataProducts = await ModelProduct.find();
      const findProduct = dataProducts.find((el) => el.id === id);
      if (Object.keys(findProduct).length === 0) {
        res
          .status(400)
          .json({ statusCode: 400, message: "Product không tồn tại" });
      } else {
        const updatedData = data;
        const options = { new: true };
        const result = await ModelProduct.findByIdAndUpdate(
          id,
          updatedData,
          options
        );

        res.send({
          data: result,
          statusCode: 200,
        });
      }
    } else {
      res.status(200).json({
        statusCode: 422,
        data: requiredValue,
      });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

//Delete by ID Method
routesProducts.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ModelProduct.findByIdAndDelete(id);
    if (data) {
      res.send({
        message: "Xóa product thành công",
        statusCode: 200,
      });
    } else {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

module.exports = routesProducts;
