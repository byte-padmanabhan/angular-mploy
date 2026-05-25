const express = require("express");
const authRouter = require("./routes/authRouter");
const recordRouter = require("./routes/recordRouter");
const adminRouter = require("./routes/adminRouter");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello from the server");
});
app.use("/api/auth", authRouter);
app.use("/api/records", recordRouter);
app.use("/api/admin", adminRouter);
app.listen(8000, () => {
  console.log("the server is running in 8000");
});
