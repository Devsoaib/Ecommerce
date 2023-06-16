import React from "react";
import Jumbotron from "../../Components/Cards/Jumbotron";
import AdminMenu from "../../Components/Navs/AdminMenu";
import { useAuth } from "../../Context/Auth";

function AdminDashboard() {
  const [auth, setAuth] = useAuth();
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
          <div className="admin-heading h3">Admins Information</div>
            <h4>{`Name: ${auth?.user.name}`}</h4>
            <h4>{`Email: ${auth?.user.email}`}</h4>
            <h4>{`Address: ${auth?.user.address}`}</h4>
          </div>
        </div>
      </div>
    </div>

  );
}

export default AdminDashboard;
