import userService from "../services/users";

const initialState = [];

const usersReducer = (state = initialState, action) => {
  if (action.type === "GET_USERS") return action.data;
  return state;
};

export const getUsersActionCreators = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: "GET_USERS",
      data: users,
    });
  };
};

export default usersReducer;
