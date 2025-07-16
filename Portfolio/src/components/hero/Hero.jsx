import "./Hero.css"
// import img from "../../assets/portfolio.png"
import { useEffect, useState } from "react";
// import { fetchHeroData } from "../../api/project";

export const Hero = () => {
    const [data, setData] = useState([]);

    const fetchHeroData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/herosection/hero")
            const result = await response.json()
            // console.log(result)
            return result
        } catch (error) {
            console.error("Error fetching data from Hero Section API: ", error.message)
        }
    }

    useEffect(() => {
        fetchHeroData().then((data) => setData(data))
    }, [])
    // console.log("data", data)

    return (
        <>
            {data.map((dataitem) => (
                <div className="hero" key={dataitem._id}>
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
