import "./Hero.css"
import img from "../../assets/portfolio.png"

export const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <p>Hello, Welcome</p>
                <h1 className="hero-tile">I m Muhammad Ehtisham Raza</h1>
                <p>I'm a Software Engineer specializing in MERN stack, Flask, FastAPI, and Flutter.
                    I build scalable full-stack web and mobile applications.</p>
                <a href="#contact" className="hero-btn">Contact us</a>
            </div>
            <div className="hero-image">
                <img src={img} alt="Hero Image" />
            </div>
        </div>
    )
}
