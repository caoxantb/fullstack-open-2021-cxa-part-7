import blogService from "../services/blogs";

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "LIKE": {
      const id = action.data.id;
      const blogLiked = state.find((b) => b.id === id);
      const blogsUpdated = {
        ...blogLiked,
        likes: blogLiked.likes + 1,
      };
      return state.map((b) => (b.id !== id ? b : blogsUpdated));
    }
    case "DELETE": {
      const id = action.data.id;
      return state.filter((b) => b.id !== id);
    }
    default:
      return state;
  }
};

export const getBlogsActionCreators = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "GET_BLOGS",
      data: blogs,
    });
  };
};

export const addBlogActionCreators = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "ADD_BLOG",
      data: newBlog,
    });
  };
};

export const likeActionCreators = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    await blogService.update(likedBlog);
    dispatch({
      type: "LIKE",
      data: likedBlog,
    });
  };
};

export const deleteActionCreators = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch({ type: "DELETE", data: blog });
  };
};

export default blogReducer;
