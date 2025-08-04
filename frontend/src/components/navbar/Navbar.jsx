import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [activeSection, setActiveSection] = useState("home");

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.body.classList.remove("dark-theme", "light-theme");
        document.body.classList.add(`${newTheme}-theme`);
        localStorage.setItem("theme", newTheme);
    };

    // Smooth scroll function
    const smoothScrollTo = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsOpen(false); // Close mobile menu after navigation
    };

    // Handle navigation click
    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        setActiveSection(sectionId);
        smoothScrollTo(sectionId);
    };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'service', 'portfolio', 'experience', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        document.body.classList.add(`${savedTheme}-theme`);
    }, []);

    return (
        <nav className="navbar">
            <a href="/" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
                <p>About<span>Me.</span></p>
            </a>
            <div className="nav-item-container">
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>
                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><a
                        href="#home"
                        className={activeSection === 'home' ? "active" : ""}
                        onClick={(e) => handleNavClick(e, 'home')}
                    >
                        Home
                    </a></li>
                    <li><a
                        href="#about"
                        className={activeSection === 'about' ? "active" : ""}
                        onClick={(e) => handleNavClick(e, 'about')}
                    >
                        About
                    </a></li>
                    <li><a
                        href="#service"
                        className={activeSection === 'service' ? "active" : ""}
                        onClick={(e) => handleNavClick(e, 'service')}
                    >
                        Service
                    </a></li>
                    <li><a
                        href="#portfolio"
                        className={activeSection === 'portfolio' ? "active" : ""}
                        onClick={(e) => handleNavClick(e, 'portfolio')}
                    >
                        Portfolio
                    </a></li>
                    <li><a
                        href="#experience"
                        className={activeSection === 'experience' ? "active" : ""}
                        onClick={(e) => handleNavClick(e, 'experience')}
                    >
                        Experience
                    </a></li>
                    <li><a
                        href="#contact"
                        className={activeSection === 'contact' ? "active" : ""}
                        onClick={(e) => handleNavClick(e, 'contact')}
                    >
                        Contact
                    </a></li>
                </ul>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
