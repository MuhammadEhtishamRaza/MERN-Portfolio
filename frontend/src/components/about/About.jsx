import "./About.css";
// import img from "../../assets/about.png";
import img1 from "../../assets/frame.png";
import { useEffect, useState } from "react";
// import { fetchAbout } from "../../api/project";

const About = () => {
    const [about, setAbout] = useState([]);

    const fetchAbout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/aboutsection/about")
            const result = await response.json()
            // console.log("Result: ", result)
            return result
        } catch (error) {
            console.error("Error in fetching from About Section API: ", error.message)
        }
    }

    useEffect(() => {
        fetchAbout().then((data) => setAbout(data))
    }, [])
    return (
        <>
            {about.map((item) => (
                <div className="about" id="about" key={item._id}>
                    <div className="about-container">
                        <div className="about-image">
                            <img src={img1} alt="Frame Image" id="about-image-1" />
                            <img src={item.image} alt="About Image" id="about-image-2" />
                        </div>
                    </div>
                    <div className="about-content">
                        <h1>About <span>Me</span></h1>
                        <p>{item.description1}</p>
                        <p>{item.description2}</p>
                        <a href="#contact" className="about-btn">Contact us</a>
                    </div>
                </div>
            ))}
        </>
    )
}

export default About