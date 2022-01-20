const initialState = "";
let timeOut;

const notiReducer = (state = initialState, action) => {
  if (action.type === "INIT_NOTI") return action.data;
  return state;
};

export const initializeNotiActionCreators = (noti, ms = 0) => {
  return async (dispatch) => {
    clearTimeout(timeOut);
    dispatch({
      type: "INIT_NOTI",
      data: noti,
    });
    timeOut = setTimeout(
      () =>
        dispatch({
          type: "INIT_NOTI",
          data: "",
        }),
      ms
    );
  };
};

export default notiReducer;
