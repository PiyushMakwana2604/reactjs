import React, { useEffect, useState } from 'react';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { addUser } from '../../store/slices/todoslice';
// import { removeUser } from '../../store/slices/todoslice';
// import { deleteAllUser } from '../../store/slices/todoslice';
// import { updateUser } from '../../store/slices/todoslice';
import { addUserThunk } from '../../storeThunk/actions/actionpost';
function TODO() {
    useEffect(() => {
        // if (!localStorage.getItem('userData')) {
        //     navigate('/')
        // }
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [task, setTask] = useState('');
    const [updatetask, setUpdateTask] = useState('');
    const [updateUserId, setUpdateUserId] = useState(0);
    const [todoId, setTodoId] = useState(1);
    const [todoData, setTodoData] = useState([]);

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };
    const handleEditChange = (event) => {
        setUpdateTask(event.target.value);
    };

    const handleSaveClick = () => {
        if (task && task.trim() != "") {
            setTodoId(todoId + 1);
            let data = {
                id: todoId,
                value: task
            }
            setTodoData([...todoData, data]);
            // dispatch(addUser(data));
            dispatch(addUserThunk(data));
            setTask("")
        }
    };

    const handleDeleteClick = (id, index) => {
        console.log('index: ', index);
        // dispatch(removeUser(index))
        const updatedTodoData = todoData.filter(item => item.id !== id);
        setTodoData(updatedTodoData)
    };
    const handleUpdateClick = () => {
        // const value = prompt("Please Enter Here")
        if (updatetask && updatetask.trim() != "") {
            const updatedTodoData = todoData.map(item => {
                // dispatch(updateUser({ id: updateUserId, value: updatetask }));
                if (item.id === updateUserId) {
                    return { ...item, value: updatetask };
                } else {
                    return item;
                }
            })
            setTodoData(updatedTodoData)
            setUpdateUserId(0);
            setUpdateTask("");
        } else {
            alert("please Provide a Valid Data")
        }
    }
    return (
        <>
            <Helmet>
                <title>Admin Panel | TODO List</title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                            <div className="container py-5 h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col col-lg-9 col-xl-7">
                                        <div className="card rounded-3">
                                            <div className="card-body p-4">
                                                <h4 className="text-center my-3 pb-3">To Do App</h4>
                                                <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                                    {updateUserId == 0 ? (
                                                        <>
                                                            <div className="col-12">
                                                                <div className="form-outline">
                                                                    <input type="text" id="form1" value={task} className="form-control todo_input" style={{ backgroundColor: "white", fontSize: 'medium' }} onChange={handleInputChange} />
                                                                    <label className="form-label" htmlFor="form1" style={{ color: 'red' }}>
                                                                        {
                                                                            task ? "" : "Enter a task here"
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <button type="button" className="btn btn-primary" style={{ marginRight: '1%' }} onClick={handleSaveClick}>
                                                                    Save
                                                                </button>
                                                                <button type="button" className="btn btn-warning" onClick={() => {
                                                                    setTodoData([]);
                                                                    setTodoId(1);
                                                                    // dispatch(deleteAllUser());
                                                                }} >
                                                                    Clear All
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="col-12">
                                                                <div className="form-outline">
                                                                    <input type="text" id="form2" value={updatetask} className="form-control todo_input" style={{ backgroundColor: "white", fontSize: 'medium' }} onChange={handleEditChange} />
                                                                    <label className="form-label" htmlFor="form2" style={{ color: 'red' }}>
                                                                        {
                                                                            updatetask ? "" : "Enter a task here"
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <button type="button" className="btn btn-primary" style={{ marginRight: '1%' }} onClick={handleUpdateClick}>
                                                                    Edit
                                                                </button>
                                                                <button type="button" className="btn btn-warning" style={{ marginRight: '1%' }} onClick={() => { setUpdateTask(""); setUpdateUserId(0) }}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </form>
                                                <table className="table mb-4">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">No.</th>
                                                            <th scope="col">Todo item</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            todoData && todoData.length > 0 ? (todoData.map((item, index) => (
                                                                <tr key={index + 1}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{item.value}</td>
                                                                    <td>
                                                                        <button type="button" className="btn btn-success ms-1" style={{ marginRight: '1%' }} onClick={() => setUpdateUserId(item.id)}>
                                                                            Edit
                                                                        </button>
                                                                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(item.id, index)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="3" className="text-center">No data found</td>
                                                                </tr>
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>

        </>
    )
}
export default TODO;