const express = require("express");
const router = express.Router();
const multer = require("multer");
const Incident = require("../models/incident");

// Configure multer for file uploads (images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { category, description, latitude, longitude } = req.body;
    const newIncident = new Incident({
      category,
      description,
      latitude: Number(latitude),
      longitude: Number(longitude),
      image: req.file.path,
    });

    const savedIncident = await newIncident.save();
    console.log(savedIncident);
    res.status(201).json(savedIncident);
  } catch (error) {
    res.status(500).json({ message: "Error creating incident" });
  }
});

// API endpoint to get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incidents" });
  }
});

module.exports = router;
