import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <div className='header-tag'>🚀 Fast Delivery in 30 mins</div>
        <h1>Craving something <span>delicious?</span></h1>
        <p>Order from a wide selection of restaurants. Fresh food delivered hot to your door.</p>
        <div className='header-actions'>
          <a href='#explore-menu' className='btn-order'>Order Now</a>
          <a href='#explore-menu' className='btn-menu'>See Menu →</a>
        </div>
        <div className='header-stats'>
          <div><strong>500+</strong><span>Dishes</span></div>
          <div className='stat-divider'></div>
          <div><strong>30 min</strong><span>Delivery</span></div>
          <div className='stat-divider'></div>
          <div><strong>4.8★</strong><span>Rating</span></div>
        </div>
      </div>
    </div>
  );
};

export default Header;