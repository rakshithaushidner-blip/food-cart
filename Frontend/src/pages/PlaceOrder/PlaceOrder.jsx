import React, { useState, useEffect, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DELIVERY_FEE = 49;
const GST_RATE     = 0.05;

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [step, setStep]       = useState(1); // 1=address, 2=review
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: 'India', phone: ''
  });

  const onChange = (e) => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const subtotal = getTotalCartAmount();
  const gst      = Math.round(subtotal * GST_RATE);
  const total    = subtotal + DELIVERY_FEE + gst;

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    try {
      const res = await axios.post(`${url}/api/order/place`,
        { address: data, items: orderItems, amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        window.location.replace(res.data.session_url);
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || subtotal === 0) navigate('/cart');
  }, [token]);

  return (
    <div className='checkout'>
      {/* Step indicator */}
      <div className='checkout-steps'>
        <div className={`cstep ${step >= 1 ? 'active' : ''}`}>
          <span>1</span> Delivery Address
        </div>
        <div className='cstep-line' />
        <div className={`cstep ${step >= 2 ? 'active' : ''}`}>
          <span>2</span> Review & Pay
        </div>
      </div>

      <div className='checkout-layout'>
        {/* Left */}
        <form onSubmit={placeOrder} className='checkout-form'>
          <div className='form-section'>
            <h3>📍 Delivery Address</h3>
            <div className='form-row'>
              <div className='fgroup'>
                <label>First Name</label>
                <input required name='firstName' onChange={onChange} value={data.firstName} type='text' placeholder='Rakshitha' />
              </div>
              <div className='fgroup'>
                <label>Last Name</label>
                <input required name='lastName' onChange={onChange} value={data.lastName} type='text' placeholder='S' />
              </div>
            </div>
            <div className='fgroup'>
              <label>Email Address</label>
              <input required name='email' onChange={onChange} value={data.email} type='email' placeholder='you@example.com' />
            </div>
            <div className='fgroup'>
              <label>Phone Number</label>
              <input required name='phone' onChange={onChange} value={data.phone} type='tel' placeholder='+91 9876543210' />
            </div>
            <div className='fgroup'>
              <label>Street Address</label>
              <input required name='street' onChange={onChange} value={data.street} type='text' placeholder='123, MG Road, Koramangala' />
            </div>
            <div className='form-row'>
              <div className='fgroup'>
                <label>City</label>
                <input required name='city' onChange={onChange} value={data.city} type='text' placeholder='Bengaluru' />
              </div>
              <div className='fgroup'>
                <label>State</label>
                <input required name='state' onChange={onChange} value={data.state} type='text' placeholder='Karnataka' />
              </div>
            </div>
            <div className='form-row'>
              <div className='fgroup'>
                <label>Zip Code</label>
                <input required name='zipcode' onChange={onChange} value={data.zipcode} type='text' placeholder='560001' />
              </div>
              <div className='fgroup'>
                <label>Country</label>
                <input required name='country' onChange={onChange} value={data.country} type='text' placeholder='India' />
              </div>
            </div>
          </div>

          <button type='submit' className='pay-btn' disabled={loading}>
            {loading ? '⏳ Redirecting to payment...' : `Pay ₹${total} Securely →`}
          </button>
          <p className='secure-note'>🔒 100% Secure · Powered by Stripe</p>
        </form>

        {/* Right: Bill */}
        <div className='checkout-bill'>
          <h3>Order Summary</h3>
          <div className='checkout-items'>
            {food_list.filter(item => cartItems[item._id] > 0).map(item => (
              <div key={item._id} className='co-item'>
                <div className='co-item-left'>
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>×{cartItems[item._id]}</span>
                  </div>
                </div>
                <p>₹{item.price * cartItems[item._id]}</p>
              </div>
            ))}
          </div>
          <hr />
          <div className='co-bill-row'><span>Item Total</span><span>₹{subtotal}</span></div>
          <div className='co-bill-row'><span>Delivery Fee</span><span>₹{DELIVERY_FEE}</span></div>
          <div className='co-bill-row'><span>GST (5%)</span><span>₹{gst}</span></div>
          <hr />
          <div className='co-bill-row total'><strong>Total</strong><strong>₹{total}</strong></div>
          <div className='delivery-promise'>
            <span>🛵</span>
            <div>
              <p>Estimated Delivery</p>
              <strong>25 – 35 minutes</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;