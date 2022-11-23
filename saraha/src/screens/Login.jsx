import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    //states 
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState({ password: '', email: '' });
    const navigate = useNavigate();

    //login function 
    const handleLogin = async (e) => {
        e.preventDefault();
        let { data } = await axios.post('http://localhost:3003/api/v1/auth/signin', user);

        if (data.message === 'validation error') {
            setError({ password: 'incorrect email or password ', email: 'incorrect email or password ' })
        }
        else if (data.message === 'password incorrect') {
            setError({ password: data.message })
        }
        else {
            //route to home 
            navigate('/');
        }

    };

    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="fas fa-user-secret user-icon" />
                <h4 className="login">Login</h4>
            </div>
            <div className="card p-5 w-50 m-auto">
                <form method="POST" action="/handleLogin">
                    <input className="form-control" placeholder="Enter your email" type="text" name="email"
                        onChange={(email) => {
                            setError({ email: '' })
                            setUser((prevUserValue) => ({ ...prevUserValue, email: email.target.value }))
                        }} />
                    <div className='text-danger'>{error.email}</div>
                    <input className="form-control mt-4 " placeholder="Enter your Password" type="text" name="password"
                        onChange={(password) => {
                            setError({ password: '', email: '' })

                            setUser((prevUserValue) => ({ ...prevUserValue, password: password.target.value }))
                        }} />
                    <div className='text-danger'>{error.password}</div>
                    <button className="btn btn-default-outline my-4 w-100 rounded" onClick={(e) => {
                        handleLogin(e);
                    }} >Login</button>
                    <p><a className="text-muted forgot btn" href>I Forgot My Password</a></p>
                    <Link className="btn btn-default-outline" to="../register">Register</Link>
                </form>
            </div>
        </div>

    )
}
export default Login;
