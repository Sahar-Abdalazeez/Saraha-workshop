import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
function Forget() {
  let [email, setEmail] = useState({});
  let [userData, setData] = useState({});
  async function resend(e) {
    e.preventDefault();
    let { data } = await axios.patch("http://localhost:3000/api/v1/auth/sendCode", email);
    if (data.message == "Done , plz check your Email To Change Password") {
      document.getElementById("getemail").classList.add('d-none');
      document.getElementById("getdata").classList.replace('d-none', 'd-block');
    }
    // console.log(data);
  }
  function getEmail(e) {
    let ForEmail = { ...email };
    ForEmail[e.target.name] = e.target.value;
    setEmail(ForEmail);
    //console.log(ForEmail);
  }
  async function code(e) {
    e.preventDefault();
    let { data } = await axios.patch("http://localhost:3000/api/v1/auth/forgetpassword", userData);
    if (data.message == "Done") {
      document.getElementById("succAlert").classList.replace('d-none', 'd-block');
      setTimeout(() => {
        document.getElementById("succAlert").classList.replace('d-block', 'd-none');
      }, 8000);
    }
    else if(data.message == "In-valid account or In-valid OTP Code"){
      document.getElementById("dangerAlert").classList.replace('d-none', 'd-block');
      setTimeout(() => {
        document.getElementById("dangerAlert").classList.replace('d-block', 'd-none');
      }, 4000);

    }
    //console.log(data);
  }
  function getData(e) {
    let user = { ...userData };
    user[e.target.name] = e.target.value;
    setData(user);
  }
  return (
    <div className='container'>
      <div id='succAlert' className='alert alert-success mt-3 d-none'>Your information Has been updated successfully you can <Link to = "/login" className={`fw-bold alertColor`}>Login</Link> to your account</div>
      <div id='dangerAlert' className='alert alert-danger mt-3 d-none'>The Code You Entered is incorrect,please try again</div>
      <div id='getemail'>
        <form action="" onSubmit={resend} className='m-auto my-5'>
          <label className='fw-bold' htmlFor="email">Reset your password</label>
          <input type="email" name="email" onChange={getEmail} className='form-control  my-3' id='email' placeholder='example@gmail.com' />
          <button type="submit" className={`form-control w-25 btn-default-outline m-auto`}>Send</button>
        </form>
      </div>
      <div id='getdata' className='d-none'>
        <form action="" onSubmit={code} className='m-auto my-5'>
          <p className='alert alert-success'>{`You have successfully submitted your password reset request. An email has been sent to your email ${email.email} with instructions on how to reset your password.`}</p>
          <label className='fw-bold' htmlFor="email">Email</label>
          <input type="email" name="email" onChange={getData} className='form-control  my-3' id='email' placeholder='example@gmail.com' />
          <label className='fw-bold' htmlFor="pass">Password</label>
          <input type="password" name="password" onChange={getData} className='form-control  my-3' id='pass' placeholder='password' />
          <label className='fw-bold' htmlFor="code">Code</label>
          <input type="text" name="code" onChange={getData} className='form-control  my-3' id='code' placeholder='code' />
          <button type="submit" className={`form-control w-25 btn-default-outline m-auto`}>Send</button>
        </form>
      </div>

    </div>
  )
}

export default Forget