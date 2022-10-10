import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import './bootstrap.min.css'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
