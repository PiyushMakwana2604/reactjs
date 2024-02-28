import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import { Helmet } from "react-helmet";
import { userDetails } from "../../services/apiHandler";
import { deleteUser } from "../../services/apiHandler";
import { searchUser } from "../../services/apiHandler";
import { activeInactiveUser } from "../../services/apiHandler";
import Switch from 'react-switch';
import swal from 'sweetalert';
import Paginations from "./Pagination";

function UserList() {
    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate('/')
        }
    }, []);
    const [Data, SetData] = useState('');
    const [is_delete, setIsdelete] = useState(false);
    const [active_inactive, setActiveInactive] = useState(false);
    const [page_limit, setPageLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    let NUM_OF_RECORDS = Data.length;
    let LIMIT = page_limit;

    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            setCurrentPage(page);
        },
        [setCurrentPage]
    );
    const currentData = Data.slice(
        (currentPage - 1) * LIMIT,
        (currentPage - 1) * LIMIT + LIMIT
    );

    const navigate = useNavigate();

    const deleteuser = (userId) => {
        let request = {
            user_id: userId
        }

        deleteUser(request).then((response) => {
            console.log(response);
            if (response.code === 200) {
                setIsdelete(true)
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const SearchUser = (event) => {
        let searchVal = event.target.value
        let searchArray = searchVal.split(' ').filter(Boolean);

        // console.log("searchVal", searchVal);
        let request = {
            search: searchArray
        }
        // console.log(request);
        searchUser(request).then((response) => {
            if (response.code === 200) {
                SetData(response.data)
            } else {
                SetData([])
            }
        }).catch((error) => {
            console.error(error);
        });
        // }

    }

    useEffect(() => {
        setIsdelete(false)
        setActiveInactive(false)
        userDetails().then((response) => {
            console.warn(response);
            if (response.code === 200) {
                SetData(response.data)
            } else {
                SetData([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [is_delete, active_inactive])


    const handleSwitchChange = (userId, checked) => {
        let request = {
            user_id: userId
        }
        activeInactiveUser(request).then((response) => {
            console.log(response);
            if (response.code === 200) {
                setActiveInactive(true)
            } else {
                swal({
                    title: response.message,
                    text: " Upate failed!",
                    icon: "error"
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <>
            <Helmet>
                <title>Admin Panel | User List </title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">User List</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Ubold</a>
                                    </li>
                                    <li>
                                        <a href="#">Tables</a>
                                    </li>
                                    <li className="active">
                                        User List
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <div id="datatable_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="dataTables_length" id="datatable_length">
                                                    <label>Show
                                                        <select name="datatable_length" aria-controls="datatable" className="form-control input-sm" onChange={(event) => { setPageLimit(event.target.value) }}>
                                                            <option value="5">5</option>
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                        </select> entries
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6" style={{ display: 'flex', justifyContent: 'end' }}>
                                                <div id="datatable_filter" className="dataTables_filter">
                                                    <label>Search:<input type="search" className="form-control input-sm" placeholder="" aria-controls="datatable" onChange={(event) => SearchUser(event)} /></label>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="datatable" className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sr NO.</th>
                                                    <th>Name</th>
                                                    <th>Profile Image</th>
                                                    <th>Email</th>
                                                    <th>Mobile No:</th>
                                                    <th>Gender</th>
                                                    <th>Age</th>
                                                    <th>Active</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentData && currentData.length > 0 ? (currentData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>{item.username}</td>
                                                            <td><img src={`http://localhost/reactJs_training/adminpanel/node_api/public/profile_img/${item.profile_image}`} width="100" height="100" /></td>
                                                            <td>{item.email}</td>
                                                            <td>{item.mobile}</td>
                                                            <td>{item.gender}</td>
                                                            <td>{item.age}</td>
                                                            <td>
                                                                <Switch
                                                                    checked={Boolean(item.is_active)}
                                                                    onChange={(checked) => handleSwitchChange(item.id, checked)}
                                                                />

                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-info" style={{ marginRight: '2%' }} onClick={() => navigate('/edit-user/' + item.id)}>Edit</button>
                                                                <button type="button" className="btn btn-danger" onClick={() => deleteuser(item.id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="text-center">No data found</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            Data.length > page_limit && (
                                                <div className="pagination-wrapper">
                                                    <Paginations
                                                        totalRecords={Data.length}
                                                        pageLimit={LIMIT}
                                                        pageNeighbours={2}
                                                        onPageChanged={onPageChanged}
                                                        currentPage={currentPage}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <footer className="footer">
                    2015 © Ubold.
                </footer>

            </div >
        </>
    )
}

export default UserList;