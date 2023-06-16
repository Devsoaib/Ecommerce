import { Badge, Button, Card } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/Cart";

const ProductCard = ({ p }) => {
  const [cart, setCart] = useCart()
  const navigate = useNavigate()
  return (
    <Card
      hoverable
      style={{ width: 300}}
      cover={
        <img
        onClick={()=> {navigate(`/product/${p?.slug}`)}}
          alt="product"
          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
        />
      }
    >
      <Badge.Ribbon text={`${p?.sold} sold`} color="red"></Badge.Ribbon>
      <Card.Meta onClick={()=> {navigate(`/product/${p?.slug}`)}} title={p.name} description={p.description?.substring(0, 60)} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="mt-2">
        {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
        <div className="mt-2">Rating: 4.5</div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Badge
          
          text={`${
            p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in stock`
              : "Out of stock"
          }`}
          status={`${
            p?.quantity >= 1
              ? `success`
              : "error"
          }`}
        />
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={()=> {navigate(`/product/${p?.slug}`)}}>View Details</Button>
        <Button type="primary" onClick={()=> {
          setCart([...cart, p])
          localStorage.setItem("cart", JSON.stringify([...cart, p]))
          toast.success('Added to Cart successfully')
        }}>Add to Cart</Button>
      </div>
    </Card>
  );
};

export default ProductCard;
