import Header from './Components/Header'
import './App.css'
import PromotionCard from './Components/PromotionCard'
import ProductData from './Components/ProductData'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

function App() {
  function Home() {
    return (
      <>
        <PromotionCard />
        <ProductData />
      </>
    )
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <Link to="/Cart">
          <div className="cart-icon">
            <div className="notify">
              <p>1</p>
            </div>
            <img
              src="https://img-premium.flaticon.com/png/512/2838/premium/2838895.png?token=exp=1632349224~hmac=1cac160e90279dc52d542c093c67fd93"
              alt="icon"
            />
          </div>
        </Link>
        <Switch>
          <Route path="/Cart" exact component={Cart} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
