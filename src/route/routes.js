import React, { useEffect } from 'react';
import DashBoard from '../components/Auth/dashboard';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from '../components/Auth/login';
import signup from '../components/Auth/signup';
import Error from '../components/error_page';
import UserList from '../components/Auth/userlist';
import EditUser from '../components/Auth/edituser';
import Calculator from '../components/Task/calculator';
import TODO from '../components/Task/toDoList';
import RestaurantList from '../components/Restaurant/restaurant_list';
import TodoForm from '../components/Task/addRestaurant';
import EditRestaurant from '../components/Restaurant/edit_restaurant';
function RoutesPath() {
    return (
        <>
            <BrowserRouter>
                <div id="wrapper" className="forced">
                    <div>
                        {/* <Link to="/signup" style={{ color: 'white' }}>signup</Link><br></br>
                        <Link to="/test" style={{ color: 'white' }}>test</Link> */}
                        <Routes>
                            {
                                !localStorage.getItem('userData') ? (
                                    <>
                                        <Route path="/*" element={<DashBoard />} />
                                        <Route path="/" element={<Login />} />
                                        <Route path="/signup" Component={signup} />
                                    </>

                                ) : (
                                    <>
                                        <Route path="/*" element={<Login />} />
                                        <Route path="/user-list" element={<UserList />} />
                                        <Route path="/restaurant-list" element={<RestaurantList />} />
                                        <Route path="/calculator" element={<Calculator />} />
                                        <Route path="/todo-list" element={<TODO />} />
                                        <Route path="/add-restaurant" element={<TodoForm />} />
                                        {/* <Route path="/*" element={<Navigate to="/" />} /> */}
                                        <Route path="/dashboard" element={<DashBoard />} />
                                        <Route path="/edit-user/:userId" element={<EditUser />} />
                                        <Route path="/edit-restaurant/:restaurantId" element={<EditRestaurant />} />
                                    </>
                                )
                            }
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}

export default RoutesPath;