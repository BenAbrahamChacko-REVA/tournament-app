import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import TeamCard from "../components/TeamCard";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [captain, setCaptain] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // SELECT: get all teams from Supabase
  async function loadTeams() {
    const response = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: true });

    if (response.error) {
      setError(response.error.message);
    } else {
      setTeams(response.data);
    }
    setLoading(false);
  }

  // Run loadTeams once, when the page first appears
  useEffect(() => {
    loadTeams();
  }, []);

  // INSERT: add a new team to Supabase
  async function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || captain === "" || city === "") {
      setError("Please fill in all fields.");
      return;
    }

    const response = await supabase
      .from("teams")
      .insert([{ name: name, captain: captain, city: city }]);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    setName("");
    setCaptain("");
    setCity("");
    setError("");
    loadTeams();
  }

  return (
    <div>
      <h2>Add Team</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Captain"
          value={captain}
          onChange={(e) => setCaptain(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Add Team</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h2>All Teams ({teams.length})</h2>

      {loading ? (
        <p>Loading...</p>
      ) : teams.length === 0 ? (
        <p>No teams yet.</p>
      ) : (
        teams.map((team) => <TeamCard key={team.id} team={team} />)
      )}
    </div>
  );
}

export default Teams;