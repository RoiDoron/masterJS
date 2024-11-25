
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'codeDB'

_demoData()
export const codeServiceLocal = {
    query,
    getById,
    save,
    remove,
    getEmptyCode,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(codeId) {
    return storageService.get(STORAGE_KEY, codeId)
}

function remove(codeId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, codeId)
}

function save(code) {
    if (code._id) {
        return storageService.put(STORAGE_KEY, code)
    } else {
        return storageService.post(STORAGE_KEY, code)
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

// TEST DATA

function _createCode(name, initialCode, solution) {
    const code = getEmptyCode()
    code.name = name
    code.initialCode = initialCode
    code.solution = solution
    code._id = utilService.makeId()
    return code
}

function _demoData() {
    console.log('hi')
    let codes = utilService.loadFromStorage(STORAGE_KEY)
    if (!codes || !codes.length) {
        codes = []
        codes.push(_createCode('Async case',
            "async function fetchData() {\n  try {\n    let response = await fetch('https://api.example.com/data');\n    let data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}",
            "async function fetchData() {\n  try {\n    let response = await fetch('https://api.example.com/data');\n    let data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}"))
        codes.push(_createCode('For loop example',
            "for (let i = 0; i < 10; i++) {\n  console.log(i);\n}",
            "for (let i = 0; i < 10; i++) {\n  console.log(i);\n}"))
        codes.push(_createCode("Function definition",
            "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));",
            "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));"))
        codes.push(_createCode("Class declaration",
            "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    console.log('Hello, ' + this.name);\n  }\n}\n\nconst person1 = new Person('Tom', 30);\nperson1.greet();",
            "class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    console.log('Hello, ' + this.name);\n  }\n}\n\nconst person1 = new Person('Tom', 30);\nperson1.greet();"))
        utilService.saveToStorage(STORAGE_KEY, codes)
    }

}


