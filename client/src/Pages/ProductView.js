import { Button, Col, Divider, Image, Layout, Row, Typography } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { FaCheck, FaHome, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Jumbotron from '../Components/Cards/Jumbotron';
// import ProductCard from '../Components/Cards/ProductCard';
import ProductCard2 from '../Components/Cards/ProductCard2';
import { useCart } from '../Context/Cart';
const {  Content } = Layout;
const { Title, Text } = Typography;


function ProductView() {
  const [cart, setCart] = useCart()
  const params = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params?.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
        const {data} = await axios.get(`/related-products/${productId}/${categoryId}`)
        setRelated(data)
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div >
    
    <Layout>
      <Jumbotron title="Product Page"></Jumbotron>
      <div className="container">     
      <Content style={{ padding: '3%' }}>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Image
              width={500}
              src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
              alt="Product Image"
            />
          </Col>
          <Col span={12}>
            <Title level={2}>{product?.name}</Title>
            <Text style={{ fontSize: '16px' }} type="secondary">{product?.quantity > 0 ? <FaCheck style={{ marginRight: '5px', color: 'green' }}/> : <FaTimes style={{ marginRight: '5px', color: 'red' }}/>}{product?.quantity >= 1 ? "In Stock" : "Out of Stock"}</Text>
            <Divider />
            <Text style={{ fontSize: '18px' }}>{product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}</Text>
            <Divider />
            <Text style={{ fontSize: '18px' }}><FaHome style={{ marginRight: '5px' }}/>{product?.category?.name}</Text>
            <Divider />
            <Text style={{ fontSize: '16px' }}>
              {product?.description}
            </Text>
            <Divider />
            <Button onClick={()=> {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success('Added to Cart successfully')
            }} type="primary" size="large">
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Content>
    </div> 
    </Layout>
    <div className="container">
        <div className="row">
        <h2 className='text-center bg-light p-4 my-3'>Related Products</h2>

        <div className='d-flex '>
          {related?.map((p)=> (
            <div className="col-md-4 mb-4">
              <ProductCard2  p={p} key={p._id} />
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
