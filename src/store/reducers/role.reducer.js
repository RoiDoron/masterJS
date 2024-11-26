
export const SET_ROLE = 'SET_ROLE'

const initialState = {
    role: ''
}

export function roleReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ROLE:
            return { ...state, role: action.role }
        default:
            return state;
    }
}