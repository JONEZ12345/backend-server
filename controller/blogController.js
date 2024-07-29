const blogModel = require("../model/blogModel");

const getBlogs = async (req, res) => {
  try {
    var blogs = await blogModel.find();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: "No Blog Found" });
    }

    return res.status(200).json({ data: blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.error || "iInternal Server Error" });
  }
};

const getBlog = async (req, res) => {
  //   const {id} = req.params
  const id = req.params.id;
  try {
    const singleBlog = await blogModel.findById(id);
    // const singleBlog = blogModel.find({_id:id})
    if (!singleBlog || singleBlog.length === 0) {
      return res.status(404).json({ error: "Blog does not exist" });
    }
    return res.status(200).json({ data: singleBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.error || "Internal Server Error" });
  }
};

const createBlogs = async (req, res) => {
  // grab values sent
  const { title, author, publisher, publish } = req.body;

  // ensure values exist
  if (!title || !author || !publisher) {
    // send response if one value is missing
    return res.status(400).json({ error: "Please fill in the fields" });
  }

  // assign default value to a variable
  let publishStatus = false;
  let yearOfPublish = null;

  // vert publish field to know if true or false
  if (publish === "1") {
    // 1 means true
    // if '1', assign publishStatus true and yearOfPublish
    publishStatus = true;
    yearOfPublish = new Date();
    yearOfPublish = yearOfPublish.toISOString();
  } else if (publish === "2") {
    // 2 means false
    publishStatus = false;
    // var yearOfPublish = null
  }

  var blog = new blogModel({
    title: title,
    author: author,
    publisher: publisher,
    publish: publishStatus,
    yearOfPublish: yearOfPublish,
  });

  try {
    const data = await blog.save();
    return res.status(201).json({ data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.error || "Internal Server Error" });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;

  // grab values sent
  const { title, author, publisher, publish } = req.body;

  // ensure values exist
  if (!title || !author || !publisher) {
    // send response if one value is missing
    return res.status(400).json({ error: "Please fill in the fields" });
  }

  try {
    var selectedBlog = await blogModel.findById(id);
    if (!selectedBlog || selectedBlog.length === 0) {
      return res.status(404).json({ error: "Blog does not exist" });
    }

    selectedBlog.title = title;
    selectedBlog.author = author;
    selectedBlog.publisher = publisher;

    if (publish === "1") {
      selectedBlog.publish = true;
      let yearOfPublish = new Date();
      selectedBlog.yearOfPublish = yearOfPublish.toISOString();
    } else if (publish === "2") {
      selectedBlog.publish = false;
      selectedBlog.yearOfPublish = null;
    } else {
      selectedBlog.publish = selectedBlog.publish;
      selectedBlog.yearOfPublish = selectedBlog.yearOfPublish;
    }

    selectedBlog = await selectedBlog.save();

    return res.status(202).json({ data: selectedBlog });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.error || "Internal Server Error" });
  }
};

const killBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await blogModel.findByIdAndDelete(id);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Blog does not exist" });
    }
    return res.status(202).json({ data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.error || "Internal Server Error" });
  }
};

const killBlogs = async (req, res) => {
  try {
    await blogModel.deleteMany();
    return res.status(202).json({ message: "Dataset is cleared" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error?.error || "Internal Server Error" });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlogs,
  updateBlog,
  killBlog,
  killBlogs,
};
