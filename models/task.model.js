const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const taskModel = mongoose.model("tasks", taskSchema);
module.exports = taskModel;
