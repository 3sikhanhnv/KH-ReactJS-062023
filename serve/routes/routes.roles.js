const express = require("express");
const Model = require("../models/role.model");
const routerRole = express.Router();

// {
//   "name": "Admin",
//   "description": "Quản trị",
//   "isActive": true,
//   "isAdmin": true,
// }

//Post Method
routerRole.post("/", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    description: req.body.description ? req.body.description : "",
    isActive: req.body.isActive ? req.body.isActive : false,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
routerRole.get("/", async (req, res) => {
  try {
    const data = await Model.find(req.query ? req.query : null);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message + req.params });
  }
});

//Get by ID Method
routerRole.get("/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
routerRole.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete by ID Method
routerRole.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = routerRole;
