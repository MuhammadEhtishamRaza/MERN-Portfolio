import PortfolioPages from "./pages/PortfolioPages"
import LoadingAnimation from "./components/LoadingAnimation"
import "./App.css"

const App = () => {
  return (
    <>
      <LoadingAnimation />
      <PortfolioPages />
    </>
  )
}

export default App