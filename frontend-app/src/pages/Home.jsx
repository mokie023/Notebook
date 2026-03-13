import { Link } from "react-router-dom";
import { FileText, LayoutList, Zap } from "lucide-react";
import "./Home.css";

export default function Home() {
    return (
        <div className="notion-home-wrapper">
            <main className="notion-home-container">
                <section className="hero">
                    <h1 className="hero-title">
                        Your workspace.<br />
                        Simplified.
                    </h1>

                    <p className="hero-subtitle">
                        Organize your notes, tasks, and ideas in a modern digital workspace.
                        Built for speed, clarity, and intelligent productivity.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/register" className="btn-notion-primary">
                            Get Started
                        </Link>
                        <Link to="/login" className="btn-notion-secondary">
                            Log in
                        </Link>
                    </div>
                </section>

                <section className="features">
                    <div className="feature-card">
                        <FileText size={24} className="feature-icon" />
                        <h3>Rich Notes</h3>
                        <p>Capture your thoughts with a powerful, distraction-free editor.</p>
                    </div>

                    <div className="feature-card">
                        <LayoutList size={24} className="feature-icon" />
                        <h3>Task Management</h3>
                        <p>Keep track of what needs to get done with intuitive task lists.</p>
                    </div>

                    <div className="feature-card">
                        <Zap size={24} className="feature-icon" />
                        <h3>Lightning Fast</h3>
                        <p>Built for speed so you can focus on creating, not waiting.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}