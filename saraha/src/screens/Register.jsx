import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Register() {
    let [user,setUser] = useState({
        userName: '',
        email: '',
        password: '',
        cpassword: '',
    });
    function home(){
        let path = '/home';
        Navigate(path);
    }
    let preventForm = async (e)=>{
        e.preventDefault();
        let {data} = await axios.post("http://localhost:3003/api/v1/auth/signup",user);
        //console.log(data);
        // if(data.message == 'done'){
        //     home();
        // }
    }
    let getFormdata = (e)=>{
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }
    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="far fa-edit user-icon" />
                <h4 className="login">Register</h4>
            </div>
            <div className="card p-5 w-50 m-auto">
                <form onSubmit={preventForm}>
                    <input className="form-control" onChange={getFormdata} placeholder="Enter your Name" type="text" name="userName" required/>
                    <input className="form-control my-2 " onChange={getFormdata} placeholder="Enter your email" type="email" name="email" required/>
                    <input className="form-control  " onChange={getFormdata} placeholder="Enter your Password" type="password" name="password" required/>
                    <input className="form-control  my-2" onChange={getFormdata} placeholder="Password Confirmation" type="password" name="cpassword" required/>
                    <button type="submit" className="btn btn-default-outline my-4 w-100 rounded">Register</button>
                </form>
            </div>
        </div>


    )
}
export default Register;