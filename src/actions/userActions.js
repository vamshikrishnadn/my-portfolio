import { SIGNIN, AUTH_ERROR, UPDATE_USERS, FETCH_USERS, LOGOUT } from "./type";
import * as api from "../api";
import axios from "axios";

export const signin = (formValues, history) => async (dispatch) => {
  try {
    // console.log(formValues);
    const signin = await api.signin(formValues);
    dispatch({
      type: SIGNIN,
      payload: signin.data,
    });

    history.push("/home");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid Email or Password",
    });
  }
};

export const signup = (formValues, history) => async (dispatch) => {
  try {
    const signup = await api.signup(formValues);
    dispatch({
      type: SIGNIN,
      payload: signup.data,
    });
    window.alert("User Successfully Created. Please login");
    history.push("/");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "You have already registered with this email, Try signing in!",
    });
  }
};

export const updateUser =
  (id, postValues, image, history) => async (dispatch) => {
    // console.log(" update changes");

    try {
      // console.log("fetching update changes");
      const uploadImage = await axios.post(
        "https://api.cloudinary.com/v1_1/djsunmihd/image/upload",
        image
      );
      const updateUser = await api.updateUser(id, {
        ...postValues,
        image: uploadImage.data.secure_url,
      });
      alert("Successfully updated");
      // history.push(`/user`);
      dispatch({
        type: UPDATE_USERS,
        payload: updateUser.data,
      });
    } catch (error) {
      if (error.response.status === 409) {
        console.log(error);
        console.log(error.response);
        alert("Please fill all Categories");
      } else if (error.response.status === 413) {
        console.log(error);
        console.log(error.response);
        alert("Size is To large Make sure that size is less than 2MB");
      } else {
        console.log("Error", error.message);
        // console.log(postValues);
        const updateUser = await api.updateUser(id, postValues);
        alert("successfully updated");
        // history.push(`/user`);
        console.log("Action data", updateUser.data);
        dispatch({
          type: UPDATE_USERS,
          payload: updateUser.data,
        });
      }
      console.log(error.response);
    }
  };

export const fetchUser = (id) => async (dispatch) => {
  console.log(id);
  // console.log("calling");
  const fetchUser = await api.fetchUser(id);
  try {
    dispatch({
      type: FETCH_USERS,
      payload: fetchUser.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (history) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  history.push("/");
};
