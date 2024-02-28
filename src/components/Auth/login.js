import React, { useEffect } from "react";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { ApiCall } from '../../services/ApiCall';
import { login } from "../../services/apiHandler";
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login() {
    const cookieData = Cookies.get('ADMIN');
    const [Data, SetData] = useState(cookieData ? JSON.parse(cookieData) : {
        email: '',
        password: '',
    });

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            navigate('/dashboard')
        }
    }, []);
    const navigate = useNavigate();

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required('Please Fill The Email Id Field'),
        password: Yup.string().required('Please Fill The Password Field'),
    });
    const loginForm = useFormik({
        initialValues: {
            email: Data.email,
            password: Data.password,
            isCheck: false,
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit,
    });
    function handleSubmit(values) {
        let request = {
            email: values.email,
            password: values.password
        }
        // set cookieData
        // const expirationDate = new Date();
        // expirationDate.setDate(expirationDate.getDate() + 1);
        // document.cookie = `${"piyush"}=${request}; expires=${expirationDate.toUTCString()}`;

        // set sessionStorage
        // sessionStorage.setItem('userData', JSON.stringify(request));

        login(request).then((response) => {
            if (response.code === 200) {
                swal({
                    title: "success",
                    text: response.message,
                    icon: "success",
                    button: "Login",
                })
                localStorage.setItem('userData', JSON.stringify(response.data));
                if (values.isCheck) {
                    Cookies.set("ADMIN", JSON.stringify(request), { expires: 2 / 24 });
                } else {
                    Cookies.remove('ADMIN');
                }
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
                <title>Admin Panel | Login</title>
            </Helmet>
            <div className="account-pages"></div>
            <div className="clearfix"></div>
            <div className="wrapper-page">
                <div className=" card-box">
                    <div className="panel-heading">
                        <h3 className="text-center"> Sign In to <strong className="text-custom">UBold</strong> </h3>
                    </div>


                    <div className="panel-body">
                        <form className="form-horizontal m-t-20" onSubmit={loginForm.handleSubmit}>

                            <div className="form-group ">
                                <div className="col-xs-12">
                                    <input className="form-control" defaultValue={Data.email} type="email" name="email" required="" placeholder="Email Id" onChange={loginForm.handleChange} />
                                    <span className="error">{loginForm.errors.email}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input className="form-control" type="password" defaultValue={Data.password} name="password" required="" placeholder="Password" onChange={loginForm.handleChange} />
                                    <span className="error">{loginForm.errors.password}</span>
                                </div>
                            </div>

                            <div className="form-group ">
                                <div className="col-xs-12">
                                    <div className="checkbox checkbox-primary">
                                        <input id="checkbox-signup" type="checkbox" name="isCheck" onChange={loginForm.handleChange} />
                                        <label htmlFor="checkbox-signup">
                                            Remember me
                                        </label>
                                    </div>

                                </div>
                            </div>

                            <div className="form-group text-center m-t-40">
                                <div className="col-xs-12">
                                    <button className="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
                                </div>
                            </div>

                            <div className="form-group m-t-30 m-b-0">
                                <div className="col-sm-12">
                                    <a href="page-recoverpw.html" className="text-dark"><i className="fa fa-lock m-r-5"></i> Forgot your password?</a>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p>Don't have an account? <NavLink to="/signup" className="text-primary m-l-5"><b>Sign Up</b></NavLink></p>

                    </div>
                </div>

            </div>
        </>
    );
}

export default Login