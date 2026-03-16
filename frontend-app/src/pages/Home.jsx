import { Link } from "react-router-dom";
import { FileText, LayoutList, Zap, BookOpen, TimerReset } from "lucide-react";
import "./Home.css";

export default function Home() {
    return (
        <div className="notebook-home-wrapper">
            <main className="notebook-home-container">
                <section className="hero">
                    <div className="hero-content">
                        <span className="hero-badge">Notebook Productivity Platform</span>

                        <h1 className="hero-title">
                            Organize your work.<br />
                            Focus on what matters.
                        </h1>

                        <p className="hero-subtitle">
                            Notebook helps you manage notes, tasks, journals, tags, and
                            Pomodoro focus sessions in one clean and modern workspace.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/register" className="btn-primary">
                                Start Free
                            </Link>
                            <Link to="/login" className="btn-secondary">
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="hero-preview">
                        <div className="preview-card">
                            <h3>Today’s Focus</h3>
                            <p>3 tasks due • 2 notes updated • 1 focus session completed</p>
                            <div className="preview-stats">
                                <span>Notes: 12</span>
                                <span>Tasks: 5</span>
                                <span>Focus: 2h</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <div className="feature-card">
                        <FileText size={24} className="feature-icon" />
                        <h3>Smart Notes</h3>
                        <p>Capture, organize, and revisit ideas in a clean writing space.</p>
                    </div>

                    <div className="feature-card">
                        <LayoutList size={24} className="feature-icon" />
                        <h3>Task Clarity</h3>
                        <p>Plan your work with structured tasks, priorities, and progress.</p>
                    </div>

                    <div className="feature-card">
                        <BookOpen size={24} className="feature-icon" />
                        <h3>Daily Journals</h3>
                        <p>Reflect, document progress, and keep your learning journey in one place.</p>
                    </div>

                    <div className="feature-card">
                        <TimerReset size={24} className="feature-icon" />
                        <h3>Focus Sessions</h3>
                        <p>Use Pomodoro-based sessions to stay productive without burnout.</p>
                    </div>
                </section>

                <section className="cta-section">
                    <h2>Build a better workflow with Notebook</h2>
                    <p>
                        Bring your notes, tasks, and focus tools together in one
                        distraction-free productivity system.
                    </p>
                    <Link to="/register" className="btn-primary">
                        Create Your Account
                    </Link>
                </section>
            </main>
        </div>
    );
}