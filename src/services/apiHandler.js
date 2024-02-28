import AxiosClientApi from "./AuthService";
import AxiosClientApiImage from "./AuthserviceImage";

/*==================================================== 
    Auth Routers                                                                              
====================================================== */

export function login(request) {
    return AxiosClientApi.post('v1/auth/login', request)
}

export function userDetails(request) {
    return AxiosClientApi.get('v1/auth/userDetails', request)
}

export function deleteUser(request) {
    return AxiosClientApi.post('v1/home/deleteUser', request)
}

export function searchUser(request) {
    return AxiosClientApi.post('v1/home/searchUser', request)
}

export function getuserdata(request) {
    return AxiosClientApi.post('v1/home/getuserdata', request)
}

export function updateUserData(request) {
    return AxiosClientApi.post('v1/home/updateUserData', request)
}

export function uploadProfileImage(request) {
    return AxiosClientApiImage.post('v1/home/upload_profileImage', request)
}

export function activeInactiveUser(request) {
    return AxiosClientApi.post('v1/auth/active_inactive_user', request)
}

export function addRestaurant(request) {
    return AxiosClientApi.post('v1/home/add_restaurant', request)
}

export function restaurantList(request) {
    return AxiosClientApi.post('v1/home/restaurant_list', request)
}

export function getRestaurantData(request) {
    return AxiosClientApi.post('v1/home/get_restaurant_data', request)
}

export function editRestaurant(request) {
    return AxiosClientApi.post('v1/home/edit_restaurant', request)
}

export function deleteMenu(request) {
    return AxiosClientApi.post('v1/home/delete_menu', request)
}
export function deleteRestaurantApi(request) {
    return AxiosClientApi.post('v1/home/delete_restaurant', request)
}
