const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
  },

  author: {
    type: String,
  },

  state: {
    type: String,
  },

  readCount: {
    type: Number,
  },

  readingTime: {
    type: Number,
  },

  tags: {
    type: [String],
  },

  body: {
    type: String,
  },

  timeStamp: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blog ", BlogSchema);
