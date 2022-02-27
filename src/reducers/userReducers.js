import {
  ADD_USERS,
  FETCH_USERS,
  UPDATE_USERS,
  DELETE_USERS,
} from "../actions/type";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case ADD_USERS:
      return [...state, action.payload];
    case UPDATE_USERS:
      // console.log(state);
      // console.log(action.payload);
      return action.payload;
    case DELETE_USERS:
      return state.filter((state) => state._id !== action.payload);

    default:
      return state;
  }
};
