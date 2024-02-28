import React, { useEffect, useState } from 'react';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import RightSideBar from '../commen/right_side_bar';
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from 'react-router-dom';

function Dashboard() {
    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate('/')
        }
    }, []);
    const navigate = useNavigate();
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    return (
        <>
            <Helmet>
                <title>Admin Panel | DashBoard </title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            {userData && userData != null && userData != undefined && (

                <div className="content-page">
                    <div className="content">
                        <div className="container">

                            <div className="row">
                                <div className="col-sm-12">
                                    <h4 className="page-title">Dashboard</h4>
                                    <p className="text-muted page-title-alt">Hello {userData[0]?.username}! Welcome to Ubold admin panel !</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3 col-sm-6">
                                    <div className="widget-panel widget-style-2 bg-white">
                                        <i className="md md-attach-money text-primary"></i>
                                        <h2 className="m-0 text-dark counter font-600">50568</h2>
                                        <div className="text-muted m-t-5">Total Revenue</div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="widget-panel widget-style-2 bg-white">
                                        <i className="md md-add-shopping-cart text-pink"></i>
                                        <h2 className="m-0 text-dark counter font-600">1256</h2>
                                        <div className="text-muted m-t-5">Sales</div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="widget-panel widget-style-2 bg-white">
                                        <i className="md md-store-mall-directory text-info"></i>
                                        <h2 className="m-0 text-dark counter font-600">18</h2>
                                        <div className="text-muted m-t-5">Stores</div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="widget-panel widget-style-2 bg-white">
                                        <i className="md md-account-child text-custom"></i>
                                        <h2 className="m-0 text-dark counter font-600">8564</h2>
                                        <div className="text-muted m-t-5">Users</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <footer className="footer text-right">
                        2015 © Ubold.
                    </footer>

                </div>
            )}
            <RightSideBar />
        </>
    )
}
export default Dashboard;