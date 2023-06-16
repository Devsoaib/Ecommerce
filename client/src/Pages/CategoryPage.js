import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "../Components/Cards/Jumbotron";
// import ProductCard from "../Components/Cards/ProductCard";
import ProductCard2 from "../Components/Cards/ProductCard2";
import useCategory from "../hooks/useCategory";

function CategoryPage() {
  const categories = useCategory();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [apiHit, setApiHit] = useState(false); 


  useEffect(() => {
    loadProducts();
  }, [params.categoryId]); 

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/my-category/${params.categoryId}`);
      setProducts(data);
      setApiHit(!apiHit); // update state variable to trigger rerender
// update state variable to track API call
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Jumbotron title="Category Page" subTitle="Welcome to React E-commerce" />
      <div className="container">
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="p-3 mt-2 mb-0 h4 bg-light">
              {products?.length} Products
            </h2>
          </div>
          {
            products?.length ? (
              <div className="row">
                {products.map((p) => (
                  <div className="col-md-4 mb-4" key={p._id}>
                    <ProductCard2 p={p}></ProductCard2>
                  </div>
                ))}
              </div>
            ) : (
              <h1>No product Found</h1>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
