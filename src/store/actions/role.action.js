import { SET_ROLE, SET_STUDENT_COUNT } from "../reducers/role.reducer";
import { store } from "../store";

export function setRole(role) {
    console.log('i am working',role);
    store.dispatch({ type: SET_ROLE, role })
}

export function setStudentCount(studentCount) {
    store.dispatch({ type: SET_STUDENT_COUNT, studentCount })
}