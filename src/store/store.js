import { combineReducers, compose, createStore } from "redux";
import { roleReducer } from "./reducers/role.reducer";
import { codeReducer } from "./reducers/code.reducer";



const rootReducer = combineReducers({
   roleModule: roleReducer,
   codeModule: codeReducer
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})

