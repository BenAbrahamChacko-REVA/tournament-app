import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import MatchCard from "../components/MatchCard";

function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // SELECT both tables
  async function loadData() {
    const teamsResponse = await supabase.from("teams").select("*");
    const matchesResponse = await supabase.from("matches").select("*");

    if (teamsResponse.error) {
      setError(teamsResponse.error.message);
    } else {
      setTeams(teamsResponse.data);
    }

    if (matchesResponse.error) {
      setError(matchesResponse.error.message);
    } else {
      setMatches(matchesResponse.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Find the next match
  const upcomingMatches = matches.filter((m) => m.status === "Upcoming");
  upcomingMatches.sort((a, b) => a.match_date.localeCompare(b.match_date));
  const nextMatch = upcomingMatches[0];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Tournament Overview</h2>

      {error && <p className="error">{error}</p>}

      <div className="stats">
        <div className="stat-box">
          <h3>{teams.length}</h3>
          <p>Teams</p>
        </div>
        <div className="stat-box">
          <h3>{matches.length}</h3>
          <p>Matches</p>
        </div>
        <div className="stat-box">
          <h3>{upcomingMatches.length}</h3>
          <p>Upcoming</p>
        </div>
      </div>

      <h2>Next Match</h2>
      {nextMatch ? (
        <MatchCard match={nextMatch} />
      ) : (
        <p>No upcoming matches.</p>
      )}
    </div>
  );
}

export default Dashboard;