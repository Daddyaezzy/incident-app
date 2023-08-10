import "./styles/main.css";
import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Citizens Reporting Solution App</h1>
        <main className="app-content">
          <Routes>
            <Route exact path="/" element={<IncidentForm />} />

            <Route path="/incidents" element={<IncidentList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
