import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section id="hero" className="hero section">
            <div className="hero-bg">
                <img src="/assets/img/hero-bg-light.webp" alt="Hero background" />
            </div>

            <div className="container text-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1>
                        Welcome to <span>Notebook</span>
                    </h1>

                    <p>
                        Manage notes, tasks, journals, and Pomodoro focus sessions in one
                        modern workspace.
                    </p>

                    <div className="d-flex">
                        <Link to="/register" className="btn-get-started">
                            Get Started
                        </Link>
                        <Link to="/login" className="btn-watch-video d-flex align-items-center">
                            <span>Log In</span>
                        </Link>
                    </div>

                    <img
                        src="/assets/img/hero-services-img.webp"
                        className="img-fluid hero-img"
                        alt="Notebook preview"
                    />
                </div>
            </div>
        </section>
    );
}