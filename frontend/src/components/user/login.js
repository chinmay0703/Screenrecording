import React, { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import config from "../baseurl/config";
import ToastComponent from "../Notification/notify";
import SigninContext from "../../context/LoggedInStateContext/SigninContext";

const Login = () => {
    
    const { signIn } = useContext(SigninContext);
    const toastRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleButtonClick = async (formData) => {
        console.log(formData.email);
        console.log(formData.password);
        const token = localStorage.getItem('Token');
        if (token) {
            toastRef.current.showError("Already Logged in");
            return;
        }
        try {
            const response = await axios.post(`${config.apiUrl}/auntheticatelogin`, {
                email: formData.email,
                password: formData.password,
            });
            console.log('Response:', response.data.token);
            localStorage.setItem("Token", response.data.token);
            if (response) {
                toastRef.current.showSuccess("Logged in successfully");
                setTimeout(function () {
                    navigate("/");
                }, 1000);
            } else {
                toastRef.current.showError("Incorrect Credentials");
            }
        } catch (error) {
            toastRef.current.showError("Please Enter valid credentials");
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleButtonClick)} className="sign-in-form">
                <div className="input-fieldd my-2">
                    <h2 className="titlse">Sign in</h2>
                    <p>Sign In To StreamBlend user panel</p>
                </div>
                <div className="input-fieldd">
                    <label><b>Email</b></label>
                </div>
                <div className="input-field icon-input">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        style={{ fontSize: "15px" }}
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: "This field is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className={`form-contrl ${errors.email ? 'is-invalid' : ''}`}
                    />
                </div>
                {errors.email && (
                    <div className="input-fieldd icon-input">
                        <span className="" style={{ color: 'red' }}>{errors.email.message}</span>
                    </div>
                )}
                <div className="input-fieldd">
                    <label><b>Password</b></label>
                </div>
                <div className="input-field icon-input">
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                    />
                    <input
                        style={{ fontSize: "15px" }}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        {...register('password', { required: "This field is required" })}
                        className={`form-contro ${errors.password ? 'is-invalid' : ''}`}
                    />
                </div>
                {errors.password && (
                    <div className="input-fieldd icon-input">
                        <div className="">
                            <span className="" style={{ color: 'red' }}>{errors.password.message}</span>
                        </div>
                    </div>
                )}
                <div className="input-fieldd">
                    <p className="forgot-password-link">
                        <Link to="/forgot" style={{ color: "#007aff" }}>Forgot Password?</Link>
                    </p>
                </div>
                <div className="signinbutton my-2">
                    <button
                        style={{ backgroundColor: "#007aff", color: 'white' }}
                        type="submit"
                        className="w-100 d-flex justify-content-center align-items-center btn btn-primary"
                        size='lg'
                    >
                        Submit
                    </button>
                </div>
                <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </form>
            <ToastComponent ref={toastRef} />
        </>
    );
};

export default Login;
