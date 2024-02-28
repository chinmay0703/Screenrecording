import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation, useNavigate } from "react-router-dom";
import './login.css';
import { useForm } from "react-hook-form";
import config from "../baseurl/config";
import ToastComponent from "../Notification/notify";
import axios from 'axios';
const Otpform = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state.email);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const onSubmit = async (formData) => {

    try {
      const response = await axios.post(`${config.apiUrl}/checkotp`, {
        email: email,
        otp: formData.otp,
      });
      if (response.status === 200) {
        toastRef.current.showInfo("You can Update Your Password Now");
        setTimeout(() => {
          navigate('/changepassword', { state: { email } });
        }, 2000);
      } else {
        toastRef.current.showError("Incorrect OTP");
      }
    } catch (error) {
      if (error.response) {
        toastRef.current.showError(`${error.response.data.error}`);
        console.error('Error:', error.response.data.error);
      } else if (error.request) {
        toastRef.current.showError('No response from the server');
        console.error('Error:', error.request);
      } else {
        toastRef.current.showError('An unexpected error occurred');
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
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
        <label><b>OTP</b></label>
      </div>
      <div className="input-field icon-input">
        <FontAwesomeIcon icon={faUser} />
        <input
          type="number"
          placeholder="Enter OTP"
          {...register('otp', {
            required: "This field is required",
          })}
          className={`form-contro ${errors.otp ? 'is-invalid' : ''}`}
        />

      </div>
      {errors.otp && (
        <div className="input-fieldd icon-input">
          <div className="">
            <span className="" style={{ color: 'red' }}>{errors.otp.message}</span>
          </div>
        </div>
      )}
      <div className="button-field">
        <button style={{ backgroundColor: "#007aff", color: 'white' }} className="w-100 justify-content-center btn btn-primary" size='lg' type="submit">
          Verify
        </button>
      </div>
      <ToastComponent ref={toastRef} />
    </form>
  );
};

export default Otpform;



























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