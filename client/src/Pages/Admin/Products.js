import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../Components/Cards/Jumbotron";
import AdminMenu from "../../Components/Navs/AdminMenu";
import { useAuth } from "../../Context/Auth";
import useProducts from "../../hooks/useProducts";

function Products() {
  const [auth, setAuth] = useAuth();
  const products = useProducts()
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
            <div className="admin-heading h3">Products</div>
            {products.map((p) => (
              <Link
                to={`/dashboard/admin/product/update/${p.slug}`}
                key={p._id}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        className="img img-fluid rounded-start"
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <small className="muted">
                        <p className="card-text">{moment(p.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
