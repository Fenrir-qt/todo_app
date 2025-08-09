const express = require("express");
const router = express.Router();
const Tasks = require("../models/taskModel");

function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
//Creating a task
router.post("/dashboard/addTask", isAuthenticated, async (req, res) => {
    const createTask = new Tasks({
        taskName: req.body.taskName,
        user: req.session.userId
    });

    try {
        const newTask = await createTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Fetching tasks
router.get("/dashboard/getTask", isAuthenticated, async(req,res) => {
    try {
        const tasks = await Tasks.find({ user: req.session.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//Updating Tasks
router.patch("/dashboard/updateTask/:id", isAuthenticated, async (req, res) => {
  try {
    const { taskName, completed } = req.body;

    const updateFields = {};
    if (taskName !== undefined) updateFields.taskName = taskName;
    if (completed !== undefined) updateFields.completed = completed;

    const result = await Tasks.updateOne(
      { _id: req.params.id, user: req.session.userId },
      updateFields
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Task not found or not yours" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



//Deleting a task
router.delete("/dashboard/deleteTask/:id", isAuthenticated, async (req, res) => {
    try {
        const deletedTask = await Tasks.findOneAndDelete({
            _id: req.params.id,
            user: req.session.userId 
        });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
