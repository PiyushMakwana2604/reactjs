import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
    const [is_toggle, setIs_toggle] = useState(false);
    const localStorageData = localStorage.getItem('userData')
    const [profile_image, setProfileImage] = useState(localStorageData ? JSON.parse(localStorageData)[0]?.profile_image : {
        profile_image: ''
    });
    const data = useSelector((state) => {
        return state.todo;
    })
    const btnClick = () => {
        setIs_toggle(!is_toggle)
        const wrapperElement = document.getElementById('wrapper');

        // Check the value of is_toggle and add/remove the 'hello' class accordingly
        if (is_toggle) {
            wrapperElement.classList.remove('enlarged'); // Remove the class if is_toggle is true
        } else {
            wrapperElement.classList.add('enlarged');
        }
    }
    return (
        <>
            <div className="topbar">

                <div className="topbar-left">
                    <div className="text-center">
                        <a href="index.html" className="logo"><i className="icon-magnet icon-c-logo"></i><span>Ub<i
                            className="md md-album"></i>ld</span></a>
                    </div>
                </div>

                <div className="navbar navbar-default" role="navigation">
                    <div className="container">
                        <div className="">
                            {/* -------------------button */}
                            <div className="pull-left">
                                <button className="button-menu-mobile open-left" onClick={() => { btnClick() }}>
                                    <i className="ion-navicon"></i>
                                </button>
                                <span className="clearfix"></span>
                            </div>

                            <form role="search" className="navbar-left app-search pull-left hidden-xs">
                                <input type="text" placeholder="Search..." className="form-control" />
                                <a><i className="fa fa-search"></i></a>
                            </form>


                            <ul className="nav navbar-nav navbar-right pull-right">
                                <li className="dropdown hidden-xs">
                                    <a href="#" data-target="#" className="dropdown-toggle waves-effect waves-light"
                                        data-toggle="dropdown" aria-expanded="true">
                                        <i className="fa fa-user"></i> <span className="badge badge-xs badge-danger">{data?.length}</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-lg">
                                        <li className="notifi-title"><span className="label label-default pull-right">New
                                            3</span>Notification</li>
                                        <li className="list-group nicescroll notification-list">
                                            <a className="list-group-item">
                                                <div className="media">
                                                    <div className="pull-left p-r-10">
                                                        <em className="fa fa-diamond fa-2x text-primary"></em>
                                                    </div>
                                                    <div className="media-body">
                                                        <h5 className="media-heading">A new order has been placed A new order
                                                            has been placed</h5>
                                                        <p className="m-0">
                                                            <small>There are new settings available</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>

                                            <a className="list-group-item">
                                                <div className="media">
                                                    <div className="pull-left p-r-10">
                                                        <em className="fa fa-cog fa-2x text-custom"></em>
                                                    </div>
                                                    <div className="media-body">
                                                        <h5 className="media-heading">New settings</h5>
                                                        <p className="m-0">
                                                            <small>There are new settings available</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>

                                            <a className="list-group-item">
                                                <div className="media">
                                                    <div className="pull-left p-r-10">
                                                        <em className="fa fa-bell-o fa-2x text-danger"></em>
                                                    </div>
                                                    <div className="media-body">
                                                        <h5 className="media-heading">Updates</h5>
                                                        <p className="m-0">
                                                            <small>There are <span className="text-primary font-600">2</span>
                                                                new updates available</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>

                                            <a className="list-group-item">
                                                <div className="media">
                                                    <div className="pull-left p-r-10">
                                                        <em className="fa fa-user-plus fa-2x text-info"></em>
                                                    </div>
                                                    <div className="media-body">
                                                        <h5 className="media-heading">New user registered</h5>
                                                        <p className="m-0">
                                                            <small>You have 10 unread messages</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>

                                            <a className="list-group-item">
                                                <div className="media">
                                                    <div className="pull-left p-r-10">
                                                        <em className="fa fa-diamond fa-2x text-primary"></em>
                                                    </div>
                                                    <div className="media-body">
                                                        <h5 className="media-heading">A new order has been placed A new order
                                                            has been placed</h5>
                                                        <p className="m-0">
                                                            <small>There are new settings available</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>

                                            <a className="list-group-item">
                                                <div className="media">
                                                    <div className="pull-left p-r-10">
                                                        <em className="fa fa-cog fa-2x text-custom"></em>
                                                    </div>
                                                    <div className="media-body">
                                                        <h5 className="media-heading">New settings</h5>
                                                        <p className="m-0">
                                                            <small>There are new settings available</small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="list-group-item text-right">
                                                <small className="font-600">See all notifications</small>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="hidden-xs">
                                    <a href="#" id="btn-fullscreen" className="waves-effect waves-light"><i
                                        className="icon-size-fullscreen"></i></a>
                                </li>
                                <li className="hidden-xs">
                                    <a href="#" className="right-bar-toggle waves-effect waves-light"><i
                                        className="icon-settings"></i></a>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle profile" data-toggle="dropdown"
                                        aria-expanded="true"><img src={`http://localhost/reactJs_training/adminpanel/node_api/public/profile_img/${profile_image}`} alt="user-img"
                                            className="img-circle" /> </a>
                                    <ul className="dropdown-menu">
                                        <li><a><i className="ti-user m-r-5"></i> Profile</a></li>
                                        <li><a><i className="ti-settings m-r-5"></i> Settings</a></li>
                                        <li><a><i className="ti-lock m-r-5"></i> Lock screen</a></li>
                                        <li><NavLink to='/' onClick={() => localStorage.removeItem('userData')}><i className="ti-power-off m-r-5"></i> Logout</NavLink></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;