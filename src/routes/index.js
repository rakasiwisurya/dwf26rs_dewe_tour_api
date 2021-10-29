const express = require("express");
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  addCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");
const { addTrip, getTrips, getTrip } = require("../controllers/trip");

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

// router trip
router.post("/trips", addTrip);
router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);

module.exports = router;
