import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../Context/StoreContext';

const VEG_CATEGORIES = ['Salad', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'];

const RATINGS = {
  'Salad': '4.5', 'Rolls': '4.3', 'Deserts': '4.6', 'Sandwich': '4.4',
  'Cake': '4.7', 'Pure Veg': '4.2', 'Pasta': '4.5', 'Noodles': '4.3',
};
const TIMES = {
  'Salad': '20-25', 'Rolls': '25-30', 'Deserts': '15-20', 'Sandwich': '20-25',
  'Cake': '30-35', 'Pure Veg': '25-30', 'Pasta': '25-35', 'Noodles': '20-30',
};

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const qty    = cartItems[id] || 0;
  const isVeg  = VEG_CATEGORIES.includes(category);
  const rating = RATINGS[category] || '4.4';
  const time   = TIMES[category]   || '25-30';

  return (
    <div className='food-card'>
      {/* Image */}
      <div className='food-card-img'>
        <img src={`${url}/images/${image}`} alt={name} loading='lazy' />

        {/* Offer badge */}
        <div className='offer-badge'>20% OFF</div>

        {/* Cart controls */}
        <div className='cart-controls'>
          {qty === 0 ? (
            <button className='add-btn' onClick={() => addToCart(id)}>
              <span>ADD</span>
              <span className='plus-icon'>+</span>
            </button>
          ) : (
            <div className='qty-pill'>
              <button onClick={() => removeFromCart(id)}>−</button>
              <span>{qty}</span>
              <button onClick={() => addToCart(id)}>+</button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className='food-card-info'>
        {/* Veg/non-veg indicator */}
        <div className='card-top-row'>
          <div className={`type-dot ${isVeg ? 'veg' : 'nonveg'}`}>
            <div className='dot-inner' />
          </div>
          <div className='rating-pill'>
            ⭐ {rating}
          </div>
        </div>

        <h3 className='food-card-name'>{name}</h3>
        <p className='food-card-desc'>{description}</p>

        <div className='food-card-meta'>
          <span className='delivery-time'>🕐 {time} mins</span>
          <span className='meta-sep'>·</span>
          <span className='delivery-label'>Free delivery</span>
        </div>

        <div className='food-card-footer'>
          <span className='food-card-price'>₹{price}</span>
          <span className='price-label'>for one</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;