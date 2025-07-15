import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("dark");

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.body.classList.remove("dark-theme", "light-theme");
        document.body.classList.add(`${newTheme}-theme`);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.body.classList.add(`${savedTheme}-theme`);
    }, []);

    return (
        <nav className="navbar">
            <a href="/" className="logo">
                <p>About<span>Me.</span></p>
            </a>
            <div className="nav-item-container">
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>
                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><a href="/" className="active">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#service">Service</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
