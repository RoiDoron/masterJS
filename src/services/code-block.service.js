import { httpService } from './http.service.js'

const STORAGE_KEY_SOCKET_ID = 'loggedinUser'

const BASE_URL = 'code/'
export const codeService = {
    query,
    getById,
    save,
    remove,
    getEmptyCode,
    saveSocketId,
    getSocketId
}

function query() {
    return httpService.get(BASE_URL)
}

function getById(codeId) {
    return httpService.get(BASE_URL + codeId)
}

function save(code) {
    const data ={
        code,
        socketId:getSocketId()._id
    }
    console.log(data);
    
    if (code._id) {
        return httpService.put(BASE_URL+code._id, data)
    } else {
        return httpService.post(BASE_URL, code)
    }
}

function saveSocketId(socketId,role){
    const socketIdentity ={
        _id :socketId,
        role
    }
    sessionStorage.setItem(STORAGE_KEY_SOCKET_ID, JSON.stringify(socketIdentity))
    return saveSocketId
}

function getSocketId() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_SOCKET_ID))
}

// not used but for basic crud

function remove(codeId) { 
    return httpService.delete(BASE_URL + codeId)
}

function getEmptyCode() {
    return {
        name: '',
        initialCode: '',
        solution: '',
        createdAt: Date.now(),
    }
}




