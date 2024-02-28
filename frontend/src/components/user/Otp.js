import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";
import './login.css';

import Otpform from "./Otpform";
import Register from "./Register";



const Otp = () => {

    const [forgotpassform, setForgotpassform] = useState(false);
    const [showsigninform, setShowsigninform] = useState(true);
    const [showotpform, setShowotpform] = useState(false);


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword((prevShowPassword) => !prevShowPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
        }
    };
    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });
        return () => {
            sign_up_btn.removeEventListener("click", () => {
                container.classList.add("sign-up-mode");
            });
            sign_in_btn.removeEventListener("click", () => {
                container.classList.remove("sign-up-mode");
            });
        };
    }, []);

    return (
       
            <div className="backgroundimage">
                <div class="container ">
                    <div class="forms-container">
                        <div class="signin-signup">
                            <Otpform></Otpform>
                            <Register></Register>
                        </div>
                    </div>
                    <div class="panels-container">
                        <div class="panel left-panel">
                            <div class="content">
                                <h3 className="text-white">New to our community ?</h3>
                                <p>
                                    Discover a world of possibilities! Join us and explore a vibrant
                                    community where ideas flourish and connections thrive.
                                </p>
                                <button className="text-white bordered" id="sign-up-btn">
                                    Sign up
                                </button>
                            </div>
                            <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" class="image" alt="" />
                        </div>
                        <div class="panel right-panel">
                            <div class="content">
                                <h3 className="text-white">One of Our Valued Members</h3>
                                <p>
                                    Thank you for being part of our community. Your presence enriches our
                                    shared experiences. Let's continue this journey together!
                                </p>
                                <button class="text-white bordered" id="sign-in-btn">
                                    Sign in
                                </button>
                            </div>
                            <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" class="image" alt="" />
                        </div>
                    </div>
                </div>
            </div>
      
    );
};

export default Otp;

