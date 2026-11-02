const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Todo = require("./models/Todo");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ===================== API ROUTES =====================

// 1. Create a new Todo
// POST /todos
app.post("/todos", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      title,
      description,
      completed: completed || false,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get all Todos
// GET /todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Get a single Todo by ID
// GET /todos/:id
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Update a Todo
// PUT /todos/:id
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. Delete a Todo
// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ======================================================

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
