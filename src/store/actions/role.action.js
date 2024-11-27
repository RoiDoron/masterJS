import { SET_ROLE, SET_STUDENT_COUNT, SET_WHERE_MENTOR } from "../reducers/role.reducer";
import { store } from "../store";

export function setRole(role) {
    store.dispatch({ type: SET_ROLE, role })
}

export function setStudentCount(studentCount) {
    store.dispatch({ type: SET_STUDENT_COUNT, studentCount })
}

export function setMentorPosition(mentorPosition) {
    store.dispatch({ type: SET_WHERE_MENTOR, mentorPosition })
}