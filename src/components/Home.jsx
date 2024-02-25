import React from 'react';
import './Home.css'; // Import CSS file for Home component styles

const Home = () => {
  return (
    <div className="home-container"> {/* Apply styles using className */}
      <h1 className="home-heading">Welcome to Our Website!</h1> {/* Apply styles to heading */}
      <p className="home-paragraph">This is the home page of our React application.</p> {/* Apply styles to paragraphs */}
      <p className="home-paragraph">Feel free to explore and enjoy your stay!</p>
    </div>
  );
};

export default Home;
