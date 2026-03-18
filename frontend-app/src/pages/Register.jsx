import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    NotebookTabs,
    Github,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";

export default function Register() {
    const colors = {
        primary: "#0F2744",
        primarySoft: "#1E3A5F",
        primaryTint: "#EAF0F7",
        background: "#F7F9FC",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
        successBg: "#ECFDF3",
        successText: "#027A48",
        errorBg: "#FEF3F2",
        errorText: "#B42318",
    };

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
                localStorage.setItem("auth_token", token);
                navigate("/");
            } else {
                setMessage("Registration successful! You can now log in.");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    }

    const inputStyle = {
        width: "100%",
        padding: "14px 16px",
        borderRadius: "14px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.white,
        color: colors.text,
        outline: "none",
        fontSize: "0.98rem",
        transition: "all 0.2s ease",
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
        borderRadius: "14px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.white,
        color: colors.text,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        transition: "all 0.2s ease",
    };

    const benefits = [
        "Organize notes, tasks, and ideas in one place",
        "Build better study structure and consistency",
        "Stay focused with a clean academic workspace",
    ];

    return (
        <div
            className="min-vh-100 d-flex align-items-center py-4 py-lg-5"
            style={{
                background: "linear-gradient(180deg, #F7F9FC 0%, #EEF4FA 100%)",
                fontFamily:
                    'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-11">
                        <div
                            className="row g-0 overflow-hidden rounded-4"
                            style={{
                                backgroundColor: colors.white,
                                border: `1px solid ${colors.border}`,
                                boxShadow: "0 20px 50px rgba(15, 39, 68, 0.08)",
                            }}
                        >
                            {/* LEFT PANEL */}
                            <div
                                className="col-lg-5 d-none d-lg-flex"
                                style={{
                                    background:
                                        "linear-gradient(160deg, #0F2744 0%, #183B63 100%)",
                                    color: colors.white,
                                }}
                            >
                                <div className="p-4 p-xl-5 d-flex flex-column justify-content-between w-100">
                                    <div>
                                        <Link
                                            to="/"
                                            className="d-inline-flex align-items-center gap-2 text-decoration-none mb-5"
                                            style={{ color: colors.white }}
                                        >
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-3"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                    backgroundColor: "rgba(255,255,255,0.12)",
                                                    border: "1px solid rgba(255,255,255,0.18)",
                                                }}
                                            >
                                                <NotebookTabs size={20} />
                                            </div>
                                            <span className="fw-semibold fs-5">NoteBook</span>
                                        </Link>

                                        <div
                                            className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4"
                                            style={{
                                                backgroundColor: "rgba(255,255,255,0.10)",
                                                border: "1px solid rgba(255,255,255,0.15)",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            <ShieldCheck size={16} />
                                            Academic productivity, refined
                                        </div>

                                        <h2
                                            className="fw-bold mb-3"
                                            style={{
                                                fontSize: "2.4rem",
                                                lineHeight: 1.1,
                                                letterSpacing: "-0.03em",
                                            }}
                                        >
                                            Build your academic system with clarity.
                                        </h2>

                                        <p
                                            className="mb-4"
                                            style={{
                                                color: "rgba(255,255,255,0.82)",
                                                lineHeight: 1.8,
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Join NoteBook and create a cleaner, more focused
                                            workspace for your notes, priorities, and daily momentum.
                                        </p>

                                        <div className="d-flex flex-column gap-3">
                                            {benefits.map((item, index) => (
                                                <div
                                                    className="d-flex align-items-start gap-3"
                                                    key={index}
                                                >
                                                    <CheckCircle2
                                                        size={18}
                                                        style={{
                                                            marginTop: "3px",
                                                            color: "#86EFAC",
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            color: "rgba(255,255,255,0.88)",
                                                            lineHeight: 1.6,
                                                        }}
                                                    >
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div
                                        className="mt-5 p-4 rounded-4"
                                        style={{
                                            backgroundColor: "rgba(255,255,255,0.08)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                        }}
                                    >
                                        <div className="fw-semibold mb-2">
                                            Start strong from day one
                                        </div>
                                        <p
                                            className="mb-0"
                                            style={{
                                                color: "rgba(255,255,255,0.78)",
                                                lineHeight: 1.7,
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            Structure your learning, reduce clutter, and keep your
                                            productivity visible in one modern workspace.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT PANEL */}
                            <div className="col-lg-7">
                                <div className="p-4 p-md-5 p-xl-5">
                                    <div className="text-center text-lg-start mb-4">
                                        <div
                                            className="d-inline-flex d-lg-none align-items-center justify-content-center rounded-4 mb-3"
                                            style={{
                                                width: "64px",
                                                height: "64px",
                                                backgroundColor: colors.primaryTint,
                                                color: colors.primary,
                                            }}
                                        >
                                            <NotebookTabs size={32} strokeWidth={2} />
                                        </div>

                                        <h1
                                            className="fw-bold mb-2"
                                            style={{
                                                color: colors.text,
                                                fontSize: "2rem",
                                                letterSpacing: "-0.02em",
                                            }}
                                        >
                                            Create your account
                                        </h1>

                                        <p className="mb-0" style={{ color: colors.muted }}>
                                            Start organizing your academic workflow with NoteBook.
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
                                                <path
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    fill="#EA4335"
                                                />
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
                                            style={{
                                                height: "1px",
                                                backgroundColor: colors.border,
                                            }}
                                        />
                                        <span
                                            className="px-3 small"
                                            style={{ color: colors.muted }}
                                        >
                                            or sign up with email
                                        </span>
                                        <div
                                            className="flex-grow-1"
                                            style={{
                                                height: "1px",
                                                backgroundColor: colors.border,
                                            }}
                                        />
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" style={labelStyle}>
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Jane Doe"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" style={labelStyle}>
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="password" style={labelStyle}>
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Create a password"
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    required
                                                    minLength={6}
                                                    style={inputStyle}
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label
                                                    htmlFor="password_confirmation"
                                                    style={labelStyle}
                                                >
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    placeholder="Confirm password"
                                                    value={form.password_confirmation}
                                                    onChange={handleChange}
                                                    required
                                                    style={inputStyle}
                                                />
                                            </div>
                                        </div>

                                        {message && (
                                            <div
                                                className="mb-3 px-3 py-3 rounded-3"
                                                style={{
                                                    backgroundColor: colors.successBg,
                                                    color: colors.successText,
                                                    fontSize: "0.95rem",
                                                    border: `1px solid ${colors.border}`,
                                                }}
                                            >
                                                {message}
                                            </div>
                                        )}

                                        {error && (
                                            <div
                                                className="mb-3 px-3 py-3 rounded-3"
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
                                            className="btn w-100 py-3 rounded-3 d-inline-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                backgroundColor: colors.primary,
                                                color: colors.white,
                                                border: `1px solid ${colors.primary}`,
                                                fontWeight: 600,
                                                boxShadow:
                                                    "0 10px 24px rgba(15, 39, 68, 0.12)",
                                            }}
                                        >
                                            {isLoading ? "Creating account..." : "Create account"}
                                            {!isLoading && <ArrowRight size={18} />}
                                        </button>
                                    </form>

                                    <p
                                        className="text-center mt-4 mb-0"
                                        style={{ color: colors.muted }}
                                    >
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-decoration-none fw-semibold"
                                            style={{ color: colors.primary }}
                                        >
                                            Log in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}