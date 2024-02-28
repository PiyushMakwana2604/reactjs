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

    const { fields, append, remove } = useFieldArray({
        name: 'menu',
        control
    })

    const formSubmit = async data => {
        const productNamesArray = data.menu.map(item => item.product_name);
        const productTypesArray = data.menu.map(item => item.product_type);
        const productPricesArray = data.menu.map(item => item.product_price);
        const productCategoryArray = data.menu.map(item => item.product_category);
        let request = {
            restaurant_name: data.restaurant_name,
            restaurant_address: data.restaurant_address,
            product_name: productNamesArray,
            product_type: productTypesArray,
            product_category: productPricesArray,
            product_price: productCategoryArray,
        };
        await addRestaurant(request).then((response) => {
            if (response.code === 200) {
                navigate('/restaurant-list')
            } else {
                swal({
                    title: response.message,
                    text: " Error!",
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
                                                    <button type="button" className="btn btn-info" onClick={() => append({ menu: "" })}>Add Dish</button>
                                                </div>
                                                {fields.length > 0 && (
                                                    // <div style={{ height: "370px", overflow: 'scroll' }}>
                                                    <div style={{ ...(fields.length > 1 ? { height: "370px", overflow: 'scroll' } : {}) }}>
                                                        {fields.map((menuItem, index) => (
                                                            <div key={index}>
                                                                {index > 0 && (
                                                                    <hr style={{ border: "1px solid" }}></hr>
                                                                )}
                                                                <h3 style={{ display: "flex", justifyContent: "center" }}>Menu Item {index + 1}</h3>
                                                                <div className="form-group">
                                                                    <label htmlFor={`ProductName${index}`}>Product Name</label>
                                                                    <input key={index} type="text" name='product_name' className="form-control" id={`ProductName${index}`} placeholder="Product Name" {...register(`menu.${index}.product_name`, { required: 'Please enter Product Name' })} />
                                                                    {errors.menu && errors.menu[index] && errors.menu[index].product_name && (
                                                                        <small className="error">{errors.menu[index].product_name.message}</small>
                                                                    )}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor={`ProductPrice${index}`}>Product Price</label>
                                                                    <input key={index} type="number" className="form-control" id={`ProductPrice${index}`} placeholder="Product Price" {...register(`menu.${index}.product_price`, { required: 'Please enter Product Price' })} />
                                                                    {errors.menu && errors.menu[index] && errors.menu[index].product_price && (
                                                                        <small className="error">{errors.menu[index].product_price.message}</small>
                                                                    )}
                                                                </div>
                                                                <div className="form-group">
                                                                    <select key={index} className="form-select form-control" aria-label={`ProductType${index}`} defaultValue=""  {...register(`menu.${index}.product_type`, { required: 'Please enter Product Type' })}>
                                                                        <option value="" disabled>select Product Type</option>
                                                                        <option value="fast food">Fast Food</option>
                                                                        <option value="Fruit and vegetables">Fruit and vegetables</option>
                                                                        <option value="drinks">drinks</option>
                                                                    </select>
                                                                    {errors.menu && errors.menu[index] && errors.menu[index].product_type && (
                                                                        <small className="error">{errors.menu[index].product_type.message}</small>
                                                                    )}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Product Category</label><br />
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <div style={{ marginRight: '5px' }}>
                                                                                <input type="radio" id={`veg${index}`} value="veg" {...register(`menu.${index}.product_category`, { required: 'Please enter Product Category' })} />
                                                                                <label htmlFor={`veg${index}`}>Veg</label>
                                                                            </div>
                                                                            <div>
                                                                                <input type="radio" id={`nonveg${index}`} value="nonveg" {...register(`menu.${index}.product_category`, { required: 'Please enter Product Category' })} />
                                                                                <label htmlFor={`nonveg${index}`}>Non-veg</label>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={() => { remove(index) }}>Delete</button>
                                                                        </div>
                                                                    </div>
                                                                    {errors.menu && errors.menu[index] && errors.menu[index].product_category && (
                                                                        <small className="error">{errors.menu[index].product_category.message}</small>
                                                                    )}
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