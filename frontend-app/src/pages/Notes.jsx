import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import api from "../api/axios";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await api.get("/notes");
                setNotes(res.data.data || res.data);
            } catch (err) {
                setError("Failed to load notes.");
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

    const colors = {
        primary: "#0F2744",
        primaryTint: "#EAF0F7",
        background: "#F8FAFC",
        white: "#FFFFFF",
        text: "#0F172A",
        muted: "#475569",
        border: "#D9E2EC",
    };

    const cardStyle = {
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 14px 34px rgba(15, 39, 68, 0.07)",
    };

    return (
        <AppLayout>
            <Topbar
                title="Your Notes"
                subtitle="Manage, review, and organize your academic notes."
                rightContent={
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
                        + New Note
                    </Link>
                }
            />

            <div className="p-4 p-lg-5">
                {loading && <p>Loading notes...</p>}

                {!loading && error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && notes.length === 0 && (
                    <div
                        className="rounded-4 p-4"
                        style={cardStyle}
                    >
                        <h5 style={{ color: colors.text }}>No notes yet</h5>
                        <p className="mb-0" style={{ color: colors.muted }}>
                            Start by creating your first note to organize your ideas.
                        </p>
                    </div>
                )}

                {!loading && !error && notes.length > 0 && (
                    <div className="row g-4">
                        {notes.map((note) => (
                            <div className="col-md-6 col-xl-4" key={note.id}>
                                <div className="rounded-4 p-4 h-100" style={cardStyle}>
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                backgroundColor: colors.primaryTint,
                                                color: colors.primary,
                                            }}
                                        >
                                            📝
                                        </div>

                                        <div>
                                            <h5
                                                className="mb-0 fw-semibold"
                                                style={{ color: colors.text }}
                                            >
                                                {note.title}
                                            </h5>
                                        </div>
                                    </div>

                                    <p
                                        style={{
                                            color: colors.muted,
                                            minHeight: "72px",
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {note.content
                                            ? `${note.content.slice(0, 100)}...`
                                            : "No content available."}
                                    </p>

                                    <Link
                                        to={`/notes/${note.id}`}
                                        className="btn btn-sm text-decoration-none"
                                        style={{
                                            color: colors.primary,
                                            border: `1px solid ${colors.border}`,
                                            backgroundColor: colors.background,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Open Note
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}