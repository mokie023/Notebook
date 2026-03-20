import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/notes", { title, content });
            navigate("/notes");
        } catch (err) {
            setError("Failed to create note.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2>Create Note</h2>

            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write your note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save Note"}
                </button>
            </form>
        </div>
    );
}