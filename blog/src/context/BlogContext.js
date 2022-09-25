import createDataContext from "./createDataContext";

const testBlogPost = { title: 'Test Post', content: "test content", id: 1 };

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
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    try {
      // await axios.post('/alpw', title, content);
      dispatch({ type: "add_blogpost", payload: { title, content } });
      if(callback) {
        callback();
      }
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

const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({ type: 'edit_blogpost', payload: { id, title, content }});
    if (callback) {
      callback();
    }
  }
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [testBlogPost]);