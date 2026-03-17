import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { NotebookTabs, Github } from "lucide-react";

export default function Login() {
    const colors = {
        primary: "#0F2744",
        primaryTint: "#EAF0F7",
        background: "#F7F9FC",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
        errorBg: "#FEF3F2",
        errorText: "#B42318",
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/api/v1/auth/google/redirect";
    };

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:8000/api/v1/auth/github/redirect";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await api.post("/auth/login", { email, password });
            const token = response.data.data?.token || response.data.token;

            if (token) {
                localStorage.setItem("auth_token", token);
                navigate("/");
            } else {
                setError("No token received from server.");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to log in. Please check your credentials."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "14px 16px",
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.white,
        color: colors.text,
        outline: "none",
        fontSize: "0.98rem",
    };

    const labelStyle = {
        fontSize: "0.92rem",
        fontWeight: 600,
        color: colors.text,
        marginBottom: "8px",
        display: "block",
    };

    const socialBtnStyle = {
        width: "100%",
        padding: "13px 16px",
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.white,
        color: colors.text,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center py-5"
            style={{
                backgroundColor: colors.background,
                fontFamily:
                    'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-6 col-xl-4">
                        <div
                            className="p-4 rounded-4"
                            style={{
                                backgroundColor: colors.white,
                                border: `1px solid ${colors.border}`,
                            }}
                        >
                            <div className="text-center mb-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: colors.primaryTint,
                                        color: colors.primary,
                                    }}
                                >
                                    <NotebookTabs size={30} strokeWidth={2} />
                                </div>

                                <h1
                                    className="fw-bold mb-2"
                                    style={{
                                        color: colors.text,
                                        fontSize: "1.8rem",
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    Log in to NoteBook
                                </h1>

                                <p className="mb-0" style={{ color: colors.muted }}>
                                    Welcome back. Continue where you left off.
                                </p>
                            </div>

                            <div className="d-grid gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    style={socialBtnStyle}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </button>

                                <button
                                    type="button"
                                    onClick={handleGithubLogin}
                                    style={socialBtnStyle}
                                >
                                    <Github size={18} />
                                    Continue with GitHub
                                </button>
                            </div>

                            <div className="d-flex align-items-center my-4">
                                <div
                                    className="flex-grow-1"
                                    style={{ height: "1px", backgroundColor: colors.border }}
                                />
                                <span className="px-3 small" style={{ color: colors.muted }}>
                                    or
                                </span>
                                <div
                                    className="flex-grow-1"
                                    style={{ height: "1px", backgroundColor: colors.border }}
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" style={labelStyle}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" style={labelStyle}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={inputStyle}
                                    />
                                </div>

                                {error && (
                                    <div
                                        className="mb-3 px-3 py-2 rounded-3"
                                        style={{
                                            backgroundColor: colors.errorBg,
                                            color: colors.errorText,
                                            fontSize: "0.95rem",
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn w-100 py-3 rounded-3"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: colors.white,
                                        border: `1px solid ${colors.primary}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {isLoading ? "Logging in..." : "Log in"}
                                </button>
                            </form>

                            <p
                                className="text-center mt-4 mb-0"
                                style={{ color: colors.muted }}
                            >
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-decoration-none fw-semibold"
                                    style={{ color: colors.primary }}
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}