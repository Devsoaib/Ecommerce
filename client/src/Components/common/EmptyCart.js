import React from 'react';
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../../Assets/Css/style.css';

function EmptyCart() {
    const navigate = useNavigate()
  return (
    <div>
        <section className="empty-cart page-wrapper">
  <div className="container">
    <div className="row">
        <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="block text-center">
        <FaOpencart style={{color: "black", fontSize: "60px", marginBottom: "20px"}}></FaOpencart>
          <h2 className="text-center">Your cart is currently empty.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, sed.</p>
          <button onClick={(e)=> {navigate("/shop")}} className="btn btn-primary mt-20">Continue Shopping</button>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  </div>
  </section>
    </div>
  )
}

export default EmptyCart