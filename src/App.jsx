import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Fixtures from "./pages/Fixtures";
import Scores from "./pages/Scores";
import Rankings from "./pages/Rankings";

function App() {
  const [user, setUser] = useState(null);

  // Not logged in: show only the login page
  if (user === null) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div>
      <Navbar user={user} onLogout={() => setUser(null)} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams" element={<Teams role={user.role} />} />
          <Route path="/fixtures" element={<Fixtures role={user.role} />} />
          <Route path="/scores" element={<Scores role={user.role} />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;