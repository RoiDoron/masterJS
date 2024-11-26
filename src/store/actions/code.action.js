import { codeService } from "../../services/code-block.service";
import { SET_CODES, UPDATE_CODE } from "../reducers/code.reducer";
import { store } from "../store";

export function getActionEditCode(code){
    return { type: UPDATE_CODE, code }
}

export function loadCodes() {
    return codeService.query()
        .then(codes => {
            store.dispatch({ type: SET_CODES, codes })
        })
        .catch(err => {
            console.log('code action -> Cannot load codes', err)
            throw err
        })
        
}

// export function updateCode(studentCode) {
//     return codeService.save(studentCode)
//         .then(updatedCode => {
//             store.dispatch(getActionEditCode(updatedCode))
//             return updatedCode
//         })
//         .catch(err => {
//             console.log('code action -> Cannot update code', err)
//             throw err
//         })
// }


export async function updateCode(studentCode) {
    try {
        const savedCode = await codeService.save(studentCode)
        console.log('Updated Code:', savedCode)
        store.dispatch(getActionEditCode(savedCode))
        return savedCode
    } catch (err) {
        console.log('Cannot save code', err)
        throw err
    }
}
