import About from "../components/about/About"
import Contact from "../components/contact/Contact"
import Experience from "../components/experience/Experience"
import Footer from "../components/footer/Footer"
import { Hero } from "../components/hero/Hero"
import Navbar from "../components/navbar/Navbar"
import Portfolio from "../components/portfolio/Portfolio"
import Service from "../components/service/Service"
import ScrollToTop from "../components/ScrollToTop"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const PortfolioPages = () => {
    const homeRef = useScrollAnimation();
    const aboutRef = useScrollAnimation();
    const serviceRef = useScrollAnimation();
    const portfolioRef = useScrollAnimation();
    const experienceRef = useScrollAnimation();
    const contactRef = useScrollAnimation();

    return (
        <div>
            <Navbar />
            <div id="home" ref={homeRef}>
                <Hero />
            </div>
            <div id="about" ref={aboutRef}>
                <About />
            </div>
            <div id="service" ref={serviceRef}>
                <Service />
            </div>
            <div id="portfolio" ref={portfolioRef}>
                <Portfolio />
            </div>
            <div id="experience" ref={experienceRef}>
                <Experience />
            </div>
            <div id="contact" ref={contactRef}>
                <Contact />
            </div>
            <Footer />
            <ScrollToTop />
        </div>
    )
}

export default PortfolioPages