import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo300.png';
function Navbar({userdata,logout}) {
    const navigate = useNavigate();
    console.log(userdata);
    return (
        <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/"><img src={logo} width={54} alt="logo" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {!userdata ? <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        </>:""}
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recievedMessages">Messages</Link>
                        </li>
                        {userdata ? <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onClick={logout}>
                                Logout
                            </Link>
                        </li>
                        </>:""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;