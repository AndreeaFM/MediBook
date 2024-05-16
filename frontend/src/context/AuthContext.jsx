//Context Api is a build-in feature in react that provides a way to share data across the component tree
//without having to pass props down through each level of the tree manually.
// it s a state management tool used for managing global or shared state in react applications

import { createContext, useContext, useEffect, useReducer } from 'react'

const initialState = {
  user: null,
  role: null,
  token: null,
}

export const authContext = createContext(initialState)

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        role: null,
        token: null,
      }

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      }

    case 'LOGOUT':
      return {
        user: null,
        role: null,
        token: null,
      }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
