import React, { useState } from "react";
import avtar from "../LoginForm/avatar.png"
import { useNavigate } from "react-router-dom"
const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        //destructuring 
        const { name, email, password } = credentials;
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            //saving the auth token and redirect
            localStorage.setItem('token', json.auth_data); // setting authtoken in localStorage to get access from anywhere
            navigate("/");
            props.showAlert("Congrats , Account Created Successfully", "success");

        }
        else {
            props.showAlert("Check your details again", "danger");

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
                    <h1 style={{ marginTop: 10, color: "white" }}>Sign-up</h1>
                    <input type="text" name="name" placeholder="Enter Name" required minLength="3" onChange={onChange} />
                    <input type="email" name="email" placeholder="Enter Email" required onChange={onChange} />
                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
                        <input type="password" style={{ width: "48%" }} onChange={onChange} name="password" placeholder="Enter Password" required minLength="5" />
                        <input type="password" style={{ width: "48%" }} onChange={onChange} name="cpassword" placeholder="Confirm Password" required minLength="5" />
                    </div>
                    <button style={{ marginTop: "20px", marginBottom: "20px" }}>Signup</button>
                </form>
            </div>
        </>
    );
}

export default Signup
