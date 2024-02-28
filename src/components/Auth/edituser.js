import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateUserData } from "../../services/apiHandler";
import swal from 'sweetalert';
import { uploadProfileImage } from "../../services/apiHandler";
import { getuserdata } from "../../services/apiHandler";
function EditUser(props) {

    const navigate = useNavigate();
    // const useParams = useParams();
    const { userId } = useParams();
    let location = useLocation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [userdata, setUserData] = useState("");
    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate('/')
        }
        // if (userdata == null || userdata == undefined) {
        //     navigate('/dashboard')

        //     // console.log("userData", userdata);
        // }
    }, []);

    useEffect(() => {
        let request = {
            user_id: userId
        }
        getuserdata(request).then((response) => {
            if (response.code === 200) {
                setUserData(response.data[0]);

            } else {
                setUserData([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        if (userdata) {
            reset(
                {
                    userName: userdata?.username,
                    email: userdata?.email,
                    mobile: userdata?.mobile,
                    gender: userdata?.gender,
                    age: userdata?.age == "adult" ? "yes" : "no",
                }
            );
        }
    }, [userdata]);

    const formSubmit = async data => {

        let request = {
            "user_id": userdata?.id,
            "username": data.userName,
            "email": data.email,
            "mobile": data.mobile,
            "gender": data.gender,
            "age": data?.age == "yes" ? "adult" : "minor"
            // "profile_image": response?.data?.profile_image
        }
        if (data.profile_image.length > 0) {
            const formData = new FormData();
            formData.append('profile_img', data.profile_image[0]);
            formData.append('profile_img', data.profile_image[0].name);
            await uploadProfileImage(formData).then((response) => {
                if (response.code === 200) {
                    request.profile_image = response?.data?.profile_image;

                } else {
                    swal({
                        title: response.message,
                        text: " Update failed!",
                        icon: "error"
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        await updateUserData(request).then((response) => {

            if (response.code === 200) {
                navigate('/user-list')
            } else {
                swal({
                    title: response.message,
                    text: " Update failed!",
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
                <title>Admin Panel | Edit User </title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            <div className="content-page">
                <div className="content">
                    <div className="container">

                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">User Form</h4>
                                <ol className="breadcrumb">
                                    <li><a href="#">Ubold</a></li>
                                    <li><a href="#">Forms</a></li>
                                    <li className="active">User Form </li>
                                </ol>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-1" />
                            <div className="col-lg-10">
                                <div className="card-box">
                                    <h4 className="m-t-0 header-title"><b>User Form</b></h4>
                                    <p className="text-muted font-13 m-b-30">
                                        Your awesome text goes here.
                                    </p>
                                    <form method="post" onSubmit={handleSubmit(formSubmit)}>
                                        <div className="form-group">
                                            <label >User Name*</label>
                                            <input key="element" type="file" name="profile_image" className="form-control" id="profile_image" {...register("profile_image")} />
                                            {errors.profile_image && <small className="error">{errors.profile_image.message}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label >User Name*</label>
                                            <input key="element1" type="text" name="userName" parsley-trigger="change" placeholder="Enter user name" className="form-control" id="userName" {...register("userName", { required: 'Please enter User Name' })} />
                                            {errors.userName && <small className="error">{errors.userName.message}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label >Email address*</label>
                                            <input key="element2" type="email" name="email" parsley-trigger="change" placeholder="Enter email Id" className="form-control" id="emailAddress" {...register("email", { required: 'Please enter Email Id' })} />
                                            {errors.email && <small className="error">{errors.email.message}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label >Mobile Number*</label>
                                            <input key="element3" type="number" name="mobile" parsley-trigger="change" placeholder="Enter Mobile Number" className="form-control" {...register("mobile", { required: 'Please enter Mobile Number' })} />
                                            {errors?.mobile && <small className="error">{errors?.mobile?.message}</small>}
                                        </div>
                                        <div className="form-group">
                                            <select className="form-select form-control" aria-label="gender" name='gender' {...register("gender", { required: 'Please select Gender' })}>
                                                <option value="" disabled>select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors?.gender && <small className="error">{errors?.gender?.message}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>ARE YOU 18+?</label><br />
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ marginRight: '5px' }}>
                                                    <input type="radio" id='yes' name="age" value="yes" {...register("age", { required: 'Please select Age' })} />
                                                    <label htmlFor="yes">YES</label>
                                                </div>
                                                <div>
                                                    <input type="radio" id='no' name="age" value="no" {...register("age", { required: 'Please select Age' })} />
                                                    <label htmlFor="no">NO</label>
                                                </div>
                                            </div>
                                            {errors?.age && <small className="error">{errors?.age?.message}</small>}
                                        </div>
                                        <div className="form-group text-right m-b-0" style={{ display: "flex", justifyContent: 'center' }}>
                                            <button className="btn btn-primary waves-effect waves-light" type="submit">
                                                Submit
                                            </button>
                                            <button type="reset" className="btn btn-default waves-effect waves-light m-l-5">
                                                Reset
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <footer className="footer">
                    2015 © Ubold.
                </footer>

            </div>
        </>
    )
}

export default EditUser;