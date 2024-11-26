
export const SET_CODES = 'SET_CODES'

export const UPDATE_CODE = ' UPDATE_CODE'


const initialState = {
    codes: [],

}

export function codeReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CODES:
            return { ...state, codes: action.codes }
        case UPDATE_CODE:
            return {
                ...state,
                codes: state.codes.map(code => code._id === action.code._id ? action.code : code)
            }

        default:
            return state;
    }
}