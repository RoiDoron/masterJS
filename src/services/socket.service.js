import io from 'socket.io-client'

// code
export const SOCKET_EVENT_EDIT_CODE = 'code-edit'

// role
export const SOCKET_EMIT_MY_ROLE = 'my-current-role'
export const SOCKET_EVENT_ASSIGN_ROLE = 'assignRole'

// mentor leave
export const SOCKET_EVENT_MENTOR_LEAVE = 'mentor-leave'
export const SOCKET_EVENT_MENTOR_LOGGED_IN = 'is-instructor-logged-in'

// student count 
export const SOCKET_EVENT_STUDENT_COUNT = 'student-count'



const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
    var socket = null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        terminate() {
            socket = null
        },

    }
    return socketService
}

// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
