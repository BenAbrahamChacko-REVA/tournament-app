function MatchCard({ match }) {
  return (
    <div className="card">
      <h3>
        {match.team1} vs {match.team2}
      </h3>
      <p>Venue: {match.venue}</p>
      <p>Date: {match.match_date}</p>
      <p>Status: {match.status}</p>

      {match.status === "Completed" && (
        <p className="score">
          Score: {match.team1_score} - {match.team2_score}
        </p>
      )}
    </div>
  );
}

export default MatchCard;