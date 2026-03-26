import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import api from "../api/axios";

export default function ViewNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

    useEffect(() => {
        async function fetchNote() {
            try {
                setLoading(true);
                setError("");
                setSuccess("");

                const res = await api.get(`/notes/${id}`);
                const noteData = res.data?.data || res.data;

                setNote(noteData);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load note. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) return;

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

            await api.delete(`/notes/${id}`);
            setSuccess("Note deleted successfully.");

            setTimeout(() => {
                navigate("/notes");
            }, 800);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete note. Please try again."
            );
        } finally {
            setDeleting(false);
        }
    }

    function formatDate(dateValue) {
        if (!dateValue) return "N/A";

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) return "N/A";

        return date.toLocaleString();
    }

    function resolveFileUrl(filePath) {
        if (!filePath) return null;

        if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
            return filePath;
        }

        const apiBase = import.meta.env.VITE_API_URL || "";
        const cleanApiBase = apiBase.replace(/\/api\/v1\/?$/, "");
        const cleanPath = filePath.startsWith("/") ? filePath : `/${filePath}`;

        return cleanApiBase ? `${cleanApiBase}${cleanPath}` : cleanPath;
    }

    if (loading) {
        return (
            <AppLayout>
                <Topbar title="View Note" subtitle="Loading your note..." />
                <div className="p-4 p-lg-5">
                    <p style={{ color: colors.muted }}>Loading note...</p>
                </div>
            </AppLayout>
        );
    }

    if (error && !note) {
        return (
            <AppLayout>
                <Topbar
                    title="View Note"
                    subtitle="Something went wrong while loading the note."
                />
                <div className="p-4 p-lg-5">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>

                    <Link
                        to="/notes"
                        className="btn rounded-3"
                        style={{
                            backgroundColor: colors.background,
                            color: colors.primary,
                            border: `1px solid ${colors.border}`,
                            fontWeight: 600,
                        }}
                    >
                        Back to Notes
                    </Link>
                </div>
            </AppLayout>
        );
    }

    if (!note) {
        return (
            <AppLayout>
                <Topbar
                    title="View Note"
                    subtitle="The requested note could not be found."
                />
                <div className="p-4 p-lg-5">
                    <div className="rounded-4 p-4" style={cardStyle}>
                        <h5 style={{ color: colors.text }}>Note not found</h5>
                        <p className="mb-3" style={{ color: colors.muted }}>
                            This note may have been deleted or is no longer available.
                        </p>

                        <Link
                            to="/notes"
                            className="btn rounded-3"
                            style={{
                                backgroundColor: colors.primary,
                                color: colors.white,
                                border: `1px solid ${colors.primary}`,
                                fontWeight: 600,
                            }}
                        >
                            Back to Notes
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const fileUrl = resolveFileUrl(note.file_path);

    return (
        <AppLayout>
            <Topbar
                title={note.title || "Untitled Note"}
                subtitle="Review your note details, written content, and attached file."
                rightContent={
                    <div className="d-flex flex-wrap gap-2">
                        <Link
                            to="/notes"
                            className="btn rounded-3 text-decoration-none"
                            style={{
                                backgroundColor: colors.background,
                                color: colors.primary,
                                border: `1px solid ${colors.border}`,
                                fontWeight: 600,
                            }}
                        >
                            Back
                        </Link>

                        <Link
                            to={`/notes/${note.id}/edit`}
                            className="btn rounded-3 text-decoration-none"
                            style={{
                                backgroundColor: colors.white,
                                color: colors.primary,
                                border: `1px solid ${colors.border}`,
                                fontWeight: 600,
                            }}
                        >
                            Edit
                        </Link>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="btn rounded-3"
                            style={{
                                backgroundColor: colors.dangerBg,
                                color: colors.danger,
                                border: `1px solid ${colors.border}`,
                                fontWeight: 600,
                            }}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                }
            />

            <div className="p-4 p-lg-5">
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

                {error && (
                    <div className="alert alert-danger mb-4" role="alert">
                        {error}
                    </div>
                )}

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="rounded-4 p-4 p-lg-5" style={cardStyle}>
                            <div className="d-flex align-items-start gap-3 mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: colors.primaryTint,
                                        color: colors.primary,
                                        flexShrink: 0,
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    📝
                                </div>

                                <div>
                                    <h2
                                        className="mb-2 fw-semibold"
                                        style={{ color: colors.text }}
                                    >
                                        {note.title || "Untitled Note"}
                                    </h2>

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

                            <hr style={{ borderColor: colors.border }} />

                            <div className="mt-4">
                                <h5 className="mb-3" style={{ color: colors.text }}>
                                    Content
                                </h5>

                                {note.content ? (
                                    <div
                                        style={{
                                            color: colors.text,
                                            lineHeight: 1.9,
                                            whiteSpace: "pre-line",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {note.content}
                                    </div>
                                ) : (
                                    <p className="mb-0" style={{ color: colors.muted }}>
                                        This note has no written content.
                                    </p>
                                )}
                            </div>

                            {note.file_name && (
                                <div className="mt-5">
                                    <h5 className="mb-3" style={{ color: colors.text }}>
                                        Attached File
                                    </h5>

                                    <div
                                        className="rounded-4 p-4"
                                        style={{
                                            backgroundColor: colors.background,
                                            border: `1px solid ${colors.border}`,
                                        }}
                                    >
                                        <p className="mb-2" style={{ color: colors.text }}>
                                            <strong>File:</strong> {note.file_name}
                                        </p>

                                        {note.file_type && (
                                            <p className="mb-2" style={{ color: colors.muted }}>
                                                <strong>Type:</strong> {note.file_type}
                                            </p>
                                        )}

                                        {note.file_size && (
                                            <p className="mb-3" style={{ color: colors.muted }}>
                                                <strong>Size:</strong> {note.file_size} bytes
                                            </p>
                                        )}

                                        {fileUrl && (
                                            <a
                                                href={fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn rounded-3"
                                                style={{
                                                    backgroundColor: colors.primary,
                                                    color: colors.white,
                                                    border: `1px solid ${colors.primary}`,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Open File
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="rounded-4 p-4" style={cardStyle}>
                            <h5 className="mb-4" style={{ color: colors.text }}>
                                Note Details
                            </h5>

                            <div className="mb-3">
                                <div
                                    className="small text-uppercase fw-semibold mb-1"
                                    style={{ color: colors.muted }}
                                >
                                    Created
                                </div>
                                <div style={{ color: colors.text }}>
                                    {formatDate(note.created_at)}
                                </div>
                            </div>

                            <div className="mb-3">
                                <div
                                    className="small text-uppercase fw-semibold mb-1"
                                    style={{ color: colors.muted }}
                                >
                                    Last Updated
                                </div>
                                <div style={{ color: colors.text }}>
                                    {formatDate(note.updated_at)}
                                </div>
                            </div>

                            <div className="mb-3">
                                <div
                                    className="small text-uppercase fw-semibold mb-1"
                                    style={{ color: colors.muted }}
                                >
                                    Category
                                </div>
                                <div style={{ color: colors.text }}>
                                    {note.category?.name || "Uncategorized"}
                                </div>
                            </div>

                            <div>
                                <div
                                    className="small text-uppercase fw-semibold mb-1"
                                    style={{ color: colors.muted }}
                                >
                                    Has File
                                </div>
                                <div style={{ color: colors.text }}>
                                    {note.file_name ? "Yes" : "No"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}