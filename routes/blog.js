const express = require("express");
const {
  AddBlogValidationMW,
  UpdateBlogValidationMW,
} = require("../validator/blog.validator");
const blogControllers = require("../controllers/blog.controller");

const BlogRouter = express.Router();

BlogRouter.get("/", blogControllers.getAllBlogs);

BlogRouter.get("/:id", blogControllers.getBlogById);

BlogRouter.post("/", AddBlogValidationMW, blogControllers.AddBlog);

BlogRouter.put("/:id", UpdateBlogValidationMW, blogControllers.UpdateBlogs);

BlogRouter.delete("/:id", blogControllers.DeleteBlog);

module.exports = BlogRouter;
