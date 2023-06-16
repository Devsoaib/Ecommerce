import { Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../../Components/Cards/Jumbotron";
import AdminMenu from "../../Components/Navs/AdminMenu";
import { useAuth } from "../../Context/Auth";
import useCategory from "../../hooks/useCategory";

function Products() {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("photo", photo)
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("category", category)
      productData.append("shipping", shipping)
      productData.append("quantity", quantity)
      const {data} = await axios.post("/product", productData)
      if (data?.error) {
        toast.error(data.error)
      }else{
        toast.success(`${data.name} is Created`)
        navigate("/dashboard/admin/products")
      }
    } catch (error) {
      console.log(error);
      toast.error("Product create failed. Try again.");
    }
  }

  return (
    <div>
      <Jumbotron
        title={`Hello ${auth.user.name}`}
        subTitle="Admin Dashboard"
      ></Jumbotron>

      <div className="container-fluid mx-5 mt-5 p-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
          <div className="admin-heading h3">Create Product</div>
            <div className="text-center">
              {photo && <img src={URL.createObjectURL(photo)} alt="Product" className="img img-responsive" height= "200"/>}
            </div>
            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "uplaod Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              min="1"
              className="form-control p-2 mb-3"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button type="submit" onClick={handleSubmit} className="btn btn-outline-primary mb-5">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
