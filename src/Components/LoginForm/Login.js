import React, { useState } from "react";
import "./Login.css"
import avtar from "./avatar.png"
import { useNavigate, Link } from "react-router-dom"
const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            //saving the auth token and redirect
            // console.log(json.authtoken)
            localStorage.setItem('token', json.auth_data);
            console.log(localStorage.getItem('token'));
            props.showAlert("Successfully Logged-in", "success");
            navigate("/");

        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div style={{ paddingTop: "70px" }}></div>
            <div className="login-container">
                <form className="login-form" onSubmit={handleClick}>
                    <img className="login-image" src={avtar} alt="" />
                    <h1 style={{ marginTop: 10, color: "white" }}>Log-in</h1>
                    <input type="email" name="email" placeholder="Enter Email" required value={credentials.email} onChange={onChange} />
                    <input type="password" name="password" placeholder="Enter Password" required minLength="5" value={credentials.password} onChange={onChange} />
                    <button style={{ marginTop: "20px" }}>Login</button>
                    <p>Not Registered ? <Link to="/signup" style={{ textDecoration: "none", color: "black" }}><b>Create an Account.</b></Link></p>
                </form>
            </div>
        </>
    );
}
export default Login;