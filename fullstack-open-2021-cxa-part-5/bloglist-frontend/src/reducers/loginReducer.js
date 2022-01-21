import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return initialState;
    case "PARSE":
      return action.data;
    default:
      return state;
  }
};

export const loginActionCreators = (credentials) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(credentials);
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    blogService.setToken(loggedUser.token);
    dispatch({
      type: "LOGIN",
      data: loggedUser,
    });
  };
};

export const logoutActionCreators = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const parseActionCreators = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(parsedUser.token);
      dispatch({
        type: "PARSE",
        data: parsedUser,
      });
    }
  };
};
export default loginReducer;
