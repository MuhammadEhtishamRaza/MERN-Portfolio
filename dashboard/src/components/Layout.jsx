import React from "react";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = ({ children, onLogout }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1rem' }}>
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'linear-gradient(90deg, #a18cd1 0%, #4a4e69 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 6,
                                padding: '8px 22px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(74,78,105,0.10)',
                                transition: 'background 0.2s',
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
                <div className="main-card">{children}</div>
            </main>
        </div>
    );
};

export default Layout; 