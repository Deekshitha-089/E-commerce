import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(form);

      // ✅ JWT stored safely
      localStorage.setItem("token", result.token);

      navigate("/dashboard");
    } catch (err) {
      // ✅ backend message shown directly
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="link">
        New here? <a href="/">Create account</a>
      </div>
    </div>
  );
}

export default Login;
