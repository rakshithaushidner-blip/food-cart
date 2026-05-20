import React, { useState } from 'react';
import './Home.css';
import PromoBanner from '../../components/PromoBanner/PromoBanner';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import FloatingCartBar from '../../components/FloatingCartBar/FloatingCartBar';

const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div className='home'>
      <PromoBanner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <FloatingCartBar />
    </div>
  );
};

export default Home;