import { SET_ROLE } from "../reducers/role.reducer";
import { store } from "../store";


export function setRole(role) {
    store.dispatch({ type: SET_ROLE, role })
}