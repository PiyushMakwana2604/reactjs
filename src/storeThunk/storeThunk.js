// import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk";
// // import ReducerThunk from "./reducerThunk";
// import reducer from "./reducers/reducer";
// const storeThunk = createStore(reducer, compose(applyMiddleware(thunk)));

// export default storeThunk;

// const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// export default store








// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import ReducerThunk from "./reducerThunk";

// const storeThunk = createStore(ReducerThunk, applyMiddleware(thunk));

// export default storeThunk;









// import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
// import { thunk } from "redux-thunk";
// import ReducerThunk from "./reducerThunk";

// const initialState = {};

// const middleware = [thunk];

// const storeThunk = createStore(ReducerThunk, initialState, compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));

// export default storeThunk;