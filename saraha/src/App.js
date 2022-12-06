import Navbar from "./screens/Navbar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import AllUsers from "./screens/AllUsers";
import Message from "./screens/Message";
import RecievedMessages from "./screens/RecievedMessages";
import {Route, Routes, useNavigate,Navigate} from "react-router-dom";
import User from "./screens/User";
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from "react";
import Forget from "./screens/Forget";

function App() {
  let [loginData,setloginData] = useState(null);
  function logindata(){
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    setloginData(decode); 
   // console.log(loginData);
}
function logout(){
  localStorage.removeItem("token");
  setloginData(null);
  Navigate('/login');
}
useEffect(()=>{
  if(localStorage.getItem('token')){
    logindata();
  }
},[])
  return (
    <div className="App">
      <Navbar userdata = {loginData} logout={logout}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login userdata = {logindata}/>}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/users" element={<AllUsers />}></Route>
        <Route path="/forget" element={<Forget />}></Route>
        <Route path="/recievedMessages" element={<RecievedMessages />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
