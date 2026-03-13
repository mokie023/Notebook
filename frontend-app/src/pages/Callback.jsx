import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Grab the token or error from the URL
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (token) {
            // Save token and go to home/dashboard
            localStorage.setItem("auth_token", token);
            navigate("/");
        } else if (error) {
            // If something went wrong, send them back to login
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>Authenticating...</h2>
        </div>
    );
}