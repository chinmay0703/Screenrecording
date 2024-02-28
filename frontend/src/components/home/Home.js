import React, { useEffect, useState, useContext } from 'react';
import RecordContext from '../../context/RecordContext/RecordContext';
import Navbar from '../../routes/Navbar';
import "./home.css";
import { useNavigate } from 'react-router-dom';
import SigninContext from '../../context/LoggedInStateContext/SigninContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";

function Home() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const toggle = () => setModal(!modal);
    const [modal, setModal] = useState(false);

    const onSubmit = (data) => {
        console.log(data.email);
        toggle();
    };

    const [recordedVideo, setRecordedVideo] = useState(null);
    const { isNewVideoRecored, setVideoCreated, resetVideoCreated } = useContext(RecordContext);
    const { isLoggedin, signIn, signOut } = useContext(SigninContext);

    const navigate = useNavigate();

    let stream;
    let mediaRecorder;

    useEffect(() => {
        console.log(isNewVideoRecored);
    }, [isNewVideoRecored, setVideoCreated, resetVideoCreated])

    const start = async () => {
        if (!isLoggedin) {
            navigate("/login")
            return
        }
        try {

            stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    mediaSource: 'screen',
                },
                audio: true,
            });

            const data = [];

            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                data.push(e.data);
            };

            mediaRecorder.start();
            mediaRecorder.onstop = (e) => {
                const blob = new Blob(data, {
                    type: data[0].type,
                });
                setRecordedVideo(URL.createObjectURL(blob));
                setVideoCreated();
            };
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const handleDownload = () => {
        if (recordedVideo) {
            const a = document.createElement('a');
            a.href = recordedVideo;
            a.download = 'recorded-video.webm';
            a.click();
            setRecordedVideo(null);
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className=''>
                {recordedVideo && isNewVideoRecored ? (
                    <div>
                        <div>
                            <Modal isOpen={modal} toggle={toggle} >
                                <ModalHeader toggle={toggle}>Invite your friends join StreamBlend.</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <input
                                            style={{ fontSize: "15px" }}
                                            type="email"
                                            placeholder="Enter an email"
                                            {...register('email', {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address",
                                                },
                                            })}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <div className="input-fieldd icon-input">
                                            <span className="" style={{ color: 'red' }}>{errors.email.message}</span>
                                        </div>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleSubmit(onSubmit)}>
                                        Invite
                                    </Button>
                                    <Button color="secondary" onClick={toggle}>
                                        Cancel
                                    </Button>
                                </ModalFooter>

                            </Modal>

                            <nav class="back p-3 ">
                                <div class="container-fluid">
                                    <button className='btn buttonshare' title="Share" onClick={toggle}>
                                        <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> share
                                    </button>
                                    <button className='btn buttonshare mx-3' onClick={handleDownload} title="Share" >
                                        <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
                                    </button>
                                </div>

                            </nav>
                        </div>
                        <div className='container-fluid back '>
                            <div className=' d-flex justify-content-center align-items-cente'>
                                <video className='my-5 img-fluid' width="80%" height="auto" controls>
                                    <source src={recordedVideo} type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </div>
                ) : (

                    <div className='container-fluid back  row justify-content-center align-items-center'>

                        <div className='col-lg-5 col-md-12 col-sm-12 text-center my-5'>
                            <h1 className='display-4'>Free Online Screen Recorder</h1>
                            <p className='lead'>Record your screen, webcam, and voice with one click</p>
                            <button onClick={start} className='buttonclass' style={{ borderRadius: '70px' }}>Record Now</button>
                        </div>
                        <div className='col-lg-7 col-md-12 col-sm-12 text-center my-5'>
                            <img
                                src='https://static.flexclip.com/next_webview/_next/static/media/screenRecorderBanner.437bd8e7.png'
                                className='img-fluid'
                                alt='Screener'
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='container-fluid  '>
                <div className='row justify-content-center text-center align-items-center'>
                    <h2 className='my-5' style={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', fontSize: '2rem' }}>
                        Why Choose StreamBlend Screen Recorder
                    </h2>

                </div>
                <div className='row justify-content-center text-center align-items-center'>
                    <div className='col-md-3 mb-3 '>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-header'>
                                    <p>Web-based Screen Recorder</p>
                                </div>
                                <img style={{ width: '150px' }} src="https://agustasoftware.com/wp-content/uploads/2021/10/website.png" className='card-img-top' alt="Card 1" />
                            </div>
                            <div className='card-footer'>
                                <small className='text-muted'>Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-header'>
                                    <p>Security Guaranteed</p>
                                </div>
                                <img style={{ width: '150px', height: '150px' }} src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRwhsDY0vcuxrhTe86cp8cx9-YyTfvbp_BJcQ5d6-v253KuUCk6" className='card-img-top' alt="Card 1" />
                            </div>
                            <div className='card-footer'>
                                <small className='text-muted'>Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-header'>
                                    <p>Free to Use</p>
                                </div>
                                <img style={{ width: '150px', height: '150px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCPg_GNiLglYQFWK7Mu115FgGu4Lu7KghMkreYRsFyPaqHmtD" className='card-img-top' alt="Card 1" />
                            </div>
                            <div className='card-footer'>
                                <small className='text-muted'>Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
