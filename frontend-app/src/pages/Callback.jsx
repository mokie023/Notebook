import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotebookTabs, LoaderCircle } from "lucide-react";

export default function Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (token) {
            localStorage.setItem("auth_token", token);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1200);
        } else if (error) {
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } else {
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        }
    }, [searchParams, navigate]);

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(180deg, #0F2744 0%, #183B63 55%, #244A73 100%)",
                fontFamily:
                    'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            }}
        >
            <div
                className="text-center p-4 p-md-5 rounded-4"
                style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(10px)",
                    color: "#FFFFFF",
                    minWidth: "320px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                }}
            >
                <div
                    className="d-inline-flex align-items-center justify-content-center rounded-4 mb-4"
                    style={{
                        width: "68px",
                        height: "68px",
                        backgroundColor: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.14)",
                    }}
                >
                    <NotebookTabs size={32} />
                </div>

                <h2
                    className="fw-bold mb-2"
                    style={{
                        fontSize: "1.8rem",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Signing you in
                </h2>

                <p
                    className="mb-4"
                    style={{
                        color: "rgba(255,255,255,0.80)",
                        lineHeight: 1.7,
                    }}
                >
                    Preparing your workspace and redirecting you to your dashboard.
                </p>

                <div className="d-flex justify-content-center">
                    <LoaderCircle size={28} className="spin-icon" />
                </div>
            </div>

            <style>
                {`
                    .spin-icon {
                        animation: spin 1s linear infinite;
                        color: white;
                    }

                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}