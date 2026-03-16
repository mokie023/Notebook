import { Link } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
    return (
        <section id="hero" className="hero section">
            <div className="hero-bg">
                <img src="/template/assets/img/hero-bg-light.webp" alt="Hero background" />
            </div>

            <div className="container text-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1>
                        Organize your work with <span>Notebook</span>
                    </h1>

                    <p>
                        Manage notes, tasks, journals, tags, and Pomodoro focus sessions
                        in one modern productivity workspace.
                    </p>

                    <div className="d-flex hero-actions">
                        <Link to="/register" className="btn-get-started">
                            Get Started
                        </Link>

                        <Link to="/login" className="btn-watch-video d-flex align-items-center">
                            <span>Log In</span>
                        </Link>
                    </div>

                    <img
                        src="/template/assets/img/hero-services-img.webp"
                        className="img-fluid hero-img"
                        alt="Notebook productivity preview"
                    />
                </div>
            </div>
        </section>
    );
}