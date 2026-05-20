import React, { useState } from 'react';
import Navbar from './pages/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer position='top-right' autoClose={2500} hideProgressBar={false} />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <div className='app'>
        <Routes>
          <Route path='/'         element={<Home />} />
          <Route path='/cart'     element={<Cart />} />
          <Route path='/order'    element={<PlaceOrder />} />
          <Route path='/verify'   element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='*'         element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '120px 20px' }}>
    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🍽️</div>
    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', marginBottom: '10px' }}>Page Not Found</h2>
    <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>Looks like this page went out for delivery!</p>
    <a href='/' style={{ background: '#2563EB', color: '#fff', padding: '13px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '15px' }}>
      Back to Home
    </a>
  </div>
);

export default App;