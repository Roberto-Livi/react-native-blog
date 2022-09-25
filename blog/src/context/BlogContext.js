import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch(action.type){
    case 'add_blogpost':
      return [...state,
        { id: (Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }];
    case 'delete_blogpost':
      return state.filter((blogPost) => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    try {
      // await axios.post('/alpw', title, content);
      dispatch({ type: "add_blogpost", payload: { title, content } });
      callback();
    } catch(e) {
      console.log(e);
    }
  }
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_blogpost', payload: id });
  }
};

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost }, []);