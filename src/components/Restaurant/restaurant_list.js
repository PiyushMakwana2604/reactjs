import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import { Helmet } from "react-helmet";
import { restaurantList } from "../../services/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurant } from "../../store/slices/restaurantSlice";
import { deleteRestaurantApi } from "../../services/apiHandler";
import Paginations from "../Auth/Pagination";
function RestaurantList() {
    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate('/')
        }
    }, []);
    // const [Data, SetData] = useState([]);
    const [deleteRest, setDeleteRest] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page_limit, setPageLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRestaurantData, setTotalRestaurantData] = useState(0);
    useEffect(() => {
        setDeleteRest(false);
        restaurantList({ page: currentPage, perpage: page_limit }).then((response) => {
            if (response.code === 200) {
                dispatch(addRestaurant(response.data.result))
                setTotalRestaurantData(response.data.total_data_count)
            } else {
                dispatch(addRestaurant([]))
                // SetData([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [deleteRest, currentPage, page_limit])
    const deleteRestaurant = (restaurant_id) => {
        deleteRestaurantApi({ restaurant_id: restaurant_id }).then((response) => {
            console.log('response: ', response);
            if (response.code === 200) {
                setDeleteRest(true);
                //     SetData(response.data)
            }
            //  else {
            //     SetData([])
            // }
        }).catch((error) => {
            console.error(error);
        });
    }
    const restaurantData = useSelector((state) => {
        return state.restaurant;
    })
    let LIMIT = page_limit;

    const onPageChanged = useCallback(
        (event, page) => {
            setCurrentPage(page)
            event.preventDefault();
            setCurrentPage(page);
        },
        [setCurrentPage]
    );
    const currentData = restaurantData.slice(
        (currentPage - 1) * LIMIT,
        (currentPage - 1) * LIMIT + LIMIT
    );
    return (
        <>
            <Helmet>
                <title>Admin Panel | Restaurant List </title>
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
                                    <button type="button" className="btn btn-success" style={{ marginBottom: '1%' }} onClick={() => { navigate('/add-restaurant') }}>+Add Restaurant</button>
                                    <div id="datatable_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="dataTables_length" id="datatable_length">
                                                    <label>Show
                                                        <select name="datatable_length" aria-controls="datatable" className="form-control input-sm" onChange={(event) => { setPageLimit(event.target.value); setCurrentPage(1) }}>
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
                                                    <label>Search:<input type="search" className="form-control input-sm" placeholder="" aria-controls="datatable" /></label>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="datatable" className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sr NO.</th>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                    <th>Active</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    restaurantData && restaurantData.length > 0 ? (restaurantData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{(index + 1) + (page_limit * (currentPage - 1))}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.address}</td>
                                                            <td>{item.is_active}</td>
                                                            <td>
                                                                <button type="button" className="btn btn-primary" style={{ marginRight: '2%' }} >Details</button>
                                                                <button type="button" className="btn btn-info" style={{ marginRight: '2%' }} onClick={() => navigate('/edit-restaurant/' + btoa(item.id))}>Edit</button>
                                                                <button type="button" className="btn btn-danger" onClick={() => deleteRestaurant(item.id)}>Delete</button>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            totalRestaurantData > page_limit && (
                                <div className="pagination-wrapper">
                                    <Paginations
                                        totalRecords={totalRestaurantData}
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

                <footer className="footer">
                    2015 © Ubold.
                </footer>

            </div >
        </>
    )
}

export default RestaurantList