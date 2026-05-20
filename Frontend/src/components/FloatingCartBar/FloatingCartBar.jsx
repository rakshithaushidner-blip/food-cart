import React, { useContext } from 'react';
import './FloatingCartBar.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const FloatingCartBar = () => {
  const { getTotalCartCount, getTotalCartAmount, token } = useContext(StoreContext);
  const navigate  = useNavigate();
  const cartCount = getTotalCartCount();
  const total     = getTotalCartAmount();

  if (cartCount === 0) return null;

  return (
    <div className='floating-cart' onClick={() => navigate('/cart')}>
      <div className='floating-cart-left'>
        <span className='fc-count'>{cartCount} item{cartCount > 1 ? 's' : ''}</span>
        <span className='fc-sep'>|</span>
        <span className='fc-note'>View your cart</span>
      </div>
      <div className='floating-cart-right'>
        <span className='fc-total'>₹{total}</span>
        <span className='fc-arrow'>→</span>
      </div>
    </div>
  );
};

export default FloatingCartBar;
