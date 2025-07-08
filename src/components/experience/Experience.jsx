import "./Experience.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchExperience } from "../../api/project";
import { useEffect, useState } from "react";

const Experience = () => {

    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        fetchExperience().then((data) => setExperiences(data));
    }, [])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 700 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 1
        }
    };

    return (
        <div className="experience" id="experience">
            <div className="experience-description">
                <h1>My <span>Experience</span></h1>
                <p>Built web and mobile applications using MERN, Flask, FastAPI, and Flutter.<br /> Focused on scalable architecture and smooth user experience.</p>
            </div>
            <div className="experience-details">
                <Carousel responsive={responsive} swipeable={false}
                    draggable={false}
                    showDots={true}
                    arrows={false}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all 2"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                    {experiences.map((experience) => (
                        <div className="experience-item" key={experience.id}>
                            <p>{experience.duration}</p>
                            <h3>{experience.position}</h3>
                            <h5>{experience.company}</h5>
                            <p>{experience.description}</p>
                        </div>
                    ))}
                    {/* <div className="experience-item">
                        <p>July 2025 - Present</p>
                        <h3>Software Engineer</h3>
                        <h5>Altegon</h5>
                        <p>This internship provided hands-on training in frontend development and core web fundamentals. I worked on a project solving real-world challenges in modern web design.</p>
                    </div>
                    <div className="experience-item">
                        <p>July 2025 - Present</p>
                        <h3>MERN Developer</h3>
                        <h5>Upwork</h5>
                        <p>This internship provided hands-on training in frontend development and core web fundamentals. I worked on a project solving real-world challenges in modern web design.</p>
                    </div> */}
                </Carousel>
            </div>
        </div>
    )
}

export default Experience