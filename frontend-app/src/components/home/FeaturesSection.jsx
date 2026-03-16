export default function FeaturesSection() {
    return (
        <section id="features" className="features section">
            <div className="container section-title">
                <h2>Features</h2>
                <p>Everything you need to stay organized and productive.</p>
            </div>

            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="service-item item-cyan position-relative">
                            <i className="bi bi-journal-text icon" />
                            <div>
                                <h3>Smart Notes</h3>
                                <p>Create and manage notes in a clean and focused environment.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="service-item item-orange position-relative">
                            <i className="bi bi-check2-square icon" />
                            <div>
                                <h3>Task Management</h3>
                                <p>Track priorities, deadlines, and progress with clarity.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="service-item item-teal position-relative">
                            <i className="bi bi-alarm icon" />
                            <div>
                                <h3>Pomodoro Focus</h3>
                                <p>Use focus sessions to stay consistent and avoid burnout.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}