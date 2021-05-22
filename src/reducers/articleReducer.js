import { SET_LOADING_STATUS, GET_ARTICLES } from '../actions/actionType'

export const initState = {
    articles: [],
    loading: false,
};

const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            }
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        default:
            return state;
    }
};

export default articleReducer;