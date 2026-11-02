const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt ও updatedAt অটোমেটিক যোগ হবে
  }
);

module.exports = mongoose.model("Todo", todoSchema);
