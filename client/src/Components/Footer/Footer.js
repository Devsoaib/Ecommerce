import React from 'react';
import { FaDribbble, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './footer.css';

function Footer() {
  
  return (

    <>
   <footer className="footer section text-center">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <ul className="social-media">
          <li>
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100043511079607" rel="noreferrer">
              <FaFacebook className='social-icons'></FaFacebook>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100043511079607" rel="noreferrer">
              <FaInstagram className='social-icons'></FaInstagram>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/Dev_Soaib" rel="noreferrer">
              <FaTwitter className='social-icons'></FaTwitter>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/Dev_Soaib" rel="noreferrer">
              <FaDribbble className='social-icons'></FaDribbble>
            </a>
          </li>
        </ul>
        <ul className="footer-menu text-uppercase">
           <li>
            <NavLink  to="/" className='nav-link'>HOME</NavLink>
          </li>
           <li>
            <NavLink  to="/shop" className='nav-link'>SHOP</NavLink>
          </li>
           <li>
            <NavLink to="/shop" className='nav-link'>SHOP</NavLink>
          </li>
           <li>
            <NavLink  to="/shop" className='nav-link'>SHOP</NavLink>
          </li>
        
        </ul>
        <p className="copyright-text">
          Copyright ©2021, Designed &amp; Developed by 
          <a href="https://twitter.com/Dev_Soaib"> SOAIB</a>
        </p>
      </div>
    </div>
  </div>
</footer>
  </>
  )
}

export default Footer