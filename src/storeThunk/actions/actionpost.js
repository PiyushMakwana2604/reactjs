export const addUserThunk = (data) => async (dispatch) => {
    try {
        console.log('data: ', data);
        dispatch({
            type: "CREATE",
            payload: data
        })
    } catch (error) {
        console.error(error);
    }
}