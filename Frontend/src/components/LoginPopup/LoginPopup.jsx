import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [loading, setLoading]     = useState(false);
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';
    try {
      const res = await axios.post(`${url}${endpoint}`, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        toast.success(currState === 'Login'
          ? `Welcome back, ${res.data.userName}! 👋`
          : `Account created! Welcome, ${res.data.userName}! 🎉`
        );
        setShowLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-overlay' onClick={(e) => e.target.className === 'login-overlay' && setShowLogin(false)}>
      <div className='login-modal'>

        {/* Left panel */}
        <div className='login-left'>
          <div className='login-left-inner'>
            <div className='login-brand'>🍔 FoodCart</div>
            <h2>You are just<br />one step away</h2>
            <p>Sign in to track orders, save favourites, and get exclusive deals.</p>
            <div className='login-perks'>
              <div className='perk'>⚡ Fast delivery</div>
              <div className='perk'>🎁 Exclusive offers</div>
              <div className='perk'>📦 Live tracking</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className='login-right'>
          <button className='close-btn' onClick={() => setShowLogin(false)} aria-label='Close'>✕</button>

          <h3>{currState === 'Login' ? 'Welcome back!' : 'Create account'}</h3>
          <p className='login-sub'>{currState === 'Login' ? 'Login to your FoodCart account' : 'Join thousands of food lovers'}</p>

          <form onSubmit={onSubmit} className='login-form'>
            {currState === 'Sign Up' && (
              <div className='form-group'>
                <label>Full Name</label>
                <input name='name' onChange={onChange} value={data.name} type='text' placeholder='John Doe' required />
              </div>
            )}
            <div className='form-group'>
              <label>Email Address</label>
              <input name='email' onChange={onChange} value={data.email} type='email' placeholder='you@example.com' required />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input name='password' onChange={onChange} value={data.password} type='password' placeholder='Minimum 8 characters' required minLength={8} />
            </div>

            <div className='form-terms'>
              <input type='checkbox' id='terms' required />
              <label htmlFor='terms'>I agree to <span>Terms</span> & <span>Privacy Policy</span></label>
            </div>

            <button type='submit' className='login-btn' disabled={loading}>
              {loading ? 'Please wait...' : currState === 'Login' ? 'Login →' : 'Create Account →'}
            </button>
          </form>

          <p className='login-switch'>
            {currState === 'Login'
              ? <>New to FoodCart? <span onClick={() => setCurrState('Sign Up')}>Create account</span></>
              : <>Already have an account? <span onClick={() => setCurrState('Login')}>Login</span></>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;