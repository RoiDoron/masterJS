
export const SET_ROLE = 'SET_ROLE'
export const SET_STUDENT_COUNT = 'SET_STUDENT_COUNT'
export const SET_WHERE_MENTOR = 'SET_WHERE_MENTOR'

const initialState = {
    role: '',
    studentCount: 0,
    mentorPosition: null
}

export function roleReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ROLE:
            return { ...state, role: action.role }
        case SET_STUDENT_COUNT:
            return { ...state, studentCount: action.studentCount }
        case SET_WHERE_MENTOR:
            console.log(action.mentorPosition);
            
            return { ...state, mentorPosition: action.mentorPosition }
        default:
            return state;
    }
}