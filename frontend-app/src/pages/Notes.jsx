import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

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

    if (loading) return <p className="p-4">Loading notes...</p>;
    if (error) return <p className="p-4 text-danger">{error}</p>;

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between mb-4">
                <h2>Your Notes</h2>
                <Link to="/notes/create" className="btn btn-primary">
                    + New Note
                </Link>
            </div>

            {notes.length === 0 ? (
                <p>No notes yet.</p>
            ) : (
                <div className="row">
                    {notes.map((note) => (
                        <div className="col-md-4 mb-3" key={note.id}>
                            <div className="card p-3">
                                <h5>{note.title}</h5>
                                <p className="text-muted">
                                    {note.content?.slice(0, 80)}...
                                </p>

                                <Link
                                    to={`/notes/${note.id}`}
                                    className="btn btn-sm btn-outline-primary"
                                >
                                    Open
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}