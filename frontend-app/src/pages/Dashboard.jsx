import { Link } from "react-router-dom";
import {
    NotebookTabs,
    LayoutDashboard,
    FileText,
    CheckSquare,
    TimerReset,
    Plus,
    Search,
    Bell,
    Clock3,
    ArrowRight,
} from "lucide-react";

export default function Dashboard() {
    const colors = {
        primary: "#0F2744",
        primarySoft: "#1E3A5F",
        primaryDeep: "#0B1F36",
        primaryTint: "#EAF0F7",
        background: "#F4F7FB",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
        success: "#16A34A",
        warning: "#D97706",
    };

    const stats = [
        { title: "Total Notes", value: "24", icon: <FileText size={18} />, sub: "+4 this week" },
        { title: "Pending Tasks", value: "7", icon: <CheckSquare size={18} />, sub: "2 due today" },
        { title: "Completed Tasks", value: "18", icon: <CheckSquare size={18} />, sub: "Strong progress" },
        { title: "Focus Sessions", value: "3", icon: <TimerReset size={18} />, sub: "Today" },
    ];

    const recentNotes = [
        { id: 1, title: "Database Normalization Notes", date: "Today" },
        { id: 2, title: "Software Project Management Summary", date: "Yesterday" },
        { id: 3, title: "Laravel API Authentication Flow", date: "2 days ago" },
    ];

    const tasks = [
        { title: "Submit assignment draft", due: "Due today", status: "urgent" },
        { title: "Revise PERT and CPM", due: "Tomorrow", status: "normal" },
        { title: "Update NoteBook UI", due: "This week", status: "normal" },
    ];

    const cardStyle = {
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 14px 34px rgba(15, 39, 68, 0.07)",
    };

    return (
        <div
            className="min-vh-100 d-flex"
            style={{
                backgroundColor: colors.background,
                fontFamily:
                    'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            }}
        >
            {/* SIDEBAR */}
            <aside
                className="d-none d-lg-flex flex-column justify-content-between p-4"
                style={{
                    width: "270px",
                    background: "linear-gradient(180deg, #0F2744 0%, #183B63 100%)",
                    color: colors.white,
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div>
                    <div className="d-flex align-items-center gap-2 mb-5">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3"
                            style={{
                                width: "42px",
                                height: "42px",
                                backgroundColor: "rgba(255,255,255,0.10)",
                                border: "1px solid rgba(255,255,255,0.14)",
                            }}
                        >
                            <NotebookTabs size={20} />
                        </div>
                        <span className="fw-semibold fs-5">NoteBook</span>
                    </div>

                    <div className="d-flex flex-column gap-2">
                        <Link
                            to="/dashboard"
                            className="btn text-start d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.12)",
                                color: colors.white,
                                border: "1px solid rgba(255,255,255,0.12)",
                                fontWeight: 600,
                            }}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        <Link
                            to="/notes"
                            className="btn text-start d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none"
                            style={{
                                backgroundColor: "transparent",
                                color: colors.white,
                                border: "1px solid transparent",
                                fontWeight: 500,
                            }}
                        >
                            <FileText size={18} />
                            Notes
                        </Link>

                        <button
                            className="btn text-start d-flex align-items-center gap-3 px-3 py-3 rounded-3"
                            style={{
                                backgroundColor: "transparent",
                                color: colors.white,
                                border: "1px solid transparent",
                                fontWeight: 500,
                            }}
                        >
                            <CheckSquare size={18} />
                            Tasks
                        </button>

                        <button
                            className="btn text-start d-flex align-items-center gap-3 px-3 py-3 rounded-3"
                            style={{
                                backgroundColor: "transparent",
                                color: colors.white,
                                border: "1px solid transparent",
                                fontWeight: 500,
                            }}
                        >
                            <TimerReset size={18} />
                            Pomodoro
                        </button>
                    </div>
                </div>

                <div
                    className="rounded-4 p-4"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                    }}
                >
                    <div className="fw-semibold mb-2">Stay focused</div>
                    <p
                        className="mb-0"
                        style={{
                            color: "rgba(255,255,255,0.78)",
                            fontSize: "0.94rem",
                            lineHeight: 1.7,
                        }}
                    >
                        Keep your notes, priorities, and study rhythm visible every day.
                    </p>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-grow-1">
                {/* HEADER */}
                <div
                    className="px-4 px-lg-5 py-4"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.75)",
                        backdropFilter: "blur(10px)",
                        borderBottom: `1px solid ${colors.border}`,
                    }}
                >
                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                        <div>
                            <h1
                                className="fw-bold mb-1"
                                style={{
                                    color: colors.text,
                                    fontSize: "2rem",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Welcome back
                            </h1>
                            <p className="mb-0" style={{ color: colors.muted }}>
                                Here’s a clear view of your academic momentum today.
                            </p>
                        </div>

                        <div className="d-flex flex-wrap align-items-center gap-2">
                            <div
                                className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                                style={{
                                    backgroundColor: colors.white,
                                    border: `1px solid ${colors.border}`,
                                    minWidth: "220px",
                                }}
                            >
                                <Search size={16} color={colors.muted} />
                                <span style={{ color: colors.muted, fontSize: "0.95rem" }}>
                                    Search notes or tasks
                                </span>
                            </div>

                            <button
                                className="btn rounded-3 p-2"
                                style={{
                                    backgroundColor: colors.white,
                                    border: `1px solid ${colors.border}`,
                                }}
                            >
                                <Bell size={18} color={colors.primary} />
                            </button>

                            <Link
                                to="/notes/create"
                                className="btn px-3 py-2 rounded-3 d-flex align-items-center gap-2 text-decoration-none"
                                style={{
                                    backgroundColor: colors.primary,
                                    color: colors.white,
                                    border: `1px solid ${colors.primary}`,
                                    fontWeight: 600,
                                }}
                            >
                                <Plus size={16} />
                                New Note
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="p-4 p-lg-5">
                    {/* STATS */}
                    <div className="row g-4 mb-4">
                        {stats.map((stat, index) => (
                            <div className="col-md-6 col-xl-3" key={index}>
                                <div className="p-4 rounded-4 h-100" style={cardStyle}>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <div
                                                style={{
                                                    color: colors.muted,
                                                    fontSize: "0.92rem",
                                                    marginBottom: "6px",
                                                }}
                                            >
                                                {stat.title}
                                            </div>
                                            <div
                                                className="fw-bold"
                                                style={{
                                                    fontSize: "2rem",
                                                    color: colors.text,
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {stat.value}
                                            </div>
                                        </div>

                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                                width: "44px",
                                                height: "44px",
                                                backgroundColor: colors.primaryTint,
                                                color: colors.primary,
                                                border: `1px solid ${colors.border}`,
                                            }}
                                        >
                                            {stat.icon}
                                        </div>
                                    </div>

                                    <div style={{ color: colors.muted, fontSize: "0.9rem" }}>
                                        {stat.sub}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MAIN GRID */}
                    <div className="row g-4">
                        {/* LEFT COLUMN */}
                        <div className="col-xl-8">
                            <div className="row g-4">
                                <div className="col-12">
                                    <div className="p-4 rounded-4" style={cardStyle}>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <h3
                                                    className="fw-semibold mb-1"
                                                    style={{ color: colors.text, fontSize: "1.15rem" }}
                                                >
                                                    Recent Notes
                                                </h3>
                                                <p className="mb-0" style={{ color: colors.muted }}>
                                                    Pick up your latest work quickly
                                                </p>
                                            </div>

                                            <Link
                                                to="/notes"
                                                className="btn btn-sm d-flex align-items-center gap-2 text-decoration-none"
                                                style={{ color: colors.primary, fontWeight: 600 }}
                                            >
                                                View all <ArrowRight size={16} />
                                            </Link>
                                        </div>

                                        <div className="d-flex flex-column gap-3">
                                            {recentNotes.map((note) => (
                                                <div
                                                    key={note.id}
                                                    className="d-flex justify-content-between align-items-center rounded-4 p-3"
                                                    style={{
                                                        backgroundColor: "#F8FAFC",
                                                        border: `1px solid ${colors.border}`,
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center rounded-3"
                                                            style={{
                                                                width: "42px",
                                                                height: "42px",
                                                                backgroundColor: colors.primaryTint,
                                                                color: colors.primary,
                                                            }}
                                                        >
                                                            <FileText size={18} />
                                                        </div>
                                                        <div>
                                                            <div
                                                                className="fw-medium"
                                                                style={{ color: colors.text }}
                                                            >
                                                                {note.title}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color: colors.muted,
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                {note.date}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        to={`/notes/${note.id}`}
                                                        className="btn btn-sm text-decoration-none"
                                                        style={{ color: colors.primary }}
                                                    >
                                                        Open
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="p-4 rounded-4" style={cardStyle}>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <h3
                                                    className="fw-semibold mb-1"
                                                    style={{ color: colors.text, fontSize: "1.15rem" }}
                                                >
                                                    Pending Tasks
                                                </h3>
                                                <p className="mb-0" style={{ color: colors.muted }}>
                                                    Stay on top of what needs attention
                                                </p>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column gap-3">
                                            {tasks.map((task, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-4 p-3"
                                                    style={{
                                                        backgroundColor: "#F8FAFC",
                                                        border: `1px solid ${colors.border}`,
                                                    }}
                                                >
                                                    <div className="d-flex justify-content-between align-items-start gap-3">
                                                        <div>
                                                            <div
                                                                className="fw-medium mb-1"
                                                                style={{ color: colors.text }}
                                                            >
                                                                {task.title}
                                                            </div>
                                                            <div
                                                                className="d-flex align-items-center gap-2"
                                                                style={{
                                                                    color: colors.muted,
                                                                    fontSize: "0.9rem",
                                                                }}
                                                            >
                                                                <Clock3 size={14} />
                                                                {task.due}
                                                            </div>
                                                        </div>

                                                        <span
                                                            className="px-3 py-2 rounded-pill"
                                                            style={{
                                                                backgroundColor:
                                                                    task.status === "urgent"
                                                                        ? "#FEF3F2"
                                                                        : "#EFF6FF",
                                                                color:
                                                                    task.status === "urgent"
                                                                        ? "#B42318"
                                                                        : colors.primary,
                                                                fontSize: "0.8rem",
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {task.status === "urgent" ? "Urgent" : "Planned"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="col-xl-4">
                            <div className="d-flex flex-column gap-4">
                                <div className="p-4 rounded-4" style={cardStyle}>
                                    <h3
                                        className="fw-semibold mb-3"
                                        style={{ color: colors.text, fontSize: "1.1rem" }}
                                    >
                                        Productivity Snapshot
                                    </h3>

                                    <div className="d-flex flex-column gap-3">
                                        <div
                                            className="rounded-4 p-3"
                                            style={{
                                                backgroundColor: "#F8FAFC",
                                                border: `1px solid ${colors.border}`,
                                            }}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <span style={{ color: colors.muted }}>Notes this week</span>
                                                <strong style={{ color: colors.text }}>12</strong>
                                            </div>
                                        </div>

                                        <div
                                            className="rounded-4 p-3"
                                            style={{
                                                backgroundColor: "#F8FAFC",
                                                border: `1px solid ${colors.border}`,
                                            }}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <span style={{ color: colors.muted }}>Completed tasks</span>
                                                <strong style={{ color: colors.text }}>8</strong>
                                            </div>
                                        </div>

                                        <div
                                            className="rounded-4 p-3"
                                            style={{
                                                backgroundColor: "#F8FAFC",
                                                border: `1px solid ${colors.border}`,
                                            }}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <span style={{ color: colors.muted }}>Focus time</span>
                                                <strong style={{ color: colors.text }}>95 min</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="p-4 rounded-4"
                                    style={{
                                        background: "linear-gradient(160deg, #102A4A 0%, #183B63 55%, #224C78 100%)",
                                        color: colors.white,
                                        boxShadow: "0 18px 40px rgba(15, 39, 68, 0.16)",
                                    }}
                                >
                                    <h3 className="fw-semibold mb-2" style={{ fontSize: "1.1rem" }}>
                                        Quick Actions
                                    </h3>
                                    <p
                                        className="mb-4"
                                        style={{
                                            color: "rgba(255,255,255,0.82)",
                                            lineHeight: 1.7,
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        Jump into what matters most and keep your workflow moving.
                                    </p>

                                    <div className="d-grid gap-2">
                                        <Link
                                            to="/notes/create"
                                            className="btn btn-light rounded-3 fw-semibold text-decoration-none"
                                        >
                                            Add Note
                                        </Link>
                                        <button
                                            className="btn rounded-3 fw-semibold"
                                            style={{
                                                backgroundColor: "rgba(255,255,255,0.10)",
                                                color: colors.white,
                                                border: "1px solid rgba(255,255,255,0.14)",
                                            }}
                                        >
                                            Add Task
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 rounded-4" style={cardStyle}>
                                    <h3
                                        className="fw-semibold mb-3"
                                        style={{ color: colors.text, fontSize: "1.1rem" }}
                                    >
                                        Today’s Focus
                                    </h3>
                                    <p style={{ color: colors.muted, lineHeight: 1.75 }}>
                                        You have 2 important tasks and 1 note to review today. A
                                        focused 25-minute session would be a strong next move.
                                    </p>

                                    <button
                                        className="btn px-4 py-2 rounded-3 fw-semibold"
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: colors.white,
                                            border: `1px solid ${colors.primary}`,
                                        }}
                                    >
                                        Start Focus Session
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}