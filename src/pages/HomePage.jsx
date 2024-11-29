import React from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import FeaturedArtworks from '../components/FeaturedArtworks';

const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <HeroSection />
      <FeaturedArtworks />
    </div>
  );
};

export default HomePage;