import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { NotebookTabs, Github } from "lucide-react";
import "./Login.css";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // --- NEW: OAuth Redirect Handlers ---
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/api/v1/auth/google/redirect";
    };

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:8000/api/v1/auth/github/redirect";
    };

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);

        if (form.password !== form.password_confirmation) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/register", form);
            const token = response.data.data?.token || response.data.token;

            if (token) {
                // Instantly log them in after registration
                localStorage.setItem("auth_token", token);
                navigate("/");
            } else {
                setMessage("Registration successful! You can now log in.");
            }

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="notion-auth-wrapper">
            <div className="notion-auth-container">
                <div className="auth-header">
                    <NotebookTabs className="auth-logo" size={40} />
                    <h1>Create an account</h1>
                </div>

                {/* --- NEW: Added Social Buttons to Register Page --- */}
                <div className="auth-methods">
                    <button className="btn-social" type="button" onClick={handleGoogleLogin}>
                        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <button className="btn-social" type="button" onClick={handleGithubLogin}>
                        <Github size={18} />
                        Continue with GitHub
                    </button>
                </div>

                <div className="auth-divider">
                    <span>or</span>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address..."
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Confirm your password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {message && <div className="status-message success">{message}</div>}
                    {error && <div className="status-message error">{error}</div>}

                    <button type="submit" className="btn-continue" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Continue with Email"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}