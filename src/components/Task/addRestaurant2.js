import React, { useEffect, useState } from 'react';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { addRestaurant } from '../../services/apiHandler';
import swal from 'sweetalert';

function TodoForm() {
    const [menuid, setMenuId] = useState(0);
    const [menuarray, setMenuarray] = useState([]);
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const HandleaddDish = () => {
        setMenuId(menuid + 1);
        setMenuarray([...menuarray, { id: menuid }]);
    }

    const { fields } = useFieldArray({
        name: 'menu_name',
        control
    })
    const deleteMenu = (index) => {
        const updatedMenuArray = [...menuarray.slice(0, index), ...menuarray.slice(index + 1)];
        setMenuarray(updatedMenuArray);
        console.log(updatedMenuArray);
    }

    const formSubmit = async data => {
        console.log(data);
        // const product_name = Object.keys(data)
        //     .filter(key => key.startsWith('product_name_'))
        //     .map(key => data[key]);
        // const product_type = Object.keys(data)
        //     .filter(key => key.startsWith('product_type_'))
        //     .map(key => data[key]);
        // const product_category = Object.keys(data)
        //     .filter(key => key.startsWith('product_category_'))
        //     .map(key => data[key]);
        // const product_price = Object.keys(data)
        //     .filter(key => key.startsWith('product_price_'))
        //     .map(key => data[key]);
        // let request = {
        //     restaurant_name: data.restaurant_name,
        //     restaurant_address: data.restaurant_address,
        //     product_name: product_name,
        //     product_type: product_type,
        //     product_category: product_category,
        //     product_price: product_price,
        // };
        // await addRestaurant(request).then((response) => {
        //     if (response.code === 200) {
        //         navigate('/restaurant-list')
        //     } else {
        //         swal({
        //             title: response.message,
        //             text: " Error!",
        //             icon: "error"
        //         });
        //     }
        //     console.log('response: ', response);
        // }).catch((error) => {
        //     console.error(error);
        // });
    }
    return (
        <>
            <Helmet>
                <title>Admin Panel | Add Restaurant </title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            <div className="content-page">
                <div className="content">
                    <div className="container">

                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Form elements</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Ubold</a>
                                    </li>
                                    <li>
                                        <a href="#">Forms</a>
                                    </li>
                                    <li className="active">
                                        General elements
                                    </li>
                                </ol>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-10">
                                            <h4 className="m-t-0 header-title"><b>TODO FORM</b></h4>

                                            <form role="form" onSubmit={handleSubmit(formSubmit)}>
                                                <div className="form-group">
                                                    <label htmlFor="RestaurantName">Restaurant Name</label>
                                                    <input type="text" className="form-control" name="restaurant_name" id="RestaurantName" placeholder="Restaurant Name" {...register("restaurant_name", { required: 'Please enter Restaurant Name' })} />
                                                    {errors.restaurant_name && <small className="error">{errors.restaurant_name.message}</small>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="RestaurantAddress">Restaurant Address </label>
                                                    <textarea className="form-control" name='restaurant_address' id="RestaurantAddress" placeholder="Restaurant Address" {...register("restaurant_address", { required: 'Please enter Restaurant Name' })} />
                                                    {errors.restaurant_address && <small className="error">{errors.restaurant_address.message}</small>}

                                                </div>

                                                <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <button type="button" className="btn btn-info" onClick={HandleaddDish}>Add Dish</button>
                                                </div>
                                                {menuarray.length > 0 && (
                                                    // <div style={{ height: "370px", overflow: 'scroll' }}>
                                                    <div style={{ ...(menuarray.length > 1 ? { height: "370px", overflow: 'scroll' } : {}) }}>
                                                        {menuarray.map((menuItem, index) => (
                                                            <div key={index}>
                                                                {index > 0 && (
                                                                    <hr style={{ border: "1px solid" }}></hr>
                                                                )}
                                                                <h3 style={{ display: "flex", justifyContent: "center" }}>Menu Item {index + 1}</h3>
                                                                <div className="form-group">
                                                                    <label htmlFor={`ProductName${index}`}>Product Name</label>
                                                                    <input key={index} type="text" className="form-control" name={`product_name_${index}`} id={`ProductName${index}`} placeholder="Product Name" {...register(`product_name_${index}`, { required: 'Please enter Product Name' })} />
                                                                    {/* {errors.product_name && <small className="error">{errors.product_name.message}</small>} */}
                                                                    {errors[`product_name_${index}`] && <small className="error">{errors[`product_name_${index}`].message}</small>}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor={`ProductPrice${index}`}>Product Price</label>
                                                                    <input key={index} type="number" className="form-control" name={`product_price${index}`} id={`ProductPrice${index}`} placeholder="Product Price" {...register(`product_price_${index}`, { required: 'Please enter Product Price' })} />
                                                                    {/* {errors.product_price && <small className="error">{errors.product_price.message}</small>} */}
                                                                    {errors[`product_price_${index}`] && <small className="error">{errors[`product_price_${index}`].message}</small>}

                                                                </div>
                                                                <div className="form-group">
                                                                    <select key={index} className="form-select form-control" aria-label={`ProductType${index}`} name={`product_type_${index}`} defaultValue=""  {...register(`product_type_${index}`, { required: 'Please enter Product Type' })}>
                                                                        <option value="" disabled>select Product Type</option>
                                                                        <option value="fast food">Fast Food</option>
                                                                        <option value="Fruit and vegetables">Fruit and vegetables</option>
                                                                        <option value="drinks">drinks</option>
                                                                    </select>
                                                                    {/* {errors.Product_type && <small className="error">{errors.Product_type.message}</small>} */}
                                                                    {errors[`product_type_${index}`] && <small className="error">{errors[`product_type_${index}`].message}</small>}

                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Product Category</label><br />
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <div style={{ marginRight: '5px' }}>
                                                                                <input type="radio" id={`veg${index}`} name={`product_category_${index}`} value="veg" {...register(`product_category_${index}`, { required: 'Please enter Product Type' })} />
                                                                                <label htmlFor={`veg${index}`}>Veg</label>
                                                                            </div>
                                                                            <div>
                                                                                <input type="radio" id={`nonveg${index}`} name={`product_category_${index}`} value="nonveg" {...register(`product_category_${index}`, { required: 'Please enter Product Type' })} />
                                                                                <label htmlFor={`nonveg${index}`}>Non-veg</label>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={() => { deleteMenu(index) }}>Delete</button>
                                                                        </div>
                                                                    </div>
                                                                    {/* {errors.product_category && <small className="error">{errors.product_category.message}</small>} */}
                                                                    {errors[`product_category_${index}`] && <small className="error">{errors[`product_category_${index}`].message}</small>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="form-group">
                                                    <div className="checkbox checkbox-primary">
                                                        <input id="checkbox1" name="sure" type="checkbox" {...register("sure", { required: 'Please select the checkbox to proceed.' })} />
                                                        <label htmlFor="checkbox1">
                                                            Are You Sure
                                                        </label>
                                                    </div>
                                                    {errors.sure && <small className="error">{errors.sure.message}</small>}
                                                </div>
                                                <button type="submit" className="btn btn-purple waves-effect waves-light">Submit</button>
                                            </form >
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default TodoForm;