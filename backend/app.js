const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/incidents", require("./routes/incidents"));

// Connect to MongoDB
const connectionString =
  "mongodb+srv://tester:1234@cluster0.xkx94ws.mongodb.net/?retryWrites=true&w=majority";

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
