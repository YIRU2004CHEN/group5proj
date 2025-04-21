const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// ✅ Middleware to check auth
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded = { id: user._id }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ GET /api/tasks → Get all tasks for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch tasks error:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// ✅ POST /api/tasks → Create a new task
router.post('/', authMiddleware, async (req, res) => {
  console.log("✅ POST /api/tasks hit");
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const newTask = await Task.create({
      title,
      description,
      userId: req.user.id
    });
    console.log("✅ Task created:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("❌ Create task error:", err);
    res.status(500).json({ message: "Failed to add task" });
  }
});

// ✅ DELETE /api/tasks/:id → Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("❌ Delete task error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// ✅ PUT /api/tasks/:id → Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Update task error:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

module.exports = router;
