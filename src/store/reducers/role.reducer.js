
export const SET_ROLE = 'SET_ROLE'
export const SET_STUDENT_COUNT = 'SET_STUDENT_COUNT'

const initialState = {
    role: '',
    studentCount: 0
}

export function roleReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ROLE:
            return { ...state, role: action.role }
        case SET_STUDENT_COUNT:
            return { ...state, studentCount: action.studentCount }
        default:
            return state;
    }
}