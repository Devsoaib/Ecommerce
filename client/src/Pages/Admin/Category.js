import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Jumbotron from "../../Components/Cards/Jumbotron";
import Categoryform from "../../Components/Forms/Categoryform";
import AdminMenu from "../../Components/Navs/AdminMenu";
import { useAuth } from "../../Context/Auth";

function Category() {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateCategory, setUpdateCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`/categories`);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  //handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/category`, { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" is created`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Create category failed. Try again.");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/updatecategory/${selected._id}`, {
        name: updateCategory,
      });
      if (data?.error) {
        toast.error(data.error);
      }else{
        toast.success(`${data.name} is Updated successfully`)
        setSelected(null)
        setUpdateCategory("")
        loadCategories()
        setVisible(false)
      }
    } catch (error) {
      console.log(error);
      toast.error("Category may already exist. Try again.");
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(`/removecategory/${selected._id}`)
      if (data?.error) {
        toast.error(data.error)
      }else{
        toast.success(`deleted successfully`)
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Category may already exist. Try again.");
    }
  };
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
          <div className="admin-heading h3">Create Category</div>

            <Categoryform
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            ></Categoryform>

            <hr />

            <div className="col">
              {categories?.map((c) => (
                <button
                  className="btn btn-outline-primary m-3"
                  key={c._id}
                  onClick={()=> {
                    setVisible(true);
                    setSelected(c);
                    setUpdateCategory(c.name)
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <Modal
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <Categoryform
                value={updateCategory}
                setValue={setUpdateCategory}
                buttonText={"Update"}
                handleDelete={handleDelete}
                handleSubmit={handleUpdate}
              ></Categoryform>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
