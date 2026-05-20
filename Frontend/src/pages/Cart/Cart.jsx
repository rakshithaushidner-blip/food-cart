import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DELIVERY_FEE = 49;
const GST_RATE     = 0.05;

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount]   = useState(0);
  const navigate = useNavigate();
  const subtotal  = getTotalCartAmount();
  const gst       = Math.round(subtotal * GST_RATE);
  const total     = subtotal === 0 ? 0 : subtotal + DELIVERY_FEE + gst - discount;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'FOODCART20') {
      setDiscount(Math.round(subtotal * 0.2));
      toast.success('🎉 Promo applied! 20% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const cartFoods = food_list.filter(item => cartItems[item._id] > 0);

  if (cartFoods.length === 0) {
    return (
      <div className='cart-empty'>
        <div className='empty-icon'>🛒</div>
        <h2>Your cart is empty!</h2>
        <p>You haven't added anything to your cart yet. Explore our menu and order something delicious.</p>
        <button onClick={() => navigate('/')}>Browse Menu</button>
      </div>
    );
  }

  return (
    <div className='cart'>
      <h2 className='cart-heading'>Your Cart</h2>

      <div className='cart-layout'>
        {/* Items */}
        <div className='cart-items-box'>
          <div className='cart-items-header'>
            <span>Item</span><span>Price</span><span>Quantity</span><span>Total</span>
          </div>

          {cartFoods.map(item => (
            <div key={item._id} className='cart-row'>
              <div className='cart-item-info'>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <div>
                  <p className='cart-item-name'>{item.name}</p>
                  <p className='cart-item-cat'>{item.category}</p>
                </div>
              </div>
              <p className='cart-item-price'>₹{item.price}</p>
              <div className='cart-qty'>
                <button onClick={() => removeFromCart(item._id)}>−</button>
                <span>{cartItems[item._id]}</span>
                <button onClick={() => addToCart(item._id)}>+</button>
              </div>
              <p className='cart-item-total'>₹{item.price * cartItems[item._id]}</p>
            </div>
          ))}

          {/* Promo */}
          <div className='promo-section'>
            <p className='promo-hint'>🎟️ Use <strong>FOODCART20</strong> for 20% off</p>
            <div className='promo-row'>
              <input
                type='text'
                placeholder='Enter promo code'
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromo}>Apply</button>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className='bill-box'>
          <h3>Bill Details</h3>
          <div className='bill-row'><span>Item Total</span><span>₹{subtotal}</span></div>
          <div className='bill-row delivery-row'>
            <span>Delivery Partner Fee</span>
            <span>{subtotal === 0 ? '₹0' : <><s className='old-fee'>₹99</s> ₹{DELIVERY_FEE}</>}</span>
          </div>
          <div className='bill-row free-delivery'>
            <span>🎉 Delivery partner fee waived</span>
            <span className='saved-tag'>SAVING ₹50</span>
          </div>
          <div className='bill-row'><span>GST & Charges (5%)</span><span>₹{gst}</span></div>
          {discount > 0 && <div className='bill-row discount-row'><span>Promo Discount</span><span>−₹{discount}</span></div>}
          <hr className='bill-hr' />
          <div className='bill-row total-row'>
            <strong>To Pay</strong>
            <strong>₹{total}</strong>
          </div>

          <button
            className='place-order-btn'
            onClick={() => {
              if (!token) { toast.info('Please login to checkout'); return; }
              navigate('/order');
            }}
          >
            Proceed to Checkout →
          </button>

          <p className='savings-note'>
            {discount > 0
              ? `🎉 You're saving ₹${discount + 50} on this order!`
              : '🛵 Your order will be delivered in 25-35 mins'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
