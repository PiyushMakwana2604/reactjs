import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE } from "./actionThunk";

const initialValues = {
    news: [],
    isLoading: false,
    error: null
}

const ReducerThunk = (state = initialValues, action) => {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_NEWS_SUCCESS:
            console.log('state: ', state);
            console.log("action", action);
            return {
                ...state,
                isLoading: false,
                news: action.payload
            };
        case FETCH_NEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default ReducerThunk;