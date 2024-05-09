import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup'
import Login from './pages/signin'
import Home from './pages/home'
import Products from './pages/products';
import AboutUs from './pages/aboutUs';
import ContactUs from './pages/contactUs';
import Account from './pages/account';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/products' element={<Products />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/contactUs' element={<ContactUs />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
