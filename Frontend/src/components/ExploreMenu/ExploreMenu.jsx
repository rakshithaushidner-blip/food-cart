import React, { useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='explore-menu-header'>
        <div>
          <h2 className='section-heading'>What's on your mind?</h2>
          <p className='explore-subtitle'>Tap a category to filter your cravings</p>
        </div>
        <div className='scroll-arrows'>
          <button onClick={() => scroll(-1)}>‹</button>
          <button onClick={() => scroll(1)}>›</button>
        </div>
      </div>

      <div className='explore-menu-list' ref={scrollRef}>
        {/* All option */}
        <div
          className={`menu-item ${category === 'All' ? 'active' : ''}`}
          onClick={() => setCategory('All')}
        >
          <div className='menu-img-wrap all-icon'>🍽️</div>
          <p>All</p>
        </div>

        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${category === item.menu_name ? 'active' : ''}`}
            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
          >
            <div className='menu-img-wrap'>
              <img src={item.menu_image} alt={item.menu_name} />
            </div>
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <div className='explore-divider' />
    </div>
  );
};

export default ExploreMenu;
