import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { ApiCall } from '../../services/ApiCall';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Signup() {
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            navigate('/dashboard')
        }
    }, []);
    const navigate = useNavigate();

    const signupSchema = Yup.object({
        username: Yup.string().required('Please Fill The User Name Field'),
        email: Yup.string().email("Invalid email format").required("Please Fill The Email Id Field"),
        password: Yup.string().required('Please Fill The Password Field'),
        mobile: Yup.string().required('Please Fill The Mobile Number Field').matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
        gender: Yup.string().required('Please Select your Gender'),
        age: Yup.string().required('Please Select your Age'),
    });

    const [selectedGender, setSelectedGender] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const handleSelectChange = (event) => {
        signupForm.setFieldValue('gender', event.target.value)
        setSelectedGender(event.target.value);
    };
    const handleAgeChange = (event) => {
        signupForm.setFieldValue('age', event.target.value)
        setSelectedGender(event.target.value);
    };

    const signupForm = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            mobile: '',
            gender: '',
            age: '',
            isCheck: false,
        },
        validationSchema: signupSchema,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        if (values.age == "yes") {
            values.age = "minor"
        } else {
            values.age = "adult"
        }
        let request = {
            "username": values.username,
            "email": values.email,
            "password": values.password,
            "mobile": values.mobile,
            "gender": values.gender,
            "age": values.age
        }
        ApiCall(request, "post", "auth/signup").then((response) => {
            console.log(response);
            if (response.code === 200) {
                swal({
                    title: "success",
                    text: response.message,
                    icon: "success",
                    button: "Login",
                })
                console.log(response.data);
                localStorage.setItem('userData', JSON.stringify(response.data));
                navigate('/dashboard');
            } else {
                swal({
                    title: response.message,
                    text: " Login failed!",
                    icon: "error"
                });
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    return (
        <>
            <Helmet>
                <title>Admin Panel | Signup </title>
            </Helmet>
            <div className="account-pages"></div>
            <div className="clearfix"></div>
            <div className="wrapper-page">
                <div className=" card-box">
                    <div className="panel-heading">
                        <h3 className="text-center"> Sign Up to <strong className="text-custom">UBold</strong> </h3>
                    </div>

                    <div className="panel-body">
                        <form className="form-horizontal m-t-20" onSubmit={signupForm.handleSubmit}>

                            <div className="form-group ">
                                <div className="col-xs-12">
                                    <input className="form-control" type="text" name='username' required="" placeholder="Username" onChange={signupForm.handleChange} />
                                    <span className="error">{signupForm.errors.username}</span>
                                </div>
                            </div>

                            <div className="form-group ">
                                <div className="col-xs-12">
                                    <input className="form-control" type="email" name='email' required="" placeholder="Email" onChange={signupForm.handleChange} />
                                    <span className="error">{signupForm.errors.email}</span>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input className="form-control" type="password" name='password' required="" placeholder="Password" onChange={signupForm.handleChange} />
                                    <span className="error">{signupForm.errors.password}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input className="form-control" type="number" name='mobile' required="" placeholder="Mobile Number" onChange={signupForm.handleChange} />
                                    <span className="error">{signupForm.errors.mobile}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <select className="form-select form-control" value={selectedGender} aria-label="gender" name='gender' onChange={handleSelectChange}>
                                        <option value="" disabled>select gender</option>
                                        <option >Male</option>
                                        <option >Female</option>
                                        <option >Other</option>
                                    </select>
                                    <span className="error">{signupForm.errors.gender}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <label>ARE YOU 18+?</label><br />
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '5px' }}>
                                            <input type="radio" id='yes' name="age" value="yes" onChange={handleAgeChange} />
                                            <label htmlFor="yes">YES</label>
                                        </div>
                                        <div>
                                            <input type="radio" id='no' name="age" value="no" onChange={handleAgeChange} />
                                            <label htmlFor="no">NO</label>
                                        </div>
                                    </div>
                                </div>
                                <span className="error">{signupForm.errors.age}</span>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <div className="checkbox checkbox-primary">
                                        <input id="checkbox-signup" type="checkbox" name='isCheck' onChange={signupForm.handleChange} />
                                        <label htmlFor="checkbox-signup">I accept <a href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group text-center m-t-40">
                                <div className="col-xs-12">
                                    <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit" >
                                        Register
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div >

                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p>
                            Already have account?<NavLink to="/" className="text-primary m-l-5"><b>Sign In</b></NavLink>
                        </p>
                    </div>
                </div>

            </div >

        </>
    );
}
export default Signup;
