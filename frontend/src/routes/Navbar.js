import React, { useContext, useEffect, useState } from 'react'
import RecordContext from '../context/RecordContext/RecordContext.js';
import { Link, useNavigate } from 'react-router-dom';
import config from '../components/baseurl/config.js';
import axios from 'axios';
import SigninContext from '../context/LoggedInStateContext/SigninContext.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSave, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'reactstrap';
import { useForm } from "react-hook-form";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Navbar() {

    const { isNewVideoRecored, setVideoCreated, resetVideoCreated } = useContext(RecordContext);
    const { isLoggedin, signIn, signOut } = useContext(SigninContext);
    const [token, setToken] = useState('')
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const togglee = () => setDropdownOpen(prevState => !prevState);

    const handlelogout = (e) => {
        localStorage.removeItem('Token');
        signOut();
    };

    const handlevideorecorded = () => {
        resetVideoCreated();
    }


    useEffect(() => {
        const tokenpresent = localStorage.getItem('Token');
        if (tokenpresent) {
            signIn();
        }
    }, [isLoggedin])

    useEffect(() => {
        console.log(isNewVideoRecored);
    }, [isNewVideoRecored, isLoggedin])


    return (
        <div>
            <div>
               
            </div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary p-3">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">StreamBlend</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        {isNewVideoRecored && (
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item my-1">
                                    <a class="nav-link" href="#" onClick={handlevideorecorded}>Record</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className='justify-content-end'>
                        {isLoggedin ? (
                            <div className='text-end'>
                                <Link to="/">
                                    <button className='btn logoutbutton' onClick={handlelogout} style={{ borderRadius: '50px', borderColor: 'black' }}>Log Out</button>
                                </Link>
                            </div>
                        ) : (
                            <div className='text-end'>
                                <Link to="/login">
                                    <button className='btn loginsignupbutton' style={{ borderRadius: '50px', borderColor: 'black' }}>Login / Sign Up</button>
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar