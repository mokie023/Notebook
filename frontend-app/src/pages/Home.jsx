import { Link } from "react-router-dom";
import { NotebookTabs, FileText, CheckSquare, TimerReset, ArrowRight } from "lucide-react";

export default function Home() {
    const colors = {
        primary: "#0F2744",
        primaryTint: "#EAF0F7",
        background: "#F7F9FC",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
        overlay: "rgba(247, 249, 252, 0.72)",
    };

    const features = [
        {
            icon: <FileText size={22} strokeWidth={1.8} />,
            title: "Rich Notes",
            description:
                "Capture class notes, study summaries, ideas, and research in one clear workspace built for focused learning.",
        },
        {
            icon: <CheckSquare size={22} strokeWidth={1.8} />,
            title: "Task Management",
            description:
                "Track assignments, deadlines, and personal goals with a simple system that keeps priorities visible.",
        },
        {
            icon: <TimerReset size={22} strokeWidth={1.8} />,
            title: "Pomodoro Focus",
            description:
                "Use focused work sessions to stay consistent, reduce distractions, and build productive study habits.",
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
            <nav className="navbar navbar-expand-lg py-3" style={{ backgroundColor: colors.white }}>
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
                            className="text-decoration-none small fw-medium"
                            style={{ color: colors.primary }}
                        >
                            Log in
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-sm px-3 py-2 rounded-3"
                            style={{
                                backgroundColor: colors.primary,
                                color: colors.white,
                                border: `1px solid ${colors.primary}`,
                                fontWeight: 600,
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <section
                className="d-flex align-items-center"
                style={{
                    minHeight: "78vh",
                    backgroundImage: `
                        linear-gradient(${colors.overlay}, ${colors.overlay}),
                        url("/bg.jpg")
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container py-5">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10 col-xl-9">
                            <div
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4 rounded-pill"
                                style={{
                                    border: `1px solid ${colors.border}`,
                                    color: colors.primary,
                                    fontSize: "0.9rem",
                                    backgroundColor: "rgba(255,255,255,0.82)",
                                    backdropFilter: "blur(4px)",
                                }}
                            >
                                <NotebookTabs size={16} strokeWidth={1.8} />
                                Academic productivity, refined
                            </div>

                            <h1
                                className="fw-bold mb-3 mx-auto"
                                style={{
                                    fontSize: "clamp(2.6rem, 6vw, 5rem)",
                                    lineHeight: 1.02,
                                    letterSpacing: "-0.03em",
                                    color: colors.text,
                                    maxWidth: "900px",
                                }}
                            >
                                Your workspace. Simplified.
                            </h1>

                            <p
                                className="mx-auto mb-4"
                                style={{
                                    maxWidth: "720px",
                                    fontSize: "1.1rem",
                                    lineHeight: 1.8,
                                    color: colors.muted,
                                    backgroundColor: "rgba(255,255,255,0.35)",
                                }}
                            >
                                Organize your notes, tasks, and ideas in a modern academic
                                workspace built for clarity, momentum, and intelligent
                                productivity.
                            </p>

                            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4">
                                <Link
                                    to="/register"
                                    className="btn px-4 px-md-5 py-3 rounded-3 d-inline-flex align-items-center gap-2"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: colors.white,
                                        border: `1px solid ${colors.primary}`,
                                        fontWeight: 600,
                                        minWidth: "190px",
                                        justifyContent: "center",
                                    }}
                                >
                                    Get Started
                                    <ArrowRight size={18} strokeWidth={2} />
                                </Link>

                                <Link
                                    to="/login"
                                    className="btn px-4 px-md-5 py-3 rounded-3"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.88)",
                                        color: colors.primary,
                                        border: `1px solid ${colors.border}`,
                                        fontWeight: 600,
                                        minWidth: "160px",
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
                                    className="h-100 p-4 rounded-4"
                                    style={{
                                        backgroundColor: colors.white,
                                        border: `1px solid ${colors.border}`,
                                    }}
                                >
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                                        style={{
                                            width: "46px",
                                            height: "46px",
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
                                            fontSize: "1.08rem",
                                            color: colors.text,
                                        }}
                                    >
                                        {feature.title}
                                    </h3>

                                    <p
                                        className="mb-0 text-start"
                                        style={{
                                            color: colors.muted,
                                            lineHeight: 1.75,
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

            <section className="py-5" style={{ backgroundColor: colors.white }}>
                <div className="container">
                    <div className="row align-items-center g-5">

                        {/* LEFT TEXT */}
                        <div className="col-lg-6">
                            <h2
                                className="fw-bold mb-3"
                                style={{ fontSize: "2.2rem", color: colors.text }}
                            >
                                Designed for clarity and focus
                            </h2>

                            <p
                                style={{
                                    color: colors.muted,
                                    lineHeight: 1.8,
                                    fontSize: "1.05rem",
                                }}
                            >
                                NoteBook brings your notes, tasks, and focus sessions into one
                                streamlined workspace so you can think clearly, plan better, and
                                execute without friction.
                            </p>

                            <div className="mt-4 d-flex flex-column gap-3">
                                <div className="d-flex align-items-start gap-3">
                                    <div style={{ color: colors.primary }}>✔</div>
                                    <span style={{ color: colors.muted }}>
                                        Everything organized in one place
                                    </span>
                                </div>

                                <div className="d-flex align-items-start gap-3">
                                    <div style={{ color: colors.primary }}>✔</div>
                                    <span style={{ color: colors.muted }}>
                                        Minimal interface, maximum focus
                                    </span>
                                </div>

                                <div className="d-flex align-items-start gap-3">
                                    <div style={{ color: colors.primary }}>✔</div>
                                    <span style={{ color: colors.muted }}>
                                        Built for students and deep thinkers
                                    </span>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </section>


        </div>
    );
}