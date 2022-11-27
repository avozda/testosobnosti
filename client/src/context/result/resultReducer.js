import { GET_RESULTS, GET_RESULT, GET_STATISTICS, RESULTS_ERROR } from "../types"

const Reducer = (state, action) => {
    switch (action.type) {
        case GET_RESULTS:
            return {
                ...state,
                userResults: action.payload,
                loading: false,
                error: null
            };
        case GET_RESULT:
            return {
                ...state,
                resultDetail: action.payload,
                loading: false,
                error: null
            };
        case GET_STATISTICS:
            return {
                ...state,
                allResults: action.payload,
                loading: false,
                error: null
            };
        case RESULTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        

        default:
            return state;
    }
}

export default Reducer 