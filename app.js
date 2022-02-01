const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dbConfig = require("./db.config");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
port = 3000;

app.use(express.json());
app.use("/", authRoutes);
app.use("/", taskRoutes);

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected with database");
  })
  .catch((error) => {
    console.log("Failed to connect with database");
  });

app.listen(port, () => {
  console.log(`server is up at port : ${port}`);
});
