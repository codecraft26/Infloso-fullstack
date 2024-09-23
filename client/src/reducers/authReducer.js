const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        message: null,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      case 'SIGNUP_LOADING':
        return {
          ...state,
          loading: true, // Set loading to true when signup is initiated
        };
  
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          message: action.message,
          error: null,
          loading: false, // Reset loading after successful signup
        };
  
      case 'SIGNUP_FAIL':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
          message: null,
          loading: false, // Reset loading after failure
        };
      case 'FORGOT_PASSWORD_SUCCESS':
        return {
          ...state,
          message: action.payload,
          error: null,
          loading: false,
        };
    case 'FORGOT_PASSWORD_FAIL':
      return {
        ...state,
        error: action.payload,
        message: null,
        loading: false,
      };

    case 'RESET_PASSWORD':
      return {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
      };
    case 'RESET_PASSWORD_FAIL':
      return {
        ...state,
        error: action.payload,
        message: null,
        loading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'LOAD_USER_FAIL':
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
