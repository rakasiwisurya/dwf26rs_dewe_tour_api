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
const { login, register, checkAuth } = require("../controllers/auth");

// Middleware
const { auth, adminOnly } = require("../middleware/auth");
const { uploadFiles } = require("../middleware/uploadFiles");

// Route
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", auth, adminOnly, updateUser);
router.delete("/users/:id", auth, adminOnly, deleteUser);

router.post("/countries", auth, adminOnly, addCountry);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.put("/countries/:id", auth, adminOnly, updateCountry);
router.delete("/countries/:id", auth, adminOnly, deleteCountry);

router.post(
  "/trips",
  auth,
  adminOnly,
  uploadFiles("image", "uploads/trips"),
  addTrip
);
router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.put("/trips/:id", auth, adminOnly, updateTrip);
router.delete("/trips/:id", auth, adminOnly, deleteTrip);

router.post(
  "/transactions",
  auth,
  uploadFiles("attachment", "uploads/proofPayments"),
  addTransaction
);
router.get("/transactions", auth, adminOnly, getTransactions);
router.get("/transactions/:id", auth, adminOnly, getTransaction);
router.put("/transactions/:id", auth, adminOnly, updateTransaction);
router.delete("/transactions/:id", auth, adminOnly, deleteTransaction);

router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
