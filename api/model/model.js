import mongoose from "mongoose";

const techSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"]
  },
  scope: {
    type: [String], // array of strings
    required: true
  }
}, { timestamps: true });

const Tech = mongoose.model("Tech", techSchema);

export default Tech;
