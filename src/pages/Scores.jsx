import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import MatchCard from "../components/MatchCard";

function Scores() {
  const [matches, setMatches] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // SELECT matches
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

  useEffect(() => {
    loadMatches();
  }, []);

  // Runs when the user picks a match in the dropdown
  function handleSelect(e) {
    const id = e.target.value;
    setSelectedId(id);

    const match = matches.find((m) => m.id === Number(id));
    if (match && match.team1_score !== null) {
      setScore1(match.team1_score);
      setScore2(match.team2_score);
    } else {
      setScore1("");
      setScore2("");
    }
  }

  // UPDATE the selected match in Supabase
  async function handleSubmit(e) {
    e.preventDefault();

    if (selectedId === "" || score1 === "" || score2 === "") {
      setError("Please select a match and enter both scores.");
      return;
    }

    if (Number(score1) < 0 || Number(score2) < 0) {
      setError("Scores cannot be negative.");
      return;
    }

    const response = await supabase
      .from("matches")
      .update({
        team1_score: Number(score1),
        team2_score: Number(score2),
        status: "Completed",
      })
      .eq("id", Number(selectedId));

    if (response.error) {
      setError(response.error.message);
      return;
    }

    setSelectedId("");
    setScore1("");
    setScore2("");
    setError("");
    loadMatches();
  }

  return (
    <div>
      <h2>Enter / Update Score</h2>

      <form className="form" onSubmit={handleSubmit}>
        <select value={selectedId} onChange={handleSelect}>
          <option value="">Select a match</option>
          {matches.map((m) => (
            <option key={m.id} value={m.id}>
              {m.team1} vs {m.team2} ({m.match_date})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Team 1 score"
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
        />

        <input
          type="number"
          placeholder="Team 2 score"
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
        />

        <button type="submit">Update Score</button>
      </form>

      {error && <p className="error">{error}</p>}

      <h2>All Matches ({matches.length})</h2>

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No matches yet. Add one on the Fixtures page.</p>
      ) : (
        matches.map((match) => <MatchCard key={match.id} match={match} />)
      )}
    </div>
  );
}

export default Scores;