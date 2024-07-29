const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publish: {
      type: Boolean,
      default: false,
    },
    yearOfPublish: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
