import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (token) {
            localStorage.setItem("auth_token", token);
            navigate("/dashboard");
        } else if (error) {
            navigate("/login");
        } else {
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <h2>Authenticating...</h2>
        </div>
    );
}