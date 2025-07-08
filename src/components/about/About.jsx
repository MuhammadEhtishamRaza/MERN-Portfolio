import "./About.css";
import img from "../../assets/about.png";
import img1 from "../../assets/frame.png";

const About = () => {
    return (
        <div className="about" id="about">
            <div className="about-container">
                <div className="about-image">
                    <img src={img1} alt="Frame Image" id="about-image-1" />
                    <img src={img} alt="About Image" id="about-image-2" />
                </div>
            </div>
            <div className="about-content">
                <h1>About <span>Me</span></h1>
                <p>I'm a Software Engineer specializing in MERN stack, Flask, FastAPI, and cross-platform mobile development with Flutter. I build scalable, high-performance, and user-centric web and mobile applications.</p>
                <p>Proficient in RESTful API design, state management, and clean architecture.</p>
                <a href="#contact" className="about-btn">Contact us</a>
            </div>
        </div>
    )
}

export default About