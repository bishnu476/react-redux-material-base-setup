const CHANGE_NAME = 'CHANGE_NAME';
const CHANGE_EMAIL = 'CHANGE_EMAIL';
const initialState = {
    isFetching: false,
    dataLoaded: false,
    name: '',
    email: '',
};
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_NAME: {
            const name = action.payload;
            return {
                ...state,
                isFetching: true,
                name: name,
            }
        }
        case CHANGE_EMAIL: {
            const email = action.payload;
            return {
                ...state,
                isFetching: true,
                email: email,
            }
        }
        default:
            return state;
    }
}

export const callChangeName = (data) => dispatch => {
    return dispatch({
        type: CHANGE_NAME,
        payload: data
    });
};

export const callChangeEmail = (data) => dispatch => {
    return dispatch({
        type: CHANGE_EMAIL,
        payload: data
    });
};








