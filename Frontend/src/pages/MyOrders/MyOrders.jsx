import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './MyOrders.css';

const STEPS = ['Order Placed', 'Food Processing', 'Out for delivery', 'Delivered'];

const MyOrders = () => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const { url, token }        = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (token) fetchOrders(); }, [token]);

  if (loading) return (
    <div className='orders-loading'>
      <div className='spinner'></div>
      <p>Loading your orders...</p>
    </div>
  );

  return (
    <div className='my-orders'>
      <div className='orders-top'>
        <h2>My Orders</h2>
        <p className='orders-count'>{data.length} order{data.length !== 1 ? 's' : ''} placed</p>
      </div>

      {data.length === 0 ? (
        <div className='orders-empty'>
          <div style={{ fontSize: '72px' }}>📦</div>
          <h3>No orders yet</h3>
          <p>Looks like you haven't ordered anything yet. Go explore!</p>
        </div>
      ) : (
        <div className='orders-list'>
          {data.map((order, i) => {
            const stepIdx = STEPS.indexOf(order.status);
            const progress = Math.max(0, stepIdx);
            return (
              <div key={i} className='order-card'>
                <div className='order-card-header'>
                  <div className='order-icon'>
                    <img src={assets.parcel_icon} alt='' />
                  </div>
                  <div className='order-header-info'>
                    <p className='order-items-list'>
                      {order.items.map((item, j) =>
                        `${item.name} ×${item.quantity}${j < order.items.length - 1 ? ', ' : ''}`
                      )}
                    </p>
                    <p className='order-date'>
                      🗓️ {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      &nbsp;·&nbsp;
                      {order.items.reduce((t, i) => t + i.quantity, 0)} item{order.items.reduce((t, i) => t + i.quantity, 0) > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className='order-amount-col'>
                    <p className='order-total'>₹{order.amount}</p>
                    <span className={`order-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                      {order.payment ? '✓ Paid' : '✗ Unpaid'}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className='order-progress'>
                  {STEPS.map((step, idx) => (
                    <div key={idx} className={`step ${idx <= progress ? 'done' : ''} ${idx === progress ? 'current' : ''}`}>
                      <div className='step-dot' />
                      {idx < STEPS.length - 1 && <div className='step-line' />}
                      <p className='step-label'>{step}</p>
                    </div>
                  ))}
                </div>

                <div className='order-card-footer'>
                  <span className={`status-badge status-${progress}`}>
                    {order.status || 'Order Placed'}
                  </span>
                  <button className='reorder-btn' onClick={fetchOrders}>Refresh ↻</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
