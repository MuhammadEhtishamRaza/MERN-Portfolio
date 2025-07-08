import "./footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <h1>AboutMe.</h1>
                <p>Crafting scalable web and mobile solutions with MERN, Flask, FastAPI, and Flutter.<br />© 2025 Muhammad Ehtisham Raza. All rights reserved.</p>
                <ul>
                    <li><a href="#"><FaFacebook /></a></li>
                    <li><a href="#"><FaTwitter /></a></li>
                    <li><a href="#"><FaLinkedin /></a></li>
                    <li><a href="#"><FaInstagram /></a></li>
                    <li><a href="#"><FaYoutube /></a></li>
                    <li><a href="#"><FaPinterest /></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer