import React, { useState, useEffect } from 'react';
import './PromoBanner.css';

const slides = [
  {
    id: 1,
    tag: '🔥 Limited Time',
    title: '50% OFF on your first order',
    subtitle: 'Use code WELCOME50 · Min order ₹199',
    cta: 'Order Now',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 60%, #3b82f6 100%)',
    emoji: '🍔',
  },
  {
    id: 2,
    tag: '⚡ Flash Deal',
    title: 'Free delivery all day long',
    subtitle: 'On orders above ₹149 · No promo code needed',
    cta: 'Explore Menu',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1d4ed8 100%)',
    emoji: '🛵',
  },
  {
    id: 3,
    tag: '🌿 Healthy Choice',
    title: 'Fresh salads & veg specials',
    subtitle: 'Nutritious meals delivered in 30 mins',
    cta: 'See Healthy Options',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #2563EB 100%)',
    emoji: '🥗',
  },
];

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent(c => (c + 1) % slides.length);

  return (
    <div className='promo-banner'>
      <div className='promo-track' style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map(slide => (
          <div key={slide.id} className='promo-slide' style={{ background: slide.gradient }}>
            <div className='promo-content'>
              <span className='promo-tag'>{slide.tag}</span>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <a href='#explore-menu' className='promo-cta'>{slide.cta} →</a>
            </div>
            <div className='promo-emoji'>{slide.emoji}</div>
          </div>
        ))}
      </div>

      <button className='promo-arrow left'  onClick={prev}>‹</button>
      <button className='promo-arrow right' onClick={next}>›</button>

      <div className='promo-dots'>
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
