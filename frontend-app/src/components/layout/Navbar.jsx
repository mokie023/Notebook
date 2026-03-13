import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <Link to="/">NoteBook</Link>
            </div>

            <nav className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}