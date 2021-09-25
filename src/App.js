import Header from './Components/Header'
import './App.css'
import PromotionCard from './Components/PromotionCard'
import ProductData from './Components/ProductData'
import Cart from './Components/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'

function App() {
  const cartLength = useSelector(state => state.cart.length)

  if (cartLength > 0) {
    document.querySelector('.notify').style.display = 'flex'
  }

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
              <p>{cartLength}</p>
            </div>

            <FaShoppingCart fontSize="1.8rem" />
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
