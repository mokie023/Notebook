import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import api from "../api/axios";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const colors = useMemo(
        () => ({
            primary: "#0F2744",
            primaryTint: "#EAF0F7",
            background: "#F8FAFC",
            white: "#FFFFFF",
            text: "#0F172A",
            muted: "#475569",
            border: "#D9E2EC",
            danger: "#B42318",
            dangerBg: "#FEF3F2",
            success: "#027A48",
            successBg: "#ECFDF3",
        }),
        []
    );

    const cardStyle = {
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 14px 34px rgba(15, 39, 68, 0.07)",
    };

    async function fetchNotes(showRefreshState = false) {
        try {
            if (showRefreshState) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const res = await api.get("/notes");
            const data = Array.isArray(res.data?.data)
                ? res.data.data
                : Array.isArray(res.data)
                    ? res.data
                    : [];

            setNotes(data);
            setFilteredNotes(data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to load notes. Please try again."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            setFilteredNotes(notes);
            return;
        }

        const results = notes.filter((note) => {
            const title = note.title?.toLowerCase() || "";
            const content = note.content?.toLowerCase() || "";
            const category = note.category?.name?.toLowerCase() || "";

            return (
                title.includes(term) ||
                content.includes(term) ||
                category.includes(term)
            );
        });

        setFilteredNotes(results);
    }, [search, notes]);

    async function handleDelete(noteId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(noteId);
            setError("");
            setSuccess("");

            await api.delete(`/notes/${noteId}`);

            const updatedNotes = notes.filter((note) => note.id !== noteId);
            setNotes(updatedNotes);
            setSuccess("Note deleted successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to delete note. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    }

    function getPreview(content) {
        if (!content) return "No content available.";

        const cleaned = content.replace(/\s+/g, " ").trim();

        if (cleaned.length <= 120) return cleaned;

        return `${cleaned.slice(0, 120)}...`;
    }

    return (
        <AppLayout>
            <Topbar
                title="Your Notes"
                subtitle="Manage, review, search, and organize your academic notes."
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
                <div className="row g-3 mb-4">
                    <div className="col-lg-8">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search notes by title, content, or category..."
                            className="form-control form-control-lg rounded-3"
                            style={{
                                border: `1px solid ${colors.border}`,
                                backgroundColor: colors.white,
                                color: colors.text,
                                boxShadow: "none",
                            }}
                        />
                    </div>

                    <div className="col-lg-4 d-flex gap-2">
                        <button
                            type="button"
                            onClick={() => fetchNotes(true)}
                            className="btn w-100 rounded-3"
                            disabled={refreshing}
                            style={{
                                backgroundColor: colors.background,
                                color: colors.primary,
                                border: `1px solid ${colors.border}`,
                                fontWeight: 600,
                            }}
                        >
                            {refreshing ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>

                {success && (
                    <div
                        className="alert mb-4"
                        role="alert"
                        style={{
                            backgroundColor: colors.successBg,
                            color: colors.success,
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        {success}
                    </div>
                )}

                {loading && <p style={{ color: colors.muted }}>Loading notes...</p>}

                {!loading && error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && notes.length === 0 && (
                    <div className="rounded-4 p-4" style={cardStyle}>
                        <h5 style={{ color: colors.text }}>No notes yet</h5>
                        <p className="mb-3" style={{ color: colors.muted }}>
                            Start by creating your first note to organize your ideas.
                        </p>

                        <Link
                            to="/notes/create"
                            className="btn rounded-3"
                            style={{
                                backgroundColor: colors.primary,
                                color: colors.white,
                                border: `1px solid ${colors.primary}`,
                                fontWeight: 600,
                            }}
                        >
                            Create Your First Note
                        </Link>
                    </div>
                )}

                {!loading && !error && notes.length > 0 && filteredNotes.length === 0 && (
                    <div className="rounded-4 p-4" style={cardStyle}>
                        <h5 style={{ color: colors.text }}>No matching notes</h5>
                        <p className="mb-0" style={{ color: colors.muted }}>
                            Try a different search term.
                        </p>
                    </div>
                )}

                {!loading && !error && filteredNotes.length > 0 && (
                    <div className="row g-4">
                        {filteredNotes.map((note) => (
                            <div className="col-md-6 col-xl-4" key={note.id}>
                                <div className="rounded-4 p-4 h-100 d-flex flex-column" style={cardStyle}>
                                    <div className="d-flex align-items-start gap-3 mb-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                backgroundColor: colors.primaryTint,
                                                color: colors.primary,
                                                flexShrink: 0,
                                            }}
                                        >
                                            📝
                                        </div>

                                        <div className="flex-grow-1">
                                            <h5
                                                className="mb-1 fw-semibold"
                                                style={{ color: colors.text }}
                                            >
                                                {note.title || "Untitled Note"}
                                            </h5>

                                            {note.category?.name && (
                                                <span
                                                    className="badge rounded-pill"
                                                    style={{
                                                        backgroundColor:
                                                            note.category?.color || colors.primaryTint,
                                                        color: colors.primary,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {note.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p
                                        className="mb-4"
                                        style={{
                                            color: colors.muted,
                                            minHeight: "78px",
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {getPreview(note.content)}
                                    </p>

                                    <div
                                        className="mt-auto d-flex flex-wrap gap-2"
                                    >
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
                                            Open
                                        </Link>

                                        <Link
                                            to={`/notes/${note.id}/edit`}
                                            className="btn btn-sm text-decoration-none"
                                            style={{
                                                color: colors.primary,
                                                border: `1px solid ${colors.border}`,
                                                backgroundColor: colors.white,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(note.id)}
                                            disabled={deletingId === note.id}
                                            className="btn btn-sm"
                                            style={{
                                                color: colors.danger,
                                                border: `1px solid ${colors.border}`,
                                                backgroundColor: colors.dangerBg,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {deletingId === note.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}