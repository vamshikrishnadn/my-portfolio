import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducers from "./AuthReducers";
import userReducers from "./userReducers";

export default combineReducers({
  auth: AuthReducers,
  form: formReducer,
  user: userReducers,
});
