// routes/adminRouter.js
const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/auth.middleware"); // Your authorize function
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/admin.controller");

const adminRouter = express.Router();

// All admin routes require authentication AND Admin role
adminRouter.use(authenticate); // First, verify they are logged in
adminRouter.use(authorize("Admin")); // Second, verify they are Admin

// Admin CRUD operations
adminRouter.get("/users", getAllUsers); // GET all users
adminRouter.get("/users/:id", getUserById); // GET single user
adminRouter.post("/users", createUser); // CREATE new user
adminRouter.put("/users/:id", updateUser); // UPDATE user
adminRouter.delete("/users/:id", deleteUser); // DELETE user

module.exports = adminRouter;
