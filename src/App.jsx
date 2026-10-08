import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Fixtures from "./pages/Fixtures";
import Scores from "./pages/Scores";
import Rankings from "./pages/Rankings";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;