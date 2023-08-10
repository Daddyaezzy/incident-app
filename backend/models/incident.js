const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  category: String,
  description: String,
  latitude: String,
  longitude: String,
  image: String,
});

const Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident;
