import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FILTERS = ['All', 'Rating 4.0+', 'Fast Delivery', 'Pure Veg', 'Offers'];

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = food_list.filter(item => {
    const matchesCategory = category === 'All' || category === item.category;
    const matchesVeg = activeFilter === 'Pure Veg' ? item.category === 'Pure Veg' || item.category === 'Salad' : true;
    return matchesCategory && matchesVeg;
  });

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-top'>
        <h2 className='section-heading'>
          {category === 'All' ? 'All Dishes Near You' : category}
          <span className='food-count'>{filtered.length} items</span>
        </h2>

        <div className='filter-bar'>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'Pure Veg' && <span className='veg-dot' />}
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className='no-results'>
          <div style={{ fontSize: '56px' }}>🍽️</div>
          <h3>No dishes found</h3>
          <p>Try a different category or filter</p>
        </div>
      ) : (
        <div className='food-display-list'>
          {filtered.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;