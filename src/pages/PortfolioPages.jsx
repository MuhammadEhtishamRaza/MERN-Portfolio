import About from "../components/about/About"
import Contact from "../components/contact/Contact"
import Experience from "../components/experience/Experience"
import Footer from "../components/footer/Footer"
import { Hero } from "../components/hero/Hero"
import Navbar from "../components/navbar/Navbar"
import Portfolio from "../components/portfolio/Portfolio"
import Service from "../components/service/Service"

const PortfolioPages = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <Service />
            <Portfolio />
            <Experience />
            <Contact />
            <Footer />
        </div>
    )
}

export default PortfolioPages