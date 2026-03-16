export default function Footer() {
    return (
        <footer id="footer" className="footer position-relative light-background">
            <div className="container footer-top">
                <div className="row gy-4">
                    <div className="col-lg-4 col-md-6 footer-about">
                        <a href="/" className="logo d-flex align-items-center">
                            <span className="sitename">Notebook</span>
                        </a>
                        <p className="mt-3">
                            A modern productivity workspace for notes, tasks, journals, tags,
                            and focus sessions.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-3 footer-links">
                        <h4>Pages</h4>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#features">Features</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-12 footer-newsletter">
                        <h4>Get Started</h4>
                        <p>Create your account and organize your workflow with Notebook.</p>
                    </div>
                </div>
            </div>

            <div className="container copyright text-center mt-4">
                <p>
                    © <strong className="px-1 sitename">Notebook</strong> All Rights Reserved
                </p>
            </div>
        </footer>
    );
}