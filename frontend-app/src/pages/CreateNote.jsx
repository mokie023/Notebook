import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import api from "../api/axios";

export default function CreateNote() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [noteCategoryId, setNoteCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [isPinned, setIsPinned] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [submitting, setSubmitting] = useState(false);
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
            success: "#027A48",
            successBg: "#ECFDF3",
            danger: "#B42318",
            dangerBg: "#FEF3F2",
        }),
        []
    );

    const cardStyle = {
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 14px 34px rgba(15, 39, 68, 0.07)",
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                setLoadingCategories(true);

                const res = await api.get("/note-categories");
                const categoryData = Array.isArray(res.data?.data)
                    ? res.data.data
                    : Array.isArray(res.data)
                        ? res.data
                        : [];

                setCategories(categoryData);
            } catch (err) {
                console.error("Failed to load categories:", err);
            } finally {
                setLoadingCategories(false);
            }
        }

        fetchCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                title: title.trim(),
                content: content.trim(),
                note_category_id: noteCategoryId || null,
                is_pinned: isPinned,
            };

            const res = await api.post("/notes", payload);
            const createdNote = res.data?.data || res.data;

            setSuccess("Note created successfully.");

            setTimeout(() => {
                navigate(createdNote?.id ? `/notes/${createdNote.id}` : "/notes");
            }, 800);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create note. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AppLayout>
            <Topbar
                title="Create Note"
                subtitle="Write and save a new note for your academic workflow."
                rightContent={
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
                        Back to Notes
                    </Link>
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
                    <div
                        className="alert mb-4"
                        role="alert"
                        style={{
                            backgroundColor: colors.dangerBg,
                            color: colors.danger,
                            border: `1px solid ${colors.border}`,
                        }}
                    >
                        {error}
                    </div>
                )}

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="rounded-4 p-4 p-lg-5" style={cardStyle}>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="form-label fw-semibold"
                                        style={{ color: colors.text }}
                                    >
                                        Note Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="Enter your note title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{
                                            border: `1px solid ${colors.border}`,
                                            boxShadow: "none",
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="category"
                                        className="form-label fw-semibold"
                                        style={{ color: colors.text }}
                                    >
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="form-select form-select-lg rounded-3"
                                        value={noteCategoryId}
                                        onChange={(e) => setNoteCategoryId(e.target.value)}
                                        disabled={loadingCategories}
                                        style={{
                                            border: `1px solid ${colors.border}`,
                                            boxShadow: "none",
                                        }}
                                    >
                                        <option value="">No category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="content"
                                        className="form-label fw-semibold"
                                        style={{ color: colors.text }}
                                    >
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        className="form-control rounded-3"
                                        rows="10"
                                        placeholder="Write your note content here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        style={{
                                            border: `1px solid ${colors.border}`,
                                            boxShadow: "none",
                                            resize: "vertical",
                                        }}
                                    />
                                </div>

                                <div className="form-check mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="isPinned"
                                        checked={isPinned}
                                        onChange={(e) => setIsPinned(e.target.checked)}
                                    />
                                    <label
                                        className="form-check-label fw-medium"
                                        htmlFor="isPinned"
                                        style={{ color: colors.text }}
                                    >
                                        Pin this note
                                    </label>
                                </div>

                                <div className="d-flex gap-2 flex-wrap">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn rounded-3 px-4"
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: colors.white,
                                            border: `1px solid ${colors.primary}`,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {submitting ? "Creating..." : "Create Note"}
                                    </button>

                                    <Link
                                        to="/notes"
                                        className="btn rounded-3 px-4 text-decoration-none"
                                        style={{
                                            backgroundColor: colors.white,
                                            color: colors.primary,
                                            border: `1px solid ${colors.border}`,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="rounded-4 p-4" style={cardStyle}>
                            <h5 className="mb-3" style={{ color: colors.text }}>
                                Tips
                            </h5>
                            <ul
                                className="mb-0 ps-3"
                                style={{ color: colors.muted, lineHeight: 1.8 }}
                            >
                                <li>Give your note a clear, searchable title.</li>
                                <li>Use categories to stay organized.</li>
                                <li>Pin important notes for quick access later.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}