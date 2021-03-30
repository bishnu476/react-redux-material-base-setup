const CHANGE_FLOWVITY_USER_TYPE = 'CHANGE_FLOWVITY_USER_TYPE';
const CHANGE_FLOWVITY_AGENT_DATA_SUBMITTED_TYPE = 'CHANGE_FLOWVITY_AGENT_DATA_SUBMITTED_TYPE';
const initialState = {
    isFetching: false,
    dataLoaded: false,
    agentSelect: true,
    agentFormSubmitted: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_FLOWVITY_USER_TYPE: {
            const agentSelect = action.payload;
            return {
                ...state,
                isFetching: true,
                agentSelect: agentSelect,
            }
        }
        case CHANGE_FLOWVITY_AGENT_DATA_SUBMITTED_TYPE: {
            const agentFormSubmitted = action.payload;
            return {
                ...state,
                isFetching: true,
                agentFormSubmitted: agentFormSubmitted,
            }
        }
        default:
            return state;
    }
}

export const callChangeFlowvityUserType = (data) => dispatch => {
    return dispatch({
        type: CHANGE_FLOWVITY_USER_TYPE,
        payload: data
    });
};

export const callChangeFlowvityAgentDataSubmittedType = (data) => dispatch => {
    return dispatch({
        type: CHANGE_FLOWVITY_AGENT_DATA_SUBMITTED_TYPE,
        payload: data
    });
};








