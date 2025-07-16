import './Portfolio.css'
// import img1 from "../../assets/portfolio-1.png"
// import img2 from "../../assets/portfolio-2.png"
// import img3 from "../../assets/portfolio-3.png"
// import img4 from "../../assets/portfolio-4.png"
// import img5 from "../../assets/portfolio-5.png"
// import { fetchPortfolio } from '../../api/project'
import { useEffect, useState } from 'react'

const Portfolio = () => {

    const [portfolios, setPortfolios] = useState([]);
    const [portfolioDescription, setPortfolioDescription] = useState([])

    const fetchPortfolio = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/portfoliosection1/portfolio")
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Error in fetching from Portfolio Section 1 API: ", error.message)
        }
    }

    const fetchPortfolioDescription = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/portfoliosection2/description")
            const result = await response.json()
            return result
        } catch (error) {
            console.error("Error in fetching from Portfolio Section 2 API: ", error.message)
        }
    }

    useEffect(() => {
        fetchPortfolio().then((data) => setPortfolios(data))
        fetchPortfolioDescription().then((data) => setPortfolioDescription(data))
    }, []);

    return (
        <div className='portfolio' id='portfolio'>
            {portfolioDescription.map((item) => (
                <div className='portfolio-description' key={item._id}>
                    <h1>My <span>Portfolio</span></h1>
                    <p>{item.description}</p>
                </div>
            ))}
            <div className='portfolio-content'>
                {portfolios.map((portfolio) => (
                    <div className={`portfolio-item-${portfolio._id}`} key={portfolio._id}>
                        <img src={portfolio.image} alt="portfolio-image" className={`portfolio-img-${portfolio._id}`} width={"100%"} />
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