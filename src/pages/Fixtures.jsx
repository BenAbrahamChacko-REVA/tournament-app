import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import MatchCard from "../components/MatchCard";

function Fixtures() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [venue, setVenue] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // SELECT teams (for the dropdowns)
  async function loadTeams() {
    const response = await supabase.from("teams").select("*");
    if (response.error) {
      setError(response.error.message);
    } else {
      setTeams(response.data);
    }
  }

  // SELECT matches (for the list)
  async function loadMatches() {
    const response = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true });

    if (response.error) {
      setError(response.error.message);
    } else {
      setMatches(response.data);
    }
    setLoading(false);
  }

  // Run both once, when the page first appears
  useEffect(() => {
    loadTeams();
    loadMatches();
  }, []);

  // INSERT a new fixture
  async function handleSubmit(e) {
    e.preventDefault();

    if (team1 === "" || team2 === "" || venue === "" || matchDate === "") {
      setError("Please fill in all fields.");
      return;
    }

    if (team1 === team2) {
      setError("A team cannot play against itself.");
      return;
    }

    const response = await supabase.from("matches").insert([
      {
        team1: team1,
        team2: team2,
        venue: venue,
        match_date: matchDate,
        status: status,
      },
    ]);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    setTeam1("");
    setTeam2("");
    setVenue("");
    setMatchDate("");
    setStatus("Upcoming");
    setError("");
    loadMatches();
  }

  return (
    <div>
      <h2>Add Fixture</h2>

      <form className="form" onSubmit={handleSubmit}>
        <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
          <option value="">Select Team 1</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
          <option value="">Select Team 2</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />

        <input
          type="date"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Add Fixture</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h2>All Fixtures ({matches.length})</h2>

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No fixtures yet.</p>
      ) : (
        matches.map((match) => <MatchCard key={match.id} match={match} />)
      )}
    </div>
  );
}

export default Fixtures;