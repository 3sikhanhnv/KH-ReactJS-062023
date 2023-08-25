const express = require("express");
const Model = require("../models/user.model");
const ModelRole = require("../models/role.model");
const ModelToken = require("../models/token.model");
const routerUser = express.Router();
const jwt = require("jsonwebtoken");

routes.get("/", async (req, res) => {
  try {
    // if (req.headers.authorization) {
    const listUser = await ModelUser.find(req.query ? req.query : null);
    res.status(200).json({
      statusCode: 200,
      data: listUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    // if (req.headers.authorization) {
    const id = req.params.id;
    if (id) {
      const data = await ModelUser.findById(id);

      if (data) {
        res.status(200).json({
          statusCode: 200,
          data,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: "Không tìm thấy user",
        });
      }
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Không tìm thấy user",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

// {
//   "username": "khanhtmd",
//   "password": "Khanh@123",
//   "fullname": "Nguyễn Văn Khánh",
//   "phone": "0364606406",
//   "avatar": "",
//   "address": ""
//   "roleId": 1
// }

//Post Method
routerUser.post("/", async (req, res) => {
  let data = new Model({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    roleId: req.body.roleId,
    roleId: req.body.roleId,
    phone: req.body.phone ? req.body.phone : "",
    avatar: req.body.avatar ? req.body.avatar : "",
    address: req.body.address ? req.body.address : "",
    isAdmin: false,
  });
  try {
    // if (req.headers.authorization) {
    const dataUsers = await Model.find();
    const filterUser = dataUsers.filter((el) => el.username === req.body.email);
    if (Object.keys(filterUser).length > 0) {
      res.status(400).json({ message: "Tài khoản đã tồn tại" });
    } else {
      const dataRole = await ModelRole.find();
      const findRole = dataRole.find((el) => el._id.toString() === data.roleId);
      if (findRole) {
        if (findRole.isActive) {
          data.isAdmin = findRole.isAdmin;
          await data.save();
          res.status(200).json({
            statusCode: 200,
            message: "Tạo mới user thành công",
          });
        } else {
          res.status(400).json({ message: "Role chưa được kích hoạt" });
        }
      } else {
        res.status(400).json({ message: "Không tìm thấy role" });
      }
    }
    // } else {
    //   res.status(401).json({
    //     statusCode: 401,
    //     message: "Bạn không có quyền cho request này",
    //   });
    // }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// //Get all Method
// routerUser.get("/", async (req, res) => {
//   try {
//     if (req.headers.authorization) {
//       const listUser = await Model.find(req.query ? req.query : null);
//       res.status(200).json({
//         statusCode: 200,
//         data: listUser,
//       });
//     } else {
//       res.status(401).json({
//         statusCode: 401,
//         message: "Bạn không có quyền cho request này",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message + req.params });
//   }
// });

// //Get by ID Method
// routerUser.get("/:id", async (req, res) => {
//   try {
//     // const dataToken = await ModelToken.find();
//     // const findToken = dataToken.find(
//     //   (el) => `Bearer ${el.token}` === req.headers.authorization
//     // );
//     if (req.headers.authorization) {
//       const data = await Model.findById(req.params.id);
//       res.status(200).json({
//         statusCode: 200,
//         data: data,
//       });
//     } else {
//       res.status(401).json({
//         statusCode: 401,
//         message: "Bạn không có quyền cho request này",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//Update by ID Method
routerUser.put("/:id", async (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    roleId: req.body.roleId,
    roleId: req.body.roleId,
    phone: req.body.phone ? req.body.phone : "",
    avatar: req.body.avatar ? req.body.avatar : "",
    address: req.body.address ? req.body.address : "",
    isAdmin: false,
  };
  try {
    // if (req.headers.authorization) {

    const dataRole = await ModelRole.find();
    const findRole = dataRole.find((el) => el._id.toString() === data.roleId);
    if (findRole) {
      if (findRole.isActive) {
        data.isAdmin = findRole.isAdmin;
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.send({
          data: result,
          statusCode: 200,
        });
      } else {
        res.status(400).json({ message: "Role chưa được kích hoạt" });
      }
    } else {
      res.status(400).json({ message: "Không tìm thấy role" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerUser.delete("/:id", async (req, res) => {
  try {
    // const user = await Model.findById(req.params.id);
    // console.log(user);
    // if (user.isAdmin) {
    const id = req.params.id;

    const data = await Model.findByIdAndDelete(id);
    if (data) {
      res.send({
        message: "Xóa user thành công",
        statusCode: 200,
      });
    } else {
      res.status(400).json({ statusCode: 400, message: "Không tìm thấy user" });
    }

    // } else {
    //   res.status(400).json({ statusCode: 400, message: error.message });
    // }
    // const dataRole = await ModelRole.find();
    // const findRole = dataRole.find((el) => el._id.toString() === data.roleId);

    // const data = await Model.findByIdAndDelete(id);
    // if (data) {
    //   res.send({
    //     message: "Xóa user thành công",
    //     statusCode: 200,
    //   });
    // } else {
    //   res.status(400).json({ statusCode: 400, message: error.message });
    // }
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
});

// //Edit Profile
// routerUser.put("/update-profile/:id", async (req, res) => {
//   let data = new Model({
//     _id: req.body.id,
//     username: req.body.username,
//     fullName: req.body.fullName,
//     avatar: req.body.avatar,
//     phone: req.body.phone,
//     address: req.body.address,
//   });

//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };

//     const result = await Model.findByIdAndUpdate(id, updatedData, options);
//     console.log(result);

//     res.status(200).json({
//       message: "Cập nhật thông tin thành công",
//       data: result,
//       statusCode: 200,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       statusCode: 500,
//     });
//   }
// });

module.exports = routerUser;
