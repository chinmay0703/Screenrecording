import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import config from "../baseurl/config";
import ToastComponent from "../Notification/notify";
const Register = () => {

    const toastRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword((prevShowPassword) => !prevShowPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
        }
    };

    const handleButtonClick = async (formData) => {
        console.log(formData.email);
        console.log(formData.password);
        console.log(formData.name);
        console.log(formData.confirmPassword);

        if (formData.password !== formData.confirmPassword) {
            toastRef.current.showError("Password doesn't match");
            return;
        }

        var token = localStorage.getItem('Token');
        if (token) {
            toastRef.current.showError("Unable to Sign Up: You are currently logged in. Please log out before creating a new account.");
            return;
        }

        if (formData.password === formData.confirmPassword) {
            const formdata = {
                password: formData.password,
                name: formData.name,
                email: formData.email,
            };
            try {
                console.log(formdata.password, formdata.name, formdata.email);
                const response = await axios.post(`${config.apiUrl}/postdata`, formdata);
                console.log(response.data);
                toastRef.current.showSuccess("Account created successfully!");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } catch (error) {
                if (error.response) {
                    toastRef.current.showError(`${error.response.data.error}`);
                } else if (error.request) {
                    toastRef.current.showError('No response received');
                } else {
                    toastRef.current.showError(error.message);
                }
            }
        }
        else{
            toastRef.current.showError("Password doesn't match");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleButtonClick)} class="sign-up-form">
                <div class="input-fieldd my-2 ">
                    <h2 class="titled">Sign up</h2>
                    <p>Please register here for StreamBlend </p>
                </div>
                <div className="input-fieldd">
                    <label><b>Name</b></label>
                </div>
                <div className="input-field icon-input">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        type="text"
                        style={{ fontSize: "15px" }}
                        placeholder="Enter your fullname"
                        {...register('name', {
                            required: "This field is required",
                        })}
                        className={` ${errors.name ? 'is-invalid' : ''}`}
                    />
                </div>
                {errors.name && (
                    <div className="input-fieldd icon-input">
                        <div className="">
                            <span className="" style={{ color: 'red' }}>{errors.name.message}</span>
                        </div>
                    </div>
                )}

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
                        onClick={() => togglePasswordVisibility('password')}
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
                    <label><b>Confirm Password</b></label>
                </div>

                <div className="input-field icon-input">
                    <FontAwesomeIcon
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        className="password-toggle-icon"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                    />
                    <input
                        style={{ fontSize: "15px" }}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Reenter a Password"
                        {...register('confirmPassword', { required: "This field is required" })}
                        className={`form-contro ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                </div>
                {errors.confirmPassword && (
                    <div className="input-fieldd icon-input">
                        <div className="">
                            <span className="" style={{ color: 'red' }}>{errors.confirmPassword.message}</span>
                        </div>
                    </div>
                )}


                <div className="signinbutton my-2">
                    <button style={{ backgroundColor: "#007aff", color: 'white' }} className="w-100 d-flex justify-content-center align-items-center btn btn-primary" size='lg'>
                        Submit
                    </button>
                </div>
                <p class="social-text">Or Sign up with social platforms</p>
                <div class="social-media">
                    <a href="#" class="social-icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" class="social-icon">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" class="social-icon">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="#" class="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <ToastComponent ref={toastRef} />
            </form>
        </>

    );
};

export default Register;
