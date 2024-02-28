import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useForm } from "react-hook-form";
import ToastComponent from "../Notification/notify";
import config from "../baseurl/config";
import axios from 'axios';

const Forgotform = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const toastRef = useRef(null);
    const navigate = useNavigate();

    const handleButtonClick = async (formData) => {

        var token = localStorage.getItem('Token');
        
        if (token) {
            toastRef.current.showError("You are already Logged In");
            return;
        } else {
            try {
                const response = await axios.post(`${config.apiUrl}/validateemail`, {
                    email: formData.email,
                });

                if (response.status === 200) {
                    toastRef.current.showInfo("Check Your Email for OTP!!");
                    const email = formData.email;
                    setTimeout(() => {
                        navigate('/otp', { state: { email } });
                    }, 2000);
                } else if (response.status === 400) {
                    toastRef.current.showError("Email not found");
                } else {
                    toastRef.current.showError("Email not found");
                }
            } catch (error) {
                toastRef.current.showError("Email not found");
                console.error('Error:', error);
            }

        }
    };

    return (
        <form onSubmit={handleSubmit(handleButtonClick)} className="sign-in-form">
            <div className="input-fieldd my-2">
                <h5 className="forgottitle">
                    <Link to="/login" style={{ color: "gray" }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link> Back to Login
                </h5>
            </div>
            <div className="input-fieldd my-1">
                <label><b>Email</b></label>
            </div>
            <div className="input-field icon-input">
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="email"
                    placeholder="Enter your email"
                    style={{fontSize:'15px'}}
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
                    <div className="">
                        <span className="" style={{ color: 'red' }}>{errors.email.message}</span>
                    </div>
                </div>
            )}
            <div className="button-field">
                <button
                    type="submit"
                    style={{ backgroundColor: "#007aff", color: "white" }}
                    className="w-100 justify-content-center btn btn-primary"
                    size="lg"
                >
                    Send OTP
                </button>
            </div>
            <ToastComponent ref={toastRef} />
        </form>
    );
};

export default Forgotform;
