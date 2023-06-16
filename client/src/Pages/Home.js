import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard2 from "../Components/Cards/ProductCard2";
import HeroSection from "../Components/Hero/Hero";
import { useAuth } from "../Context/Auth";

function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    loadProduct();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);


  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product-pagination/${page}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/product-count`);
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async() => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/product-pagination/${page}`)
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  return (
    <div>
      {/* <Jumbotron title="Home Page"></Jumbotron> */}
      <HeroSection></HeroSection>
      
      <div className="row mt-3">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 bg-light text-center">New Arrivals</h2>
          <div className="row d-flex justify-content-center ms-3">
            {products?.map((p) => (
              <div className="col-md-6 mb-5" key={p._id}>
                <ProductCard2 p={p}></ProductCard2>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6 ">
          <h2 className="p-3 mt-2 mb-2 bg-light text-center">Best Seller</h2>
          <div className="row d-flex justify-content-center ms-3">
            {sortedBySold.map((p) => (
              <div className="col-md-6 mb-5">
                {<ProductCard2 p={p}></ProductCard2>}
              </div>
            ))}
          </div>
        </div>

        <div className="container text-center p-5">
          {products && products.length < total && (
            <button
              className="btn btn-warning btn-lg col-md-6"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
