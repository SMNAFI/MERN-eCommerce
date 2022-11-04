import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* :id will be dynamic */}
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            {/* direct to cart */}
            <Route path='/cart' element={<CartPage />} />
            {/* from product page to cart with id and quantity*/}
            <Route path='/cart/:id' element={<CartPage />} />
          </Routes>
          {/* <HomePage /> */}
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
