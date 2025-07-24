import React, { useState } from "react";

const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8f8fa",
};
const boxStyle = {
    background: "#fff",
    padding: "2.5rem 2.5rem 2rem 2.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    minWidth: 340,
    maxWidth: "90vw",
};
const titleStyle = {
    color: "#4a4e69",
    fontWeight: 700,
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
};
const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.2rem",
};
const labelStyle = {
    fontWeight: 500,
    marginBottom: "0.4rem",
    color: "#4a4e69",
};
const inputStyle = {
    padding: "0.7rem 0.9rem",
    border: "1.5px solid #9a8c98",
    borderRadius: "5px",
    fontSize: "1rem",
};
const buttonStyle = {
    width: "100%",
    padding: "0.8rem 0",
    background: "#4a4e69",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: 600,
    fontSize: "1.1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
};
const errorStyle = {
    color: "#c9184a",
    marginBottom: "1rem",
    textAlign: "center",
};

const LoginPage = ({ onLogin }) => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        // Placeholder: Replace with real authentication logic
        if (form.username === "admin" && form.password === "admin") {
            onLogin();
        } else {
            setError("Invalid username or password");
        }
        setLoading(false);
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <div style={titleStyle}>Admin Login</div>
                {error && <div style={errorStyle}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Username</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            style={inputStyle}
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button style={buttonStyle} type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 