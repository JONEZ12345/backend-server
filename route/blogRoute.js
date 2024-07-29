const express = require("express");
const blogModel = require("../model/blogModel");
const {
  getBlog,
  createBlogs,
  updateBlog,
  killBlog,
  killBlogs,
  getBlogs,
} = require("../controller/blogController");

const router = express.Router();

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.post("/create", createBlogs);

router.patch("/update/:id", updateBlog);

router.delete("/kill/:id", killBlog);

router.delete("/kill", killBlogs);

module.exports = router;
