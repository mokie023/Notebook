import { Link, useLocation } from "react-router-dom";
import {
    NotebookTabs,
    LayoutDashboard,
    FileText,
    CheckSquare,
    TimerReset,
    BookOpen,
} from "lucide-react";

export default function Sidebar() {
    const location = useLocation();

    const colors = {
        white: "#FFFFFF",
    };

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Notes", path: "/notes", icon: <FileText size={18} /> },
        { name: "Tasks", path: "/tasks", icon: <CheckSquare size={18} /> },
        { name: "Journals", path: "/journals", icon: <BookOpen size={18} /> },
        { name: "Pomodoro", path: "/pomodoro", icon: <TimerReset size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside
            className="d-none d-lg-flex flex-column justify-content-between p-4"
            style={{
                width: "270px",
                minHeight: "100vh",
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
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="btn text-start d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-decoration-none"
                            style={{
                                backgroundColor: isActive(item.path)
                                    ? "rgba(255,255,255,0.12)"
                                    : "transparent",
                                color: colors.white,
                                border: isActive(item.path)
                                    ? "1px solid rgba(255,255,255,0.12)"
                                    : "1px solid transparent",
                                fontWeight: isActive(item.path) ? 600 : 500,
                            }}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
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
    );
}
