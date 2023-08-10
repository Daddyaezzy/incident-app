import React, { useState } from "react";
import "../styles/incidentForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

function IncidentForm() {
  const [incident, setIncident] = useState({
    category: "",
    description: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncident((prevIncident) => ({
      ...prevIncident,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setIncident((prevIncident) => ({
      ...prevIncident,
      image: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("category", incident.category);
      formData.append("description", incident.description);
      formData.append("latitude", incident.latitude);
      formData.append("longitude", incident.longitude);
      formData.append("image", incident.image);

      // Send POST request to the API endpoint
      axios
        .post(
          "https://incident-app-backend.onrender.com/incidents/add/",
          formData
        )
        .then((res) => console.log(res.data));

      setIncident({
        category: "",
        description: "",
        latitude: "",
        longitude: "",
        image: null,
      });

      setShowMessage(true);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Error submitting incident:", error);
    }
  };

  return (
    <div className="incident-form">
      <h2>Report New Incident</h2>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={incident.category}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={incident.description}
          onChange={handleInputChange}
        />
        <label>Latitude:</label>
        <input
          type="text"
          name="latitude"
          value={incident.latitude}
          onChange={handleInputChange}
        />
        <label>Longitude:</label>
        <input
          type="text"
          name="longitude"
          value={incident.longitude}
          onChange={handleInputChange}
        />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">Submit</button>

        {showMessage && (
          <p className="success-message">Incident Submitted Successfully</p>
        )}
      </form>
      <div>
        <button className="myBtn">
          <Link to="/incidents">View Incidents Log</Link>
        </button>
      </div>
    </div>
  );
}

export default IncidentForm;
