const express = require("express");
const router = express.Router();

// Controller
const {
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
const {
  addTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const {
  addTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
const { login, register } = require("../controllers/auth");

// Middleware
const { auth } = require("../middleware/auth");

// Route
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

router.post("/countries", auth, addCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.put("/countries/:id", auth, updateCountry);
router.delete("/countries/:id", auth, deleteCountry);

router.post("/trips", auth, addTrip);
router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.put("/trips/:id", auth, updateTrip);
router.delete("/trips/:id", auth, deleteTrip);

router.post("/transactions", auth, addTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransaction);
router.put("/transactions/:id", auth, updateTransaction);
router.delete("/transactions/:id", auth, deleteTransaction);

router.post("/login", login);
router.post("/register", register);

module.exports = router;
