import { types } from "../types/types.js";

export const ReducerAuthRoute = (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...action.payload,
                isLogged: true,
            };
        case types.LOGOUT:
            return {
                isLogged: false,
            };
            default:
                return state
    }
};