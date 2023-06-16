import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../Assets/Css/style.css';

function Confirmation() {
    const navigate = useNavigate()
  return (
    <div>
        <section className="page-wrapper success-msg">
  <div className="container">
    <div className="row ">
        <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="block text-center">
          <FaCheckCircle style={{color: "green", fontSize: "60px", marginBottom: "20px"}}></FaCheckCircle>
          <h2 className="text-center">Thank you! For your payment</h2>
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

export default Confirmation