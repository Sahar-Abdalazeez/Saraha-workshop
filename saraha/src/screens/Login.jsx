import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";

function Login({ userdata }) {
  //states
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ password: "", email: "" });
  const navigate = useNavigate();
  const navigateForget = useNavigate();
  const [email, setEmail] = useState({});
  //login function
  const handleLogin = async (e) => {
    e.preventDefault();
    let { data } = await axios.post(
      "http://localhost:3000/api/v1/auth/signin",
      user
    );
    console.log(data.message);
    if (data.message === "login") {
      //route to home
      localStorage.setItem("token", data.loginToken);
      userdata();
      navigate("/user");
    } else if (data.message === "validation error") {
      setError({
        password: "incorrect email or password ",
        email: "incorrect email or password ",
      });
    } else if (data.message === "password incorrect") {
      setError({ password: data.message });
    } else if (data.message === "email not exist") {
      setError({ email: data.message });
    } else {
      setError({
        password: "incorrect email or password ",
        email: "incorrect email or password ",
      });
    }
  };
  function forgetPass() {
    navigateForget("/forget");
  }
  // async function resend(e) {
  //   e.preventDefault();
  //   let { data } = await axios.patch(
  //     "http://localhost:3000/api/v1/auth/sendCode",
  //     email
  //   );
  //   if (data.message == "Done , plz check your Email To Change Password") {
  //       display();
  //       setTimeout(() => {
  //           document.getElementById("mes").classList.replace("d-block", "d-none");
  //       }, 5000);
  //   }
  // }
  // function getEmail(e) {
  //   let resendEmail = { ...email };
  //   resendEmail[e.target.name] = e.target.value;
  //   setEmail(resendEmail);
  //   console.log(resendEmail);
  // }
  // function display() {
  //   let mes = document.getElementById("mes");
  //   mes.classList.replace("d-none", "d-block");
  //   document.getElementById("email").value = "";
  //   document.getElementById("email").placeholder = "Enter Your Email";
  // }
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin">
          <input
            className="form-control"
            placeholder="Enter your email"
            type="text"
            name="email"
            onChange={(email) => {
              setError({ email: "" });
              setUser((prevUserValue) => ({
                ...prevUserValue,
                email: email.target.value,
              }));
            }}
          />
          <div className="text-danger">{error.email}</div>
          <input
            className="form-control mt-4 "
            placeholder="Enter your Password"
            type="password"
            name="password"
            onChange={(password) => {
              setError({ password: "", email: "" });

              setUser((prevUserValue) => ({
                ...prevUserValue,
                password: password.target.value,
              }));
            }}
          />
          <div className="text-danger">{error.password}</div>
          <button
            type="submit"
            className="btn btn-default-outline my-4 w-100 rounded"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </button>
          <p>
            <a className="text-muted forgot btn" onClick={forgetPass}>
              I Forgot My Password
            </a>
          </p>
          <Link className="btn btn-default-outline" to="../register">
            Register
          </Link>
        </form>
      </div>
      {/* <div
        id="mes"
        className={`alert bg-custom w-50 my-4 m-auto text-white d-none`}
      >
       please check your Email To see the code
      </div>
      <form onSubmit={resend} className="w-50 m-auto my-3">
        <p>You haven't confirmed your email yet ?</p>
        <input
          type="text"
          onChange={getEmail}
          className="form-control w-75 m-auto"
          name="email"
          id="email"
          placeholder="Enter Your email"
        />
        <button
          type="submit"
          className="btn btn-default-outline my-3 w-50 rounded"
        >
          Resend Code
        </button>
      </form> */}
    </div>
  );
}
export default Login;
