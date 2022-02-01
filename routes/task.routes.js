const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/create-task", auth, taskController.createTask);
router.get("/list-tasks", auth, taskController.listTasks);

module.exports = router;
