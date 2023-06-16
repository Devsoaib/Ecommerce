import React from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../Components/Cards/Jumbotron";
import ProductHorizontalCard from "../Components/Cards/ProductHorizontalCard";
import UserCartSidebar from "../Components/Cards/UserCartSidebar";
import EmptyCart from "../Components/common/EmptyCart";
import { useAuth } from "../Context/Auth";
import { useCart } from "../Context/Cart";

function Cart() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  return (
    <div>
      <Jumbotron
        title="Cart Page"
        subTitle={
          cart?.length > 0
            ? `You have ${cart.length} Products`
            : `Please add product to cart`
        }
      ></Jumbotron>

      {
        cart?.length ?  (
          <>
<div className="container">
        <div className="row">
           <div className="col-md-12">
           
                <h2 className="text-center bg-light my-3 p-3">My Cart</h2>
              
           </div>
        </div>
      </div>
      <div className="container">
      <div className="row">
        <div className="col-md-7">
          {
            cart?.map((p, index)=> (
              <ProductHorizontalCard p={p} key={index}/>
            ))
          }
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-4">
          <UserCartSidebar/>
        </div>
      </div>
    </div>
    </>
        ): (
          <EmptyCart></EmptyCart>
        )
      }

      
    </div>
  );
}

export default Cart;
