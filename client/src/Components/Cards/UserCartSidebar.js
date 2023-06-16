import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';
import { useCart } from '../../Context/Cart';

function UserCartSidebar() {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if (auth?.token) {
      getClientToken()
    }
  }, [auth?.token])


  const getClientToken = async()=> {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  }
  
  const carttotal = () => {
    let total = 0;
    cart.map((item,i) => {
      total += item.price;
    })

    return (
      total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    )
  }
  const handleBuy = async()=> {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      console.log("handle buy response => ", data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/confirmation");
      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  
  }


  return (
    <div >
      <h4>Your Cart Summary</h4>
      <h5>Total / Address / Payments</h5>
      <hr />
      <h5>Total: {carttotal()}</h5>

      {
        auth?.user?.address ? (
          <>
          <div className="mb-3">
            <hr />
            <h4>Delivery address:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update address
          </button>
        </>
        ) : (
          (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Add delivery address
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger mt-3"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Login to checkout
                </button>
              )}
            </div>
          )
        )
      }

      <div>
        {
          !cart?.length || !clientToken ?(""): (

            <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
              <button
              onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
            </>
          )
        }
      </div>


    </div>
  )
}

export default UserCartSidebar