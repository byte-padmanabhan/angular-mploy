// handlers/recordsHandler.js
const { users, records } = require("../data/mock.data");

// Get records for logged-in user
const getRecords = (req, res) => {
  // User info comes from middleware (req.user)
  const userId = req.user.userId;
  const userRole = req.user.role;

  let userRecords;

  if (userRole === "Admin") {
    // Admin sees ALL records
    userRecords = records;
  } else {
    // Regular user sees only their records
    userRecords = records.filter((record) => record.createdBy === userId);
  }

  res.json({
    success: true,
    records: userRecords,
    total: userRecords.length,
    user: {
      name: req.user.name,
      role: req.user.role,
    },
  });
};

// Get user profile details
const getProfile = (req, res) => {
  const userId = req.user.userId;

  // Find full user details from mock data
  const user = users.find((u) => u.userId === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Return user profile without password
  const { password, ...userProfile } = user;

  res.json({
    success: true,
    profile: userProfile,
  });
};

// Get records with simulated delay (for async demo)
const getRecordsWithDelay = (req, res) => {
  const userId = req.user.userId;
  const userRole = req.user.role;
  const delay = req.query.delay ? parseInt(req.query.delay) : 2000;

  // Validate delay (prevent crazy values)
  const validDelay = Math.min(Math.max(delay, 0), 10000);

  // Simulate async API call
  setTimeout(() => {
    let userRecords;

    if (userRole === "Admin") {
      userRecords = records;
    } else {
      userRecords = records.filter((record) => record.createdBy === userId);
    }

    res.json({
      success: true,
      records: userRecords,
      total: userRecords.length,
      delayApplied: `${validDelay}ms`,
      message: `Data fetched after ${validDelay}ms delay (demonstrates async processing)`,
    });
  }, validDelay);
};

module.exports = { getRecords, getProfile, getRecordsWithDelay };
