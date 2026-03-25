import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function ViewNote() {
    const { id } = useParams();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchNote() {
            try {
                setLoading(true);
                setError("");

                const res = await api.get(`/notes/${id}`);
                const noteData = res.data.data || res.data;

                setNote(noteData);
            } catch (err) {
                console.error("Failed to load note:", err);
                setError("Failed to load note. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    if (loading) {
        return <p className="p-4">Loading note...</p>;
    }

    if (error) {
        return <p className="p-4 text-danger">{error}</p>;
    }

    if (!note) {
        return <p className="p-4">Note not found.</p>;
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0">{note.title || "Untitled Note"}</h2>
                        <Link to="/notes" className="btn btn-outline-secondary btn-sm">
                            Back to Notes
                        </Link>
                    </div>

                    <hr />

                    {note.content ? (
                        <p style={{ whiteSpace: "pre-line" }}>{note.content}</p>
                    ) : (
                        <p className="text-muted">This note has no written content.</p>
                    )}

                    {note.file_name && (
                        <div className="mt-4">
                            <h5>Attached File</h5>
                            <p className="mb-1">
                                <strong>File:</strong> {note.file_name}
                            </p>

                            {note.file_path && (
                                <a
                                    href={note.file_path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-sm"
                                >
                                    Open File
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}