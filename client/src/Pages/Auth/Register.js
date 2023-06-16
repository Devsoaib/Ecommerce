import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "../../Assets/Css/register.css";
import logo from "../../Assets/Images/Dev_soaib.png";
import Jumbotron from "../../Components/Cards/Jumbotron";
import { useAuth } from "../../Context/Auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        address,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed! Try again");
    }
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
  };
  return (
    <div>
      <Jumbotron title="Register Page" subTitle="Welcome to Register page" />
      <div className="background">
        <div className="form-wrapper">
          <img src={logo} alt="logo" className="logo" />
          <form onSubmit={submitHandler}>
            <input
              type="text"
              className="input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Type your address"
              className="form-control mb-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
