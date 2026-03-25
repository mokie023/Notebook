import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

export default function ViewNote() {
    const { id } = useParams();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        async function fetchNote() {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data?.data || res.data || null);
            } catch (err) {
                console.error("Failed to load note:", err);
                setError("Failed to load note.");
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    const handleOpenDocument = async () => {
        if (!note?.id) return;

        try {
            setDownloading(true);

            const response = await api.get(`/notes/${note.id}/document`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], {
                type: note.file_type || "application/octet-stream",
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = note.file_name || "document";
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to open document:", err);
            alert("Failed to open document.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return <p className="p-4">Loading...</p>;
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="alert alert-danger">{error}</div>
                <Link to="/notes" className="btn btn-outline-primary">
                    Back to Notes
                </Link>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="p-4">
                <p>Note not found</p>
                <Link to="/notes" className="btn btn-outline-primary">
                    Back to Notes
                </Link>
            </div>
        );
    }

    const hasContent = !!note.content;
    const hasFile = !!note.file_path;

    let noteType = "Text Note";
    if (hasContent && hasFile) {
        noteType = "Hybrid Note";
    } else if (hasFile) {
        noteType = "Document Note";
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">{note.title}</h2>
                    <p className="text-muted mb-0">{noteType}</p>
                </div>

                <Link to="/notes" className="btn btn-outline-primary">
                    Back to Notes
                </Link>
            </div>

            {hasContent && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Note Content</h5>
                        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.7" }}>
                            {note.content}
                        </div>
                    </div>
                </div>
            )}

            {hasFile && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Attached Document</h5>

                        <p className="mb-2">
                            <strong>File name:</strong> {note.file_name || "Unknown file"}
                        </p>

                        <p className="mb-2">
                            <strong>File type:</strong> {note.file_type || "Unknown"}
                        </p>

                        {note.file_size && (
                            <p className="mb-3">
                                <strong>File size:</strong>{" "}
                                {(note.file_size / 1024).toFixed(1)} KB
                            </p>
                        )}

                        <button
                            onClick={handleOpenDocument}
                            disabled={downloading}
                            className="btn btn-primary"
                        >
                            {downloading ? "Opening..." : "Open Document"}
                        </button>
                    </div>
                </div>
            )}

            {!hasContent && !hasFile && (
                <div className="alert alert-warning">
                    This note has no content or attached file.
                </div>
            )}
        </div>
    );
}