import { useEffect, useState } from "react";
import { getProfile } from "../api/user";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="auth-container">
      <h2>Dashboard</h2>

      {error && <p className="error">{error}</p>}

      {profile && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p><strong>Email:</strong> {profile.email}</p>
          <p>{profile.message}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
