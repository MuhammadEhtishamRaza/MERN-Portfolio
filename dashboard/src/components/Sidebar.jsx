import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const icons = {
    about: <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
    contact: <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5" /><polyline points="16 17 21 17 21 12" /></svg>,
    experience: <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4" /></svg>,
    hero: <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg>,
    portfolio: <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>,
    service: <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
};

const Sidebar = () => {
    const [open, setOpen] = useState(window.innerWidth > 900);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900) setOpen(true);
            else setOpen(false);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = window.innerWidth <= 900;
    const handleNavClick = () => { if (isMobile) setOpen(false); };

    return (
        <>
            {isMobile && !open && (
                <button
                    className="sidebar-toggle sidebar-toggle-bottom"
                    onClick={() => setOpen(true)}
                    aria-label="Open sidebar"
                >
                    <span className="sidebar-hamburger">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a4e69" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                    </span>
                </button>
            )}
            <aside className={`sidebar${open ? " open" : ""}`}>
                <h2 className="sidebar-title">Admin Dashboard</h2>
                <nav className="sidebar-nav">
                    <NavLink to="/about" className="sidebar-link" onClick={handleNavClick}><span className="sidebar-icon">{icons.about}</span>About</NavLink>
                    <NavLink to="/contact" className="sidebar-link" onClick={handleNavClick}><span className="sidebar-icon">{icons.contact}</span>Contact</NavLink>
                    <NavLink to="/experience" className="sidebar-link" onClick={handleNavClick}><span className="sidebar-icon">{icons.experience}</span>Experience</NavLink>
                    <NavLink to="/hero" className="sidebar-link" onClick={handleNavClick}><span className="sidebar-icon">{icons.hero}</span>Hero</NavLink>
                    <NavLink to="/portfolio" className="sidebar-link" onClick={handleNavClick}><span className="sidebar-icon">{icons.portfolio}</span>Portfolio</NavLink>
                    <NavLink to="/service" className="sidebar-link" onClick={handleNavClick}><span className="sidebar-icon">{icons.service}</span>Service</NavLink>
                </nav>
                {isMobile && open && (
                    <button
                        className="sidebar-toggle close"
                        onClick={() => setOpen(false)}
                        aria-label="Close sidebar"
                        style={{ position: "absolute", top: 18, right: 18, display: "flex" }}
                    >
                        <span className="sidebar-hamburger">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a4e69" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
                        </span>
                    </button>
                )}
            </aside>
            {open && isMobile && (
                <div className="sidebar-backdrop" onClick={() => setOpen(false)}></div>
            )}
        </>
    );
};

export default Sidebar; 