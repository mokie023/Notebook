import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import api from "../api/axios";

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const navigate = useNavigate();

    const colors = {
        primary: "#0F2744",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setFieldErrors({});

        if (!title.trim()) {
            setError("Title is required.");
            setLoading(false);
            return;
        }

        if (!content.trim() && !file) {
            setError("Add note content or upload a file.");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title.trim());

            if (content.trim()) {
                formData.append("content", content.trim());
            }

            if (file) {
                formData.append("file", file);
            }

            const response = await api.post("/notes", formData);

            console.log("Create note success:", response.data);
            navigate("/notes");
        } catch (err) {
            console.error("Create note error:", err);
            console.error("Response status:", err.response?.status);
            console.error("Response data:", err.response?.data);

            const response = err.response;

            if (response?.status === 422) {
                const backendErrors = response.data?.errors || {};
                setFieldErrors(backendErrors);
                setError(response.data?.message || "Validation failed.");
            } else if (response?.status === 401) {
                setError("You are not authenticated. Please log in again.");
            } else if (response?.status === 403) {
                setError("You are not allowed to perform this action.");
            } else if (response?.status === 500) {
                setError("Server error. Check Laravel logs.");
            } else {
                setError(response?.data?.message || err.message || "Failed to create note.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <Topbar
                title="Create Note"
                subtitle="Write a note, upload a document, or do both."
                rightContent={
                    <Link
                        to="/notes"
                        className="btn px-3 py-2 rounded-3 text-decoration-none"
                        style={{
                            backgroundColor: colors.white,
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
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="rounded-4 p-4 p-lg-5" style={cardStyle}>
                            <div className="mb-4">
                                <h3 className="fw-semibold mb-2" style={{ color: colors.text }}>
                                    New Academic Resource
                                </h3>
                                <p className="mb-0" style={{ color: colors.muted }}>
                                    Create a written note, upload a PDF/DOCX file, or combine both.
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label fw-medium" style={{ color: colors.text }}>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${fieldErrors.title ? "is-invalid" : ""}`}
                                        placeholder="Enter note title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    {fieldErrors.title && (
                                        <div className="invalid-feedback">
                                            {fieldErrors.title[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-medium" style={{ color: colors.text }}>
                                        Note Content
                                    </label>
                                    <textarea
                                        className={`form-control ${fieldErrors.content ? "is-invalid" : ""}`}
                                        rows="8"
                                        placeholder="Write your summary, explanation, or note here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    {fieldErrors.content && (
                                        <div className="invalid-feedback">
                                            {fieldErrors.content[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-medium" style={{ color: colors.text }}>
                                        Upload Document
                                    </label>
                                    <input
                                        type="file"
                                        className={`form-control ${fieldErrors.file ? "is-invalid" : ""}`}
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {fieldErrors.file && (
                                        <div className="invalid-feedback">
                                            {fieldErrors.file[0]}
                                        </div>
                                    )}
                                    <small style={{ color: colors.muted }}>
                                        Supported: PDF, DOC, DOCX
                                    </small>
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn px-4 py-2 rounded-3"
                                        disabled={loading}
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: colors.white,
                                            border: `1px solid ${colors.primary}`,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {loading ? "Saving..." : "Save Note"}
                                    </button>

                                    <Link
                                        to="/notes"
                                        className="btn px-4 py-2 rounded-3 text-decoration-none"
                                        style={{
                                            backgroundColor: colors.background,
                                            color: colors.text,
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
                </div>
            </div>
        </AppLayout>
    );
}