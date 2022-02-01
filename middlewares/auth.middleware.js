const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader)
    return res.status(401).json({ message: "No token provided" });
  token = bearerHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "auth error" });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(500).send({ message: "Invalid Token" });
  }
};
