//Context Api is a build-in feature in react that provides a way to share data across the component tree
//without having to pass props down through each level of the tree manually.
// it s a state management tool used for managing global or shared state in react applications

import { createContext, useContext, useEffect, useReducer } from 'react'

const initialState = {
  user:
    localStorage.getItem('user') != undefined
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
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

  //automatically upload local storage whenever the authentication state chanhes
  //ensures that user data is persisted even that the page is refreshed
  //also grab data from local storage and save it as the initial state
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('token', JSON.stringify(state.token))
    localStorage.setItem('role', JSON.stringify(state.role))
  }, [state])

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
