import React from 'react';
import './Footer.css';
import foodcartLogo from '../../assets/foodcart_logo.png';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <div className='footer-logo'>
            <img src={foodcartLogo} alt='FoodCart' />
            <span>Food<b>Cart</b></span>
          </div>
          <p>Delivering happiness to your doorstep. Fresh food from the best restaurants in your city — fast, reliable, and always delicious.</p>
          <div className='footer-social'>
            <a href='#' className='social-btn' aria-label='Facebook'>
              <img src={assets.facebook_icon} alt='Facebook' />
            </a>
            <a href='#' className='social-btn' aria-label='Twitter'>
              <img src={assets.twitter_icon} alt='Twitter' />
            </a>
            <a href='#' className='social-btn' aria-label='LinkedIn'>
              <img src={assets.linkedin_icon} alt='LinkedIn' />
            </a>
          </div>
        </div>

        <div className='footer-links'>
          <h4>Company</h4>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='#'>About Us</a></li>
            <li><a href='#'>Blog</a></li>
            <li><a href='#'>Careers</a></li>
          </ul>
        </div>

        <div className='footer-links'>
          <h4>Help</h4>
          <ul>
            <li><a href='#'>FAQ</a></li>
            <li><a href='#'>Delivery Info</a></li>
            <li><a href='#'>Privacy Policy</a></li>
            <li><a href='#'>Terms of Service</a></li>
          </ul>
        </div>

        <div className='footer-links'>
          <h4>Contact</h4>
          <ul>
            <li>📞 +91-9876-543210</li>
            <li>📧 support@foodcart.com</li>
            <li>📍 Bengaluru, Karnataka</li>
            <li>🕐 24/7 Support</li>
          </ul>
        </div>

        <div className='footer-app'>
          <h4>Get the App</h4>
          <p>Order faster with our mobile app</p>
          <div className='app-btns'>
            <a href='#'><img src={assets.play_store} alt='Play Store' /></a>
            <a href='#'><img src={assets.app_store} alt='App Store' /></a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2026 FoodCart. All rights reserved. Made with ❤️ in India.</p>
        <div className='footer-bottom-links'>
          <a href='#'>Privacy</a>
          <a href='#'>Terms</a>
          <a href='#'>Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;