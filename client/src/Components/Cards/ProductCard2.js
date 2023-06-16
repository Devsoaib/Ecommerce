import React from "react";
import { toast } from "react-hot-toast";
import { FaCartArrowDown, FaHeart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Assets/Css/style.css";
import { useCart } from "../../Context/Cart";

function ProductCard2({ p }) {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  
  return (
    <div>
    <div className="product-item me-2">
      <div className="product-thumb" >
        <span className="bage">{`${p?.sold} sold`}</span>
        <img
          alt="product"
          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
          className="img-responsive"
        />
        <div className="preview-meta">
          <ul>
            <li >
              <span>
                {/* <i className="tf-ion-ios-search-strong" /> */}
                <FaSearch className="product-card-icon"></FaSearch>
                
              </span>
            </li>
            <li>
              <a href="#!">
                {/* <i className="tf-ion-ios-heart" /> */}
                <FaHeart className="product-card-icon"></FaHeart>
              </a>
            </li>
            <div
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Added to Cart successfully");
              }}
            >
              <li>
                {/* <i className="tf-ion-android-cart" /> */}
                <FaCartArrowDown className="product-card-icon"></FaCartArrowDown>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="product-content">
        <h4
          onClick={() => {
            navigate(`/product/${p?.slug}`);
          }}
        >
          {p.name}
        </h4>
        <p className="price">
          {" "}
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </div>
  
    </div>
  );
}

export default ProductCard2;
