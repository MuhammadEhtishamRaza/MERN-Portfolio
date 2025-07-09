import './Portfolio.css'
// import img1 from "../../assets/portfolio-1.png"
// import img2 from "../../assets/portfolio-2.png"
// import img3 from "../../assets/portfolio-3.png"
// import img4 from "../../assets/portfolio-4.png"
// import img5 from "../../assets/portfolio-5.png"
import { fetchPortfolio } from '../../api/project'
import { useEffect, useState } from 'react'

const Portfolio = () => {

    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        fetchPortfolio().then((data) => setPortfolios(data))
    }, []);

    return (
        <div className='portfolio' id='portfolio'>
            <div className='portfolio-description'>
                <h1>My <span>Portfolio</span></h1>
                <p>Explore my work — From full-stack web apps to cross-platform mobile solutions <br /> Built using modern technologies like MERN, Flask, FastAPI, and Flutter.</p>
            </div>

            <div className='portfolio-content'>
                {portfolios.map((portfolio) => (
                    <div className={`portfolio-item-${portfolio.id}`} key={portfolio.id}>
                        <img src={portfolio.image} alt="portfolio-image" className={`portfolio-img-${portfolio.id}`} />
                    </div>
                ))}
                {/* <div className='portfolio-item-2'>
                    <img src={img2} alt="portfolio-image" className='portfolio-img' />
                </div>
                <div className='portfolio-item-3'>
                    <img src={img3} alt="portfolio-image" className='portfolio-img' />
                </div>
                <div className='portfolio-item-4'>
                    <img src={img4} alt="portfolio-image" className='portfolio-img' />
                </div>
                <div className='portfolio-item-5'>
                    <img src={img5} alt="portfolio-image" className='portfolio-img' />
                </div> */}
            </div>
        </div>
    )
}

export default Portfolio