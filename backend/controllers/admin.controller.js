// handlers/adminHandler.js
const { users, records } = require("../data/mock.data");
const fs = require("fs");
const path = require("path");

// Helper function to save users to file (if using JSON file storage)
const saveUsersToFile = (usersData) => {
  // If you're using a JSON file, save here
  // For now, since users are in memory, we just modify the array
  // The mockData.js exports a reference, so modifications persist in memory
};

// 1. GET ALL USERS - Returns list of all users (excluding passwords)
const getAllUsers = (req, res) => {
  try {
    // Remove passwords from all users
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      count: usersWithoutPasswords.length,
      users: usersWithoutPasswords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// 2. CREATE NEW USER - Adds a new user to the system
const createUser = (req, res) => {
  try {
    const { userId, password, name, role, email } = req.body;

    // Validate required fields
    if (!userId || !password || !name || !role) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: userId, password, name, and role are required",
      });
    }

    // Validate role
    if (!["General User", "Admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either "General User" or "Admin"',
      });
    }

    // Check if userId already exists
    const userExists = users.find((u) => u.userId === userId);
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: `User with userId '${userId}' already exists`,
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      userId,
      password, // In production, hash this password!
      name,
      role,
      email: email || `${userId}@example.com`, // Default email if not provided
      joinDate: new Date().toISOString().split("T")[0], // Today's date
    };

    // Add to users array
    users.push(newUser);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// 3. UPDATE USER - Modifies an existing user
const updateUser = (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL parameter
    const { name, role, email, password } = req.body;

    // Find user by ID
    const userIndex = users.findIndex((u) => u.id == userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `User with id '${userId}' not found`,
      });
    }

    // Update only provided fields
    if (name) users[userIndex].name = name;
    if (role) {
      if (!["General User", "Admin"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Role must be either "General User" or "Admin"',
        });
      }
      users[userIndex].role = role;
    }
    if (email) users[userIndex].email = email;
    if (password) users[userIndex].password = password; // In production, hash this!

    // Get updated user without password
    const { password: _, ...updatedUser } = users[userIndex];

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

// 4. DELETE USER - Removes a user from the system
const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const userIndex = users.findIndex((u) => u.id == userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `User with id '${userId}' not found`,
      });
    }

    const userToDelete = users[userIndex];

    // Prevent deleting the last Admin user
    const adminUsers = users.filter((u) => u.role === "Admin");
    if (userToDelete.role === "Admin" && adminUsers.length === 1) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete the last Admin user. Please promote another user to Admin first.",
      });
    }

    // Prevent users from deleting themselves
    if (userToDelete.userId === req.user.userId) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot delete your own account. Ask another Admin to do this.",
      });
    }

    // Remove user from array
    users.splice(userIndex, 1);

    // Optional: Also delete all records created by this user
    // const userRecords = records.filter(r => r.createdBy === userToDelete.userId);
    // Delete or reassign them

    res.json({
      success: true,
      message: `User '${userToDelete.userId}' deleted successfully`,
      deletedUser: {
        id: userToDelete.id,
        userId: userToDelete.userId,
        name: userToDelete.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

// 5. GET SINGLE USER - Returns one user by ID (bonus endpoint)
const getUserById = (req, res) => {
  try {
    const userId = req.params.id;

    const user = users.find((u) => u.id == userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with id '${userId}' not found`,
      });
    }

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
