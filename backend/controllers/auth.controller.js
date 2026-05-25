const jwt = require("jsonwebtoken");

const { users } = require("../data/mock.data");

const SECRET_KEY = "my-secret-key";

function login(req, res) {
  // 1. Get data from request body
  const { userId, password, role } = req.body;

  // 2. Validate input - check if all fields are provided
  if (!userId || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "User ID, Password and Role are required",
    });
  }

  // 3. Find user in database
  const user = users.find(
    (u) => u.userId === userId && u.password === password && u.role === role,
  );

  // 4. If user not found, return error
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials or role mismatch",
    });
  }

  // 5. Create JWT token
  const token = jwt.sign(
    {
      userId: user.userId,
      role: user.role,
      name: user.name,
    },
    SECRET_KEY,
    { expiresIn: "1h" }, // Token expires in 1 hour
  );

  // 6. Send response with token and user info
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role,
    },
  });
}

module.exports = { login };
