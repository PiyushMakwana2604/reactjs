import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import { Helmet } from "react-helmet";
import { useFieldArray, useForm } from "react-hook-form";
import { getRestaurantData } from "../../services/apiHandler";
import { editRestaurant } from "../../services/apiHandler";
import swal from "sweetalert";
import { deleteMenu } from "../../services/apiHandler";

function EditRestaurant() {
    const { restaurantId } = useParams();
    const [restaurant_id, setrestaurantId] = useState(atob(restaurantId));
    const [Data, SetData] = useState('');
    // console.log('Data: ', Data.menu_data);
    const { register, control, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const navigate = useNavigate();
    const { fields, append, remove } = useFieldArray({
        name: 'menu',
        control
    })
    useEffect(() => {
        getRestaurantData({ restaurant_id: restaurant_id }).then((response) => {
            if (response.code === 200) {
                SetData(response.data)
            } else {
                SetData([])
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    useEffect(() => {
        if (Data) {
            setValue("restaurant_name", Data?.name)
            setValue("restaurant_address", Data?.address)
            Data?.menu_data?.map(menu => {
                append({ menu_id: menu.id, product_name: menu.name, product_price: menu.price, product_category: menu.category, product_type: menu.type });
            })
        }
    }, [Data]);
    const deleteMenuData = (menu_id, index) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this menu item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteMenu({ menu_id: menu_id }).then((response) => {
                        if (response.code === 200) {
                            swal("Poof! Your menu item has been deleted!", {
                                icon: "success",
                            });
                            remove(index)
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
                } else {
                    // User clicked "Cancel", do nothing
                    swal("Your menu item is safe!");
                }
            });

        console.log('menu_id: ', menu_id);
        console.log('index: ', index);
    }
    const formSubmit = async data => {
        let menu_id = [];
        let product_name = [];
        let product_price = [];
        let product_type = [];
        let product_category = [];
        console.log('data: ', data);
        data.menu.map(menu => {
            menu_id.push(menu.menu_id)
            product_name.push(menu.product_name)
            product_price.push(menu.product_price)
            product_type.push(menu.product_type)
            product_category.push(menu.product_category)
        })
        let request = {
            restaurant_id: restaurant_id,
            restaurant_name: data?.restaurant_name,
            restaurant_address: data?.restaurant_address,
            menu_id: menu_id,
            product_name: product_name,
            product_price: product_price,
            product_type: product_type,
            product_category: product_category
        }
        editRestaurant(request).then((response) => {
            console.log('response: ', response);
            if (response.code === 200) {
                navigate('/restaurant-list')
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
                <title>Admin Panel | Edit Restaurant </title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Restaurant Form</h4>
                                <ol className="breadcrumb">
                                    <li><a href="#">Ubold</a></li>
                                    <li><a href="#">Forms</a></li>
                                    <li className="active">Restaurant Form </li>
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
                                                    <button type="button" className="btn btn-info" onClick={() => append({ id: "" })}>Add Dish</button>
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
                                                                {/* <input type="hidden" de></input> */}
                                                                <div className="form-group">
                                                                    <label htmlFor={`ProductName${index}`}>Product Name</label>
                                                                    <input type="text" className="form-control" id={`ProductName${index}`} placeholder="Product Name" {...register(`menu[${index}].product_name`, {
                                                                        required: 'Please enter Product Name',
                                                                    })} />
                                                                    {errors.menu && errors.menu[index] && errors.menu[index].product_name && (
                                                                        <small className="error">{errors.menu[index].product_name.message}</small>
                                                                    )}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor={`ProductPrice${index}`}>Product Price</label>
                                                                    <input type="number" className="form-control" id={`ProductPrice${index}`} placeholder="Product Price" {...register(`menu[${index}].product_price`, { required: 'Please enter Product Price' })} />
                                                                    {errors.menu && errors.menu[index] && errors.menu[index].product_price && (
                                                                        <small className="error">{errors.menu[index].product_price.message}</small>
                                                                    )}
                                                                </div>
                                                                <div className="form-group">
                                                                    <select key={index} className="form-select form-control" aria-label={`ProductType${index}`}  {...register(`menu[${index}].product_type`, { required: 'Please enter Product Type' })}>
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
                                                                                <input type="radio" id={`veg${index}`} value="veg"
                                                                                    {...register(`menu[${index}].product_category`, { required: 'Please enter Product Category' })} />
                                                                                <label htmlFor={`veg${index}`}>Veg</label>
                                                                            </div>
                                                                            <div>
                                                                                <input type="radio" id={`nonveg${index}`} value="nonveg"  {...register(`menu[${index}].product_category`, { required: 'Please enter Product Category' })} />
                                                                                <label htmlFor={`nonveg${index}`}>Non-veg</label>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <button type="button" className="btn btn-danger waves-effect waves-light" onClick={() => deleteMenuData(menuItem.menu_id, index)}>Delete</button>
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
                </div>
            </div>
        </>
    )

}

export default EditRestaurant