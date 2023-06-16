import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Jumbotron from "../../Components/Cards/Jumbotron";
import { useAuth } from "../../Context/Auth";
import logo from "../../Assets/Images/Dev_soaib.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login Successfully");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed! Try again later");
    }
  };
  return (
    <div>
      <Jumbotron title="Login Page" subTitle="Welcome to login"></Jumbotron>
      <div className="background">
        <div className="form-wrapper">
          <img src={logo} alt="logo" className="logo" />
          <form onSubmit={submitHandler}>
            <input
              type="email"
              className="form-control mb-4 p-2"
              placeholder="name@example.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="form-control mb-4 p-2"
              placeholder="Type your password"
              id="email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
