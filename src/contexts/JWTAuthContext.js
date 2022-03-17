import { createContext, useEffect, useReducer } from 'react';
import axios from 'src/utils/axios';
import { checkToken } from 'src/helpers/fetch';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';


const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  status: null
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, status } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      status
    };
  },
  LOGIN: (state, action) => {
    const { user, status } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user, 
      status
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    status: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});


export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);
 
    

  useEffect(() => {
    const initialize = async () => {
      try {

        const resp = await checkToken();
        const data = await resp.json();

        if(data.ok){
         
          const { user } = data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              status: data.status
            }
          });
          
          
        }else{
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              status: null
            }
          });
          
          
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            
          }
        });
       
      }
    };

    initialize();
  }, []);

const navigate = useNavigate();

const login = async (email, password) => {
     
const response = await fetch('http://localhost:4000/api/auth',{
  method: 'POST',
  headers:{'Accept': 'application/json',
  'Content-Type': 'application/json'},
  body:JSON.stringify({email,
        password})
  })

  const data = await response.json();
 if(data.ok){
  const { token, user, status } = data;

  setSession(token);
  dispatch({
    type: 'LOGIN',
    payload: {
      user,
      status
    }
  });

  

 }else{
    dispatch({
    type: 'INITIALIZE',
    payload: {
      isAuthenticated: false,
      user: null,
      status: null
    }
  });
 }

 return data;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, name, password, empresa) => {

  try {
  
  const response = await fetch('http://localhost:4000/api/auth/new',{
  method: 'POST',
  headers:{'Accept': 'application/json',
  'Content-Type': 'application/json'},
  body:JSON.stringify({
    name,
    email,
    password,
    empresa
  })
  })

  const data = await response.json();

  if(data.ok){

  navigate('/status/pending')
  }

    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
