import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation, useNavigate } from "react-router-dom";
import './login.css';
import { useForm } from "react-hook-form";
import config from "../baseurl/config";
import ToastComponent from "../Notification/notify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const Changepassform = () => {

    const location = useLocation();
    const [email, setEmail] = useState(location.state.email);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toastRef = useRef(null);
    const navigate = useNavigate();
    // const togglePasswordVisibility = () => {
    //     setShowPassword((prevShowPassword) => !prevShowPassword);
    // };

    const handlenewpasswordsubmit = async (formData) => {
        try {
            const response = await axios.post(`${config.apiUrl}/updatepass`, {
                email: email,
                password: formData.password,
            });
            console.log(response);
            console.log(response.message);
            console.log(response.status);
            if (response.status === 200) {
                console.log("kaga")
                toastRef.current.showSuccess("Password Updated Successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                // showError("Failed to update password");
            }

        } catch (error) {
            console.error("Error during password submission:", error);
            // showError("An unexpected error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(handlenewpasswordsubmit)} className="sign-in-form">
            <div className="input-fieldd my-2">
                <h5 className="forgottitle">
                    <Link to="/login" style={{ color: 'gray' }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link> Forgot Password?
                </h5>
            </div>
            <div className="input-fieldd">
                <label><b>Email</b></label>
            </div>
            <div className="input-field icon-input">
                <FontAwesomeIcon icon={faUser} />
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    style={{ fontSize: "15px" }}
                    disabled
                ></input>
            </div>

            <div className="input-fieldd">
                <label><b>Password</b></label>
            </div>
            <div className="input-field icon-input">
                <FontAwesomeIcon
                    icon={faEye}
                    className="password-toggle-icon"
                    
                />
                <input
                    type='password'
                    placeholder="Enter New Password"
                    {...register('password', {
                        required: "This field is required",
                    })}
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
            <div className="button-field">
                <button style={{ backgroundColor: "#007aff", color: 'white' }} className="w-100 justify-content-center btn btn-primary" size='lg' type="submit"
                    >Reset Password
                </button>
            </div>
            <ToastComponent ref={toastRef} />
        </form>
    );
};

export default Changepassform;



























{/* <div className="input-fieldd">
        <label><b>Password</b></label>
      </div>
      <div className="input-field icon-input">
        <FontAwesomeIcon
          icon={faEye}
          className="password-toggle-icon"
        />
        <input
          type='password'
          placeholder="Enter Password"
          {...register('password', {
            required: "This field is required",
          })}
          className={`form-contro ${errors.password ? 'is-invalid' : ''}`}
        />
      </div>
      {errors.password && (
        <div className="input-fieldd icon-input">
          <div className="">
            <span className="" style={{ color: 'red' }}>{errors.password.message}</span>
          </div>
        </div>
      )} */}