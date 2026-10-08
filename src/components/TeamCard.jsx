function TeamCard({ team }) {
  return (
    <div className="card">
      <h3>{team.name}</h3>
      <p>Captain: {team.captain}</p>
      <p>City: {team.city}</p>
    </div>
  );
}

export default TeamCard;