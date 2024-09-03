const BlogModel = require("../models/blog");

function getAllBlogs(req, res) {
  BlogModel.find()
    .then((blog) => {
      res.send(blog);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}

function getBlogById(req, res) {
  const id = req.params.id;
  BlogModel.findById(id)
    .then((blog) => {
      res.status(200).send(blog);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}

function AddBlog(req, res) {
  const blog = req.body;
  blog.lastUpdateAt = new Date();
  BlogModel.create(blog)
    .then((blog) => {
      res.status(201).send(blog);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}

function UpdateBlogs(req, res) {
  const id = req.params.id;
  const blog = req.body;
  BlogModel.findById(id, blog, { new: true })
    .then((newBlog) => {
      res.status(200).send(newBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

function DeleteBlog(req, res) {
  const id = req.params.id;
  BlogModel.findByIdAndDelete(id)
    .then((blog) => {
      res.status(200).send(blog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

module.exports = {
  getAllBlogs,
  getBlogById,
  AddBlog,
  UpdateBlogs,
  DeleteBlog,
};
