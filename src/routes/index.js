const express = require("express");
const {
  addCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router();

// router user
router.post("/users", addUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// router country
router.post("/countries", addCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.put("/countries/:id", updateCountry);
router.delete("/countries/:id", deleteCountry);

module.exports = router;
