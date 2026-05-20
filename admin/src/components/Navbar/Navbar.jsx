// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand"><span className='brand-name'>FoodCart<span className='brand-dot'>.</span></span><p className='admin-label'>Admin Panel</p></div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
