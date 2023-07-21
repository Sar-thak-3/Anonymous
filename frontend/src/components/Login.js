import React from 'react'
import { useState } from 'react'
import {Link, useHistory} from "react-router-dom"

const Login = () => {
    const [credentials,setCredentials] = useState({username: "",password: ""});
    const [alert,setAlert] = useState("hidden");
    let history = useHistory();

    const handleAlert = (e)=>{
        setAlert("visible");
    }

    const handleClose = (e)=>{
        setAlert("hidden");
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("https://anonymous-4g42.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: credentials.username,password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history.push("/")
        }
        else{
            handleAlert();
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

  return (
    <>
            <div className='d-flex justify-content-center container'>
                <Link className="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt='logo' />
                </Link>
            </div>
            <div className='d-flex justify-content-center container'>
                <div className="signup__container">
                    <div className="container__child signup__form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input className="form-control" type="text" name="username" id="username" placeholder="james.bond" value={credentials.username} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" name="password" id="password" placeholder="********" value={credentials.password} onChange={onChange} required />
                            </div>
                            <div className="m-t-lg" >
                                <ul className="list-inline">
                                    <li>
                                        <input className="btn btn--form" type="submit" value="Login" />
                                    </li>
                                    <li>
                                        <Link className="signup__link" to="/signup">Not a member</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{width: "21vw",visibility: alert}} >
                                <strong>Invalid Credentials!</strong>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Login