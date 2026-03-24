import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
    const colors = {
        background: "#F4F7FB",
    };

    return (
        <div
            className="min-vh-100 d-flex"
            style={{
                backgroundColor: colors.background,
                fontFamily:
                    'Inter, "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
            }}
        >
            <Sidebar />

            <main className="flex-grow-1">
                {children}
            </main>
        </div>
    );
}
