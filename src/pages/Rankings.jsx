import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function Rankings() {
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

  function calculateRankings() {
    // Step 1: one row per team, everything starts at 0
    const table = teams.map((team) => ({
      team: team.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      points: 0,
    }));

    // Step 2: only completed matches count
    const completed = matches.filter((m) => m.status === "Completed");

    // Step 3: go through each completed match and update both teams
    completed.forEach((match) => {
      const row1 = table.find((r) => r.team === match.team1);
      const row2 = table.find((r) => r.team === match.team2);

      // Skip the match if a team name is not found in the teams table
      if (!row1 || !row2) {
        return;
      }

      row1.played += 1;
      row2.played += 1;

      if (match.team1_score > match.team2_score) {
        row1.won += 1;
        row1.points += 3;
        row2.lost += 1;
      } else if (match.team1_score < match.team2_score) {
        row2.won += 1;
        row2.points += 3;
        row1.lost += 1;
      } else {
        row1.drawn += 1;
        row2.drawn += 1;
        row1.points += 1;
        row2.points += 1;
      }
    });

    // Step 4: highest points first
    table.sort((a, b) => b.points - a.points);

    return table;
  }

  const rankings = calculateRankings();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Rankings</h2>

      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((row, index) => (
            <tr key={row.team}>
              <td>{index + 1}</td>
              <td>{row.team}</td>
              <td>{row.played}</td>
              <td>{row.won}</td>
              <td>{row.drawn}</td>
              <td>{row.lost}</td>
              <td>
                <strong>{row.points}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rankings;