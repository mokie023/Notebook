import { Link } from "react-router-dom";
import {
    NotebookTabs,
    FileText,
    CheckSquare,
    TimerReset,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    LayoutDashboard,
    CheckCircle2,
} from "lucide-react";

export default function Home() {
    const colors = {
        primary: "#0F2744",
        primarySoft: "#1E3A5F",
        primaryTint: "#EAF0F7",
        background: "#F7F9FC",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
        overlay: "rgba(247, 249, 252, 0.78)",
        success: "#16A34A",
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

    const highlights = [
        "Everything organized in one place",
        "Minimal interface, maximum focus",
        "Built for students and deep thinkers",
    ];

    const stats = [
        { label: "Notes Organized", value: "Smart" },
        { label: "Task Visibility", value: "Clear" },
        { label: "Focus Flow", value: "Consistent" },
    ];

    const cardStyle = {
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 10px 30px rgba(15, 39, 68, 0.06)",
    };

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
            {/* NAVBAR */}
            <nav
                className="navbar navbar-expand-lg py-3 sticky-top"
                style={{
                    backgroundColor: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(10px)",
                    borderBottom: `1px solid ${colors.border}`,
                }}
            >
                <div className="container">
                    <Link
                        to="/"
                        className="navbar-brand d-flex align-items-center gap-2 fw-semibold m-0 text-decoration-none"
                        style={{ color: colors.primary, fontSize: "1.08rem" }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                                width: "38px",
                                height: "38px",
                                backgroundColor: colors.primaryTint,
                                border: `1px solid ${colors.border}`,
                            }}
                        >
                            <NotebookTabs size={20} strokeWidth={2} />
                        </div>
                        <span>NoteBook</span>
                    </Link>

                    <div className="d-flex align-items-center gap-3">
                        <Link
                            to="/login"
                            className="text-decoration-none fw-medium"
                            style={{ color: colors.primary, fontSize: "0.95rem" }}
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
                                boxShadow: "0 8px 20px rgba(15, 39, 68, 0.14)",
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section
                className="d-flex align-items-center position-relative overflow-hidden"
                style={{
                    minHeight: "88vh",
                    backgroundImage: `
                        linear-gradient(${colors.overlay}, ${colors.overlay}),
                        url("/bg.jpg")
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="container py-5 position-relative">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10 col-xl-9">
                            <div
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4 rounded-pill"
                                style={{
                                    border: `1px solid ${colors.border}`,
                                    color: colors.primary,
                                    fontSize: "0.9rem",
                                    backgroundColor: "rgba(255,255,255,0.84)",
                                    backdropFilter: "blur(6px)",
                                    boxShadow: "0 6px 20px rgba(15, 39, 68, 0.05)",
                                }}
                            >
                                <Sparkles size={16} strokeWidth={1.8} />
                                Academic productivity, refined
                            </div>

                            <h1
                                className="fw-bold mb-3 mx-auto"
                                style={{
                                    fontSize: "clamp(2.8rem, 6vw, 5.3rem)",
                                    lineHeight: 1,
                                    letterSpacing: "-0.04em",
                                    color: colors.text,
                                    maxWidth: "920px",
                                }}
                            >
                                Study, plan, and think clearly in one modern workspace.
                            </h1>

                            <p
                                className="mx-auto mb-4"
                                style={{
                                    maxWidth: "760px",
                                    fontSize: "1.1rem",
                                    lineHeight: 1.85,
                                    color: colors.muted,
                                }}
                            >
                                NoteBook helps students organize notes, manage tasks, and build
                                consistent focus using a clean interface designed for clarity,
                                momentum, and purposeful work.
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
                                        minWidth: "210px",
                                        justifyContent: "center",
                                        boxShadow: "0 10px 24px rgba(15, 39, 68, 0.16)",
                                    }}
                                >
                                    Start for free
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
                                        minWidth: "170px",
                                        boxShadow: "0 8px 20px rgba(15, 39, 68, 0.05)",
                                    }}
                                >
                                    Log in
                                </Link>
                            </div>

                            <div className="row g-3 justify-content-center mt-5">
                                {stats.map((stat, index) => (
                                    <div className="col-10 col-sm-4" key={index}>
                                        <div
                                            className="rounded-4 px-4 py-3 h-100"
                                            style={{
                                                backgroundColor: "rgba(255,255,255,0.82)",
                                                border: `1px solid ${colors.border}`,
                                                backdropFilter: "blur(6px)",
                                                boxShadow: "0 8px 22px rgba(15, 39, 68, 0.05)",
                                            }}
                                        >
                                            <div
                                                className="fw-bold"
                                                style={{
                                                    color: colors.primary,
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                {stat.value}
                                            </div>
                                            <div
                                                style={{
                                                    color: colors.muted,
                                                    fontSize: "0.92rem",
                                                }}
                                            >
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-5 py-lg-6">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2
                            className="fw-bold mb-3"
                            style={{ fontSize: "2.1rem", color: colors.text }}
                        >
                            Everything you need to stay academically organized
                        </h2>
                        <p
                            className="mx-auto"
                            style={{
                                maxWidth: "700px",
                                color: colors.muted,
                                lineHeight: 1.8,
                            }}
                        >
                            A focused productivity system designed to reduce clutter, improve
                            consistency, and help you keep track of what matters most.
                        </p>
                    </div>

                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div className="col-md-4" key={index}>
                                <div
                                    className="h-100 p-4 rounded-4"
                                    style={cardStyle}
                                >
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                                        style={{
                                            width: "50px",
                                            height: "50px",
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

            {/* CLARITY SECTION */}
            <section className="py-5 py-lg-6" style={{ backgroundColor: colors.white }}>
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <div
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3"
                                style={{
                                    backgroundColor: colors.primaryTint,
                                    color: colors.primary,
                                    border: `1px solid ${colors.border}`,
                                    fontSize: "0.9rem",
                                }}
                            >
                                <ShieldCheck size={16} strokeWidth={1.8} />
                                Designed for clarity and focus
                            </div>

                            <h2
                                className="fw-bold mb-3"
                                style={{ fontSize: "2.3rem", color: colors.text, lineHeight: 1.15 }}
                            >
                                A calm interface that helps you do better work.
                            </h2>

                            <p
                                style={{
                                    color: colors.muted,
                                    lineHeight: 1.85,
                                    fontSize: "1.05rem",
                                }}
                            >
                                NoteBook brings your notes, tasks, and focus sessions into one
                                streamlined workspace so you can think clearly, plan better, and
                                execute without friction.
                            </p>

                            <div className="mt-4 d-flex flex-column gap-3">
                                {highlights.map((item, index) => (
                                    <div className="d-flex align-items-start gap-3" key={index}>
                                        <CheckCircle2
                                            size={18}
                                            strokeWidth={2.2}
                                            style={{ color: colors.success, marginTop: "3px" }}
                                        />
                                        <span style={{ color: colors.muted }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Link
                                    to="/register"
                                    className="btn px-4 py-3 rounded-3 d-inline-flex align-items-center gap-2"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: colors.white,
                                        border: `1px solid ${colors.primary}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    Create your workspace
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div
                                className="p-4 p-md-5 rounded-4"
                                style={{
                                    ...cardStyle,
                                    background:
                                        "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div>
                                        <div
                                            className="fw-semibold"
                                            style={{ color: colors.text, fontSize: "1.05rem" }}
                                        >
                                            Productivity Snapshot
                                        </div>
                                        <div style={{ color: colors.muted, fontSize: "0.92rem" }}>
                                            A simple view of your academic flow
                                        </div>
                                    </div>
                                    <div
                                        className="rounded-3 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            backgroundColor: colors.primaryTint,
                                            color: colors.primary,
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <LayoutDashboard size={20} />
                                    </div>
                                </div>

                                <div className="d-flex flex-column gap-3">
                                    <div
                                        className="rounded-4 p-3"
                                        style={{
                                            backgroundColor: "#F8FAFC",
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span style={{ color: colors.muted }}>Notes Ready</span>
                                            <span className="fw-semibold" style={{ color: colors.text }}>
                                                24
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className="rounded-4 p-3"
                                        style={{
                                            backgroundColor: "#F8FAFC",
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span style={{ color: colors.muted }}>Pending Tasks</span>
                                            <span className="fw-semibold" style={{ color: colors.text }}>
                                                7
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className="rounded-4 p-3"
                                        style={{
                                            backgroundColor: "#F8FAFC",
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span style={{ color: colors.muted }}>Focus Sessions</span>
                                            <span className="fw-semibold" style={{ color: colors.text }}>
                                                3 today
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="mt-4 rounded-4 p-4"
                                    style={{
                                        backgroundColor: colors.primary,
                                        color: colors.white,
                                    }}
                                >
                                    <div className="fw-semibold mb-2">Built for real momentum</div>
                                    <p className="mb-0" style={{ opacity: 0.9, lineHeight: 1.7 }}>
                                        Keep your academic work structured, visible, and easier to
                                        act on every day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-5">
                <div className="container">
                    <div
                        className="rounded-4 p-4 p-md-5 text-center"
                        style={{
                            backgroundColor: colors.primary,
                            color: colors.white,
                            boxShadow: "0 18px 40px rgba(15, 39, 68, 0.14)",
                        }}
                    >
                        <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
                            Start building your academic system today
                        </h2>
                        <p
                            className="mx-auto mb-4"
                            style={{
                                maxWidth: "680px",
                                lineHeight: 1.8,
                                opacity: 0.92,
                            }}
                        >
                            Bring your notes, tasks, and focus routines into one place with a
                            workspace designed to help you stay consistent and productive.
                        </p>

                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                            <Link
                                to="/register"
                                className="btn px-4 py-3 rounded-3 fw-semibold"
                                style={{
                                    backgroundColor: colors.white,
                                    color: colors.primary,
                                    border: "none",
                                }}
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="btn px-4 py-3 rounded-3 fw-semibold"
                                style={{
                                    backgroundColor: "transparent",
                                    color: colors.white,
                                    border: "1px solid rgba(255,255,255,0.35)",
                                }}
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}