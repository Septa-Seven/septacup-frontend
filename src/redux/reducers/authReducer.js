import {
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS, LOGOUT_SUCCESS, REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS, SET_TOKEN,
    USER_LOADED,
    USER_LOADING
} from "../../shared/constants";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                token: action.payload.data.access
            }

        case LOGIN_USER_SUCCESS:
            localStorage.setItem('token', action.payload.data.access);
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload.data.access,

            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: null,
            }

        case SET_TOKEN:
            return {
                token: action.payload,
                ...state,
            }

        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            }

       default: return state;

    }
    return state;
}
