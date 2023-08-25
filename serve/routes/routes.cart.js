const express = require("express");
const ModelCart = require("../models/cart.model");
const ModelProduct = require("../models/product.model");

const routesCart = express.Router();
const jwt = require("jsonwebtoken");

//Get all Method
routesCart.get("/", async (req, res) => {
  try {
    // if (req.headers.authorization) {
    const list = await ModelCart.find(req.query ? req.query : null);
    res.status(200).json({
      statusCode: 200,
      data: list,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

routesCart.get("/:id", async (req, res) => {
  try {
    // if (req.headers.authorization) {
    const id = req.params.id;
    if (id) {
      const data = await ModelCart.findById(id);

      if (data) {
        res.status(200).json({
          statusCode: 200,
          data,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy cart",
        });
      }
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Không tìm thấy cart",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

routesCart.post("/", async (req, res) => {
  try {
    const listProducts = await ModelProduct.find();
    const findProduct = listProducts.find(
      (el) => el.id === req.body?.productId
    );

    if (Object.keys(findProduct).length > 0) {
      const listCart = await ModelCart.find();
      const findCart =
        listCart.length &&
        listCart.find((el) => el.productId === req.body.productId);

      if (Object.keys(findCart).length > 0) {
        const data = {
          productId: findCart.id,
          price: findCart.price,
          quantity: req.body.quantity,
          total: (parseFloat(findProduct.price) * req.body.quantity).toString(),
        };
        const id = findCart.id;

        const updatedData = data;
        const options = { new: true };
        const result = await ModelCart.findByIdAndUpdate(
          id,
          updatedData,
          options
        );
        res.send({
          data: result,
          statusCode: 200,
        });
      } else {
        const data = new ModelCart({
          productId: findProduct.id,
          price: findProduct.price,
          quantity: "1",
          total: findProduct.price.toString(),
        });
        await data.save();
        res.status(200).json({
          statusCode: 200,
          data: "Tạo mới cart thành công",
        });
      }
    } else {
      res
        .status(400)
        .json({ statusCode: 400, message: "Không tìm thấy product" });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

// routesCart.put("/:id", async (req, res) => {
//   let data = {
//     productId: req.body.category,
//     price: req.body.price,
//     quantity: req.body.quantity,
//     total: parseFloat(req.body.price) * Number(req.body.quantity),
//   };
//   try {
//     // if (req.headers.authorization) {
//     const requiredValue = Object.keys(req.body).reduce((obj, item) => {
//       if (item === "productId" || item === "price" || item === "quantity") {
//         if (req.body[item] === "") {
//           obj[item] = `${item} không được bỏ trống`;
//         }
//         return obj;
//       }
//     }, {});
//     if (Object.keys(requiredValue).length === 0) {
//       const dataCart = await ModelCart.find();
//       const findCart = dataCart.find((el) => el.id === id);
//       if (Object.keys(findCart).length === 0) {
//         res
//           .status(400)
//           .json({ statusCode: 400, message: "Cart không tồn tại" });
//       } else {
//         const updatedData = data;
//         const options = { new: true };
//         const result = await ModelCart.findByIdAndUpdate(
//           id,
//           updatedData,
//           options
//         );

//         res.send({
//           data: result,
//           statusCode: 200,
//         });
//       }
//     } else {
//       res.status(200).json({
//         statusCode: 422,
//         data: requiredValue,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ statusCode: 500, message: error.message });
//   }
// });

//Delete by ID Method
routesCart.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await ModelCart.findByIdAndDelete(id);
    if (data) {
      res.send({
        message: "Xóa cart thành công",
        statusCode: 200,
      });
    } else {
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

module.exports = routesCart;
