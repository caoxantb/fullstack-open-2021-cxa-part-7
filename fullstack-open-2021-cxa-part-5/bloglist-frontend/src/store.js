import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogsReducer from "./reducers/blogsReducer";
import notiReducer from "./reducers/notiReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  noti: notiReducer,
  blogs: blogsReducer,
  login: loginReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
