import React, { useEffect, useState } from "react";
import "../styles/incidentList.css";
import axios from "axios";
import { Link } from "react-router-dom";

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  // Replace with API call to fetch incidents

  useEffect(() => {
    axios
      .get("https://incident-app-backend.onrender.com/incidents/")
      .then((response) => {
        if (response.data.length > 0) {
          // console.log(response.data);

          let fetchedIncidents = response.data.map((res) => ({
            id: res._id,
            category: res.category,
            description: res.description,
            latitude: res.latitude,
            longitude: res.longitude,
            image: res.image,
          }));
          setIncidents([...incidents, ...fetchedIncidents]);
        } else {
          console.log("couldn't fetch incidents");
        }
      });
  }, []);
  // console.log(incidents);

  const handleDelete = async (incidentId) => {
    try {
      await axios.delete(
        `https://incident-app-backend.onrender.com/incidents/delete/${incidentId}`
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="incident-list">
      <h2>Incidents</h2>
      {incidents.length > 0 ? (
        <ul>
          {incidents.map((incident, index) => (
            <li key={index} className="incident-item">
              <div className="incident-card">
                <img
                  className="incident-image"
                  src={`${incident.image}`}
                  alt={incident.category}
                />
                <h3>
                  {" "}
                  <span>{incident.category && `Category:`}</span>
                  {` ${incident.category}`}
                </h3>
                <p>{`Description: ${incident.description}`}</p>

                <p>{`Location: ${incident.latitude}, ${incident.longitude}`}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(incident.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No incident Available</div>
      )}
      <div>
        <button className="myBtn">
          <Link to="/">Back To Form</Link>
        </button>
      </div>
    </div>
  );
}

export default IncidentList;
