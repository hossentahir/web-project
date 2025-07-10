const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = []; // Simple in-memory array

// GET - All tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST - Add new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  const newTask = { id: Date.now(), text };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - Update task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.text = text;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// DELETE - Remove task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
