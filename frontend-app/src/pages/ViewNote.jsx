import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ViewNote() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data.data || res.data);
            } catch {
                console.error("Failed to load note");
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!note) return <p className="p-4">Note not found</p>;

    return (
        <div className="p-4">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
        </div>
    );
}