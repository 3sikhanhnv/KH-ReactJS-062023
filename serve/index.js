require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

mongoose.connect(mongoString, (err, db) => {
  if (err) throw err;
  const rolesCollection = db.collection("roles");
  console.log("Connected to the table", rolesCollection.collectionName);

  const arrayRoles = [
    {
      name: "Admin",
      description: "Quản trị",
      isActive: true,
      isAdmin: true,
    },
    {
      name: "Customer",
      description: "Khách hàng",
      isActive: true,
      isAdmin: false,
    },
    {
      name: "Other",
      description: "Khách vãng lai",
      isActive: true,
      isAdmin: false,
    },
    {
      name: "None",
      description: "None",
      isActive: false,
      isAdmin: false,
    },
  ];

  rolesCollection.find().toArray((err, res) => {
    if (err) throw err;
    if (res.length > 0) return;
    else {
      rolesCollection.insert(arrayRoles, function (err, r) {
        if (err) throw err;
        console.log(r);
      });
    }
  });
});

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

//
const app = express();
app.use(cors());
app.use(express.json());

//routes api
const routes = require("./routes/routes");
const routesUsers = require("./routes/routes.users");
const routesRoles = require("./routes/routes.roles");
const routesProducts = require("./routes/routes.product");
const routesCategories = require("./routes/routes.category");
const routesCart = require("./routes/routes.cart");
app.use("/api/users", routesUsers);
app.use("/api/roles", routesRoles);
app.use("/api", routes);
app.use("/api/products", routesProducts);
app.use("/api/categories", routesCategories);
app.use("/api/carts", routesCart);
//
app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
});
