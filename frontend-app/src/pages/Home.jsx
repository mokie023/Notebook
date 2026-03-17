import { Link } from "react-router-dom";
import { NotebookTabs, FileText, CheckSquare, TimerReset } from "lucide-react";

export default function Home() {
    const colors = {
        primary: "#0F2744",
        primaryHover: "#0A1D33",
        primaryTint: "#EAF0F7",
        background: "#F7F9FC",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
    };

    const features = [
        {
            icon: <FileText size={22} strokeWidth={1.8} />,
            title: "Rich Notes",
            description:
                "Capture ideas, lecture notes, summaries, and research in a clean writing space designed for clarity.",
        },
        {
            icon: <CheckSquare size={22} strokeWidth={1.8} />,
            title: "Task Management",
            description:
                "Plan assignments, track deadlines, and stay organized with a simple workflow built for students and creators.",
        },
        {
            icon: <TimerReset size={22} strokeWidth={1.8} />,
            title: "Pomodoro Focus",
            description:
                "Stay locked in with built-in focus sessions that help you work deeply without clutter or distraction.",
        },
    ];

    return (
        <div
            className="min-vh-100"
            style={{
                backgroundColor: colors.background,
                color: colors.text,
                fontFamily:
                    'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            }}
        >
            <nav
                className="navbar navbar-expand-lg py-3"
                style={{ backgroundColor: "transparent" }}
            >
                <div className="container">
                    <Link
                        to="/"
                        className="navbar-brand d-flex align-items-center gap-2 fw-semibold m-0 text-decoration-none"
                        style={{ color: colors.primary, fontSize: "1.05rem" }}
                    >
                        <NotebookTabs size={22} strokeWidth={2} />
                        <span>NoteBook</span>
                    </Link>

                    <div className="d-flex align-items-center gap-3">
                        <Link
                            to="/login"
                            className="text-decoration-none small"
                            style={{ color: colors.primary }}
                        >
                            Log in
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-sm px-3 py-2 rounded-2"
                            style={{
                                backgroundColor: colors.primary,
                                color: colors.white,
                                border: `1px solid ${colors.primary}`,
                                fontWeight: 500,
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <section
                className="py-5 mt-5"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to bottom,
                            rgba(247,249,252,0.94),
                            rgba(247,249,252,0.90)
                        ),
                        url("/bg.jpg")
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-9 col-xl-8">
                            <div
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4 rounded-pill"
                                style={{
                                    border: `1px solid ${colors.border}`,
                                    color: colors.primary,
                                    fontSize: "0.9rem",
                                    backgroundColor: "rgba(255,255,255,0.78)",
                                }}
                            >
                                <NotebookTabs size={16} strokeWidth={1.8} />
                                Academic productivity, refined
                            </div>

                            <h1
                                className="fw-bold mb-3"
                                style={{
                                    fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.02em",
                                    color: colors.text,
                                }}
                            >
                                Your workspace. Simplified.
                            </h1>

                            <p
                                className="mx-auto mb-4"
                                style={{
                                    maxWidth: "650px",
                                    fontSize: "1.1rem",
                                    lineHeight: 1.7,
                                    color: colors.muted,
                                }}
                            >
                                Organize your notes, tasks, and ideas in a modern digital
                                workspace. Built for speed, clarity, and intelligent
                                productivity.
                            </p>

                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                                <Link
                                    to="/register"
                                    className="btn px-4 py-3 rounded-2"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: colors.white,
                                        border: `1px solid ${colors.primary}`,
                                        fontWeight: 500,
                                    }}
                                >
                                    Get Started
                                </Link>

                                <Link
                                    to="/login"
                                    className="btn px-4 py-3 rounded-2"
                                    style={{
                                        backgroundColor: colors.white,
                                        color: colors.primary,
                                        border: `1px solid ${colors.border}`,
                                        fontWeight: 500,
                                    }}
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div className="col-md-4" key={index}>
                                <div
                                    className="h-100 p-4 rounded-3"
                                    style={{
                                        backgroundColor: colors.white,
                                        border: `1px solid ${colors.border}`,
                                    }}
                                >
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center rounded-2 mb-3"
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            border: `1px solid ${colors.border}`,
                                            color: colors.primary,
                                            backgroundColor: colors.primaryTint,
                                        }}
                                    >
                                        {feature.icon}
                                    </div>

                                    <h3
                                        className="fw-semibold mb-2 text-start"
                                        style={{
                                            fontSize: "1.1rem",
                                            color: colors.text,
                                        }}
                                    >
                                        {feature.title}
                                    </h3>

                                    <p
                                        className="mb-0 text-start"
                                        style={{
                                            color: colors.muted,
                                            lineHeight: 1.7,
                                            fontSize: "0.98rem",
                                        }}
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}