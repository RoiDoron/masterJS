import { SET_ROLE, SET_STUDENT_COUNT } from "../reducers/role.reducer";
import { store } from "../store";


export function setRole(role) {
    store.dispatch({ type: SET_ROLE, role })
}
export function setStudentCount(count) {
    store.dispatch({ type: SET_STUDENT_COUNT, count })
}