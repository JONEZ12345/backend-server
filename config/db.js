const mongoose = require("mongoose");

// initiated a function my database connection
const connectDB = async () => {
  // enclosed inside a try catch block scope
  try {
    // initiated my connection to my database
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/jonez");
    // logged my response to ensure it is running
    console.log(connect.connection);
    console.log(`MongoDB Connected ${connect.connection.host}`);
  } catch (error) {
    // to catch error
    console.error(`Error: ${error.message}`);
    // to exit the program after catching the error
    process.exit();
  }
};

module.exports = connectDB;
