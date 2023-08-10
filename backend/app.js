const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/incidents", require("./routes/incidents"));

// Connect to MongoDB
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
