import moment from "moment/moment";
import React from "react";
import { useCart } from "../../Context/Cart";

function ProductHorizontalCard({ p, remove = true }) {

    const removeFromCart = (productId)=> {
        const myCart = [...cart]
        const myIndex = myCart.findIndex((item)=> item._id === productId)
        myCart.splice(myIndex, 1)
        setCart(myCart)
        localStorage.setItem("cart", JSON.stringify(myCart))
    }
  const [cart, setCart] = useCart();
  return (
    <div>
      <div className="card mb-3">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
              alt={p.name}
              style={{
                height: "200px",
                width: "200px",
                objectFit: "cover",
                marginLeft: "-12px",
                borderRopRightRadius: "0px",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {p.name}{" - "}
                {p.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h3>
              <p>{p.description}...</p>
            </div>
            <div >
                <div className="card-text d-flex justify-content-between px-3">
                    <p>Listed: {moment(p.createdAt).fromNow()}</p>
                    {remove && <button className="btn btn-danger mb-2" onClick={()=> {removeFromCart(p._id)}}>Remove</button>}
                    
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHorizontalCard;
