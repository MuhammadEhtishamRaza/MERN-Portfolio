import "./Service.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import img1 from "../../assets/service1.svg";
// import img2 from "../../assets/service2.svg";
// import img3 from "../../assets/service3.svg";
import { fetchServiceData, fetchServices } from "../../api/project";
import { useEffect, useState } from "react";

const Service = () => {

    const [services, setServices] = useState([]);
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        fetchServices().then((data) => setServices(data)),
            fetchServiceData().then((data) => setServiceData(data))
    }, []);

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
        <div className="service" id="service">
            <div className="service-intro">
                <div className="service-title">
                    <h1><span>My</span> Service</h1>
                </div>
                {serviceData.map((item) => (
                    <div className="service-description" key={item.id}>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <div className="service-details">
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
                    {services.map((service) => (
                        <div className="service-item" key={service.id}>
                            <img src={service.img} alt="service" />
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </div>
                    ))}
                    {/* <div className="service-item">
                        <img src={img2} alt="service" />
                        <h2>Mobile App Development</h2>
                        <p>Develop high-performance, responsive mobile applications for Android and iOS using Flutter, with a focus on UI/UX and native-like performance.</p>
                    </div>
                    <div className="service-item">
                        <img src={img3} alt="service" />
                        <h2>Backend Development</h2>
                        <p>Design and implement robust APIs and backend systems using Flask or FastAPI, with support for authentication and third-party integrations.</p>
                    </div> */}
                </Carousel>
            </div>
        </div>
    )
}

export default Service