import { createContext, useEffect, useReducer } from "react"
import { ReducerAuthRoute } from "../reducers/ReducerAuthRoute"
import { types } from "../types/types.js"

export const ContextAuthRoutes = createContext(null);

export const AuthenticateUser = ({children}) => {
const [state, dispatch] = useReducer(ReducerAuthRoute, { isLogged: false })

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch({ type: types.LOGIN })
        }
    }, [])

    return(
        <ContextAuthRoutes.Provider value={{ dispatch, state }} >
            {children}
        </ContextAuthRoutes.Provider>
    )
}