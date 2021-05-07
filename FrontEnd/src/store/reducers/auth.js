import ActionTypes from '../action';

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    token: localStorage.getItem('token'),
    currentUser: JSON.parse(localStorage.getItem('userInfo')) || {}
};

const authReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            localStorage.setItem('token', action.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(action.currentUser));
            console.log(1)
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                userInfo: action.currentUser
            }
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                userInfo: {} 
            }
        default:
            return {...state}
    }
}

export default authReducer;