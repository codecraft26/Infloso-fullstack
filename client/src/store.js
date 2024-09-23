import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Use named import
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer'; // Ensure correct import

const rootReducer = combineReducers({
  auth: authReducer,
  // add more reducers as needed
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
