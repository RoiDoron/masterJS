import { httpService } from './http.service.js'


const BASE_URL = 'code/'
export const codeService = {
    query,
    getById,
    save,
    remove,
    getEmptyCode,
}

function query() {
    return httpService.get(BASE_URL)
}

function getById(codeId) {
    return httpService.get(BASE_URL + codeId)
}

function remove(codeId) {
    return httpService.delete(BASE_URL + codeId)
}

function save(code) {
    if (code._id) {
        return httpService.put(BASE_URL, code)
    } else {
        return httpService.post(BASE_URL, code)
    }
}

function getEmptyCode() {
    return {
        name: '',
        initialCode: '',
        solution: '',
        createdAt: Date.now(),
    }
}




