import blogService from "../services/blogs";

const initialState = [];

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOGS":
      return action.data;
    case "ADD_BLOG":
      return [...state, action.data];
    case "LIKE": {
      const id = action.data.id;
      const blogLiked = state.find((b) => b.id === id);
      const blogUpdated = {
        ...blogLiked,
        likes: blogLiked.likes + 1,
      };
      return state.map((b) => (b.id !== id ? b : blogUpdated));
    }
    case "ADD_COMMENT": {
      const id = action.data.id;
      const blogCommented = state.find((b) => b.id === id);
      const blogUpdated = {
        ...blogCommented,
        comments: action.data.comments,
      };
      return state.map((b) => (b.id !== id ? b : blogUpdated));
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

export const addCommentActionCreators = (id, comment) => {
  return async (dispatch) => {
    const BlogToComment = await blogService.createComment(id, comment);
    dispatch({
      type: "ADD_COMMENT",
      data: BlogToComment,
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

export default blogsReducer;
