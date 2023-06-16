import { Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../Components/Cards/Jumbotron";
import ProductCard2 from "../Components/Cards/ProductCard2";
import useCategory from "../hooks/useCategory";
import { prices } from "../prices";

function Shop() {
  const categories = useCategory();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/allproducts`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecked = (value, id) => {
    console.log(value, id);
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }

    setChecked(all);
  };
  return (
    <>
      <Jumbotron title="Shop Page" subTitle="Welcome to React E-commerce" />

      <div className="container-fluid px-5">
        <div className="row">
          <div className="col-md-3">
            <h4 className="my-4">Filter</h4>
            <div className="card bg-light mb-4">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">
                  Filter by Categories
                </h5>

                <div className="form-check">
                  {categories.map((c) => (
                    <div key={c._id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={c._id}
                        id={c._id}
                        onChange={(e) => handleChecked(e.target.checked, c._id)}
                      />
                      <label className="form-check-label" htmlFor={c._id}>
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-light mb-4">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Filter by Price</h5>

                <Radio.Group
                  onChange={(e) => {
                    setRadio(e.target.value);
                  }}
                >
                  {prices?.map((p) => (
                    <div key={p._id} style={{ marginLeft: "8px" }}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn btn-outline-danger btn-block mb-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="p-3 mt-2 mb-0 h4 bg-light">
                {products?.length} Products
              </h2>
            </div>

            <div className="row">
              {products.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <ProductCard2 p={p}></ProductCard2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
