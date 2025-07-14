import "./Hero.css"
// import img from "../../assets/portfolio.png"
import { useEffect, useState } from "react";
import { fetchHeroData } from "../../api/project";

export const Hero = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchHeroData().then((data) => setData(data))
    }, [])

    return (
        <>
            {data.map((dataitem) => (
                <div className="hero" key={dataitem.id}>
                    <div className="hero-content">
                        <p>Hello, Welcome</p>
                        <h1 className="hero-tile">I m {dataitem.title}</h1>
                        <p>{dataitem.description}</p>
                        <a href="#contact" className="hero-btn">Contact us</a>
                    </div>
                    <div className="hero-image">
                        <img src={dataitem.image} alt="Hero Image" />
                    </div>
                </div>
            ))}
        </>
    )
}
