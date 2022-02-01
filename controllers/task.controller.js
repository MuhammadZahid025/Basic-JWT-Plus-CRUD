const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  const { name } = req.body;

  try {
    let task = new Task({ name });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occured!");
  }
};

exports.listTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some error occured!");
  }
};
