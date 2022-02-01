const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists, click login" });
    }
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occured in saving the user");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "user not exits" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "secret", { expiresIn: 5000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ jwt: token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.user = async (req, res) => {
  try {
    console.log("user", req.user);
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};
