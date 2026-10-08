import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      onLogin({ name: "Admin", role: "admin" });
    } else if (username === "user" && password === "user123") {
      onLogin({ name: "User", role: "user" });
    } else {
      setError("Wrong username or password.");
    }
  }

  return (
    <div className="login-box">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="hint">Admin: admin / admin123</p>
      <p className="hint">User: user / user123</p>
    </div>
  );
}

export default Login;