import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import foodcartLogo from '../../assets/foodcart_logo.png';

const Navbar = ({ setShowLogin }) => {
  const [scrolled, setScrolled]     = useState(false);
  const [searchText, setSearchText] = useState('');
  const { getTotalCartCount, getTotalCartAmount, token, logout } = useContext(StoreContext);
  const navigate  = useNavigate();
  const location  = useLocation();
  const cartCount = getTotalCartCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const el = document.getElementById('explore-menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className='navbar-inner'>

        {/* Left: Logo + Location */}
        <div className='navbar-left'>
          <Link to='/' className='navbar-logo'>
            <img src={foodcartLogo} alt='FoodCart' />
            <span>Food<b>Cart</b></span>
          </Link>
          <div className='navbar-location'>
            <span className='location-icon'>📍</span>
            <div className='location-text'>
              <span className='city'>Bengaluru</span>
              <span className='location-label'>Karnataka, India ▾</span>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <form className='navbar-search' onSubmit={handleSearch}>
          <span className='search-icon-nav'>🔍</span>
          <input
            type='text'
            placeholder='Search for restaurants and food...'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </form>

        {/* Right: Actions */}
        <div className='navbar-right'>
          {!token ? (
            <button className='btn-signin' onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          ) : (
            <div className='navbar-profile'>
              <div className='profile-avatar'>
                {/* person icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <ul className='nav-dropdown'>
                <li onClick={() => navigate('/myorders')}>📦 My Orders</li>
                <hr />
                <li onClick={logout}>🚪 Logout</li>
              </ul>
            </div>
          )}

          <div className='navbar-cart' onClick={() => navigate('/cart')}>
            <span className='cart-icon-wrap'>
              🛒
              {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
            </span>
            {cartCount > 0 && <span className='cart-amount'>₹{getTotalCartAmount()}</span>}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;