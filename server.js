const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "qasfdgrfdsv3125*&%$#@!ewrgfd#%%#$&WADFDG*#$FGHGFHhfgh6765DFGHDF%^#$#32fghdbze";

mongoose.connect("mongodb://localhost:27017/login-app-db", (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB!!!");
});

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.post("/api/login", async (req, res) => {
  const { username,email,phone, password } = req.body;
  const user = await User.findOne({ username }).lean();
  const emailverify = await User.findOne({ email }).lean();
  const phoneverify = await User.findOne({ phone }).lean();
  if (!user || !emailverify || !phoneverify) {
    return res.json({ status: "error", error: "Invalid Username/password/email" }); 
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.username,email:emailverify.email,phone:phoneverify.phone },
      JWT_SECRET
    );
    return res.json({ status: "ok", data:token });
  }
  res.json({ status: "ok" });
});

app.post("/api/index", async (req, res) => {
  const { username,email,phone, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 1);

  if (!username || typeof username !== "string") {
    return res.json({ status: error, error: "Invalid Username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: error, error: "Invalid password" });
  }
  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small.Should be atleast 6 characters",
    });
  }

  try {
    const response = await User.create({
      username,
      email,
      phone,
      password,
    });
    console.log("User created successfully", response);
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }
  res.json({ status: "ok" });
});

app.listen(9999, () => console.log(`Server up at 9999`));
