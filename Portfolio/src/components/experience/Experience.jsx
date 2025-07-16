import "./Experience.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { fetchExperience } from "../../api/project";
import { useEffect, useState } from "react";

const Experience = () => {

    const [experiences, setExperiences] = useState([]);
    const [experienceDescription, setExperienceDescription] = useState([]);

    const fetchExperience = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/experiencesection1/experience")
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Error while fetching from Experience Section 1 API: ", error.message)
        }
    }

    const fetchExperienceDescription = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/experiencesection2/description")
            const result = await response.json()
            // console.log("Experience Description: ", result)
            return result
        } catch (error) {
            console.error("Error while fetching from Experience Section 2 API: ", error.message)
        }
    }

    useEffect(() => {
        fetchExperience().then((data) => setExperiences(data));
        fetchExperienceDescription().then((data) => setExperienceDescription(data))
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
            {experienceDescription.map((item) => (
                <div className="experience-description" key={item._id}>
                    <h1>My <span>Experience</span></h1>
                    <p>{item.description}</p>
                </div>
            ))}
            <div className="experience-details">
                <Carousel responsive={responsive} swipeable={false}
                    draggable={true}
                    showDots={true}
                    arrows={true}
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