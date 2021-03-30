// #region REDUCER
const SAVE_EMAIL="SAVE_EMAIL";
const USER_LOGGED_OUT="USER_LOGGED_OUT";


const initialState = {
    reDirectUrl:'',
    isFetching: false,
    email: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
       case SAVE_EMAIL:{
            console.log("action",action.payload);
            const email = action.payload;
            return {
                ...state,
                reDirectUrl:email,
                };
            };
        default:
            return state;
    }
}

export const saveEmail = (email) => dispatch => {
    dispatch({
        type: SAVE_EMAIL,
        payload: email
    });
    return Promise.resolve();
};

const logoutApi = () => dispatch => {
    return dispatch({
        type: 'USER_LOGGED_OUT'
    });
};
