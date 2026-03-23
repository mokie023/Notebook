import { Bell, Search } from "lucide-react";

export default function Topbar({
    title = "Welcome back",
    subtitle = "Here’s a clear view of your academic momentum today.",
    rightContent = null,
}) {
    const colors = {
        primary: "#0F2744",
        white: "#FFFFFF",
        muted: "#475569",
        border: "#D9E2EC",
        text: "#0F172A",
    };

    return (
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
                        {title}
                    </h1>
                    <p className="mb-0" style={{ color: colors.muted }}>
                        {subtitle}
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

                    {rightContent}
                </div>
            </div>
        </div>
    );
}