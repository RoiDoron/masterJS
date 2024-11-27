import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { TextEditor } from "../cmps/TextEditor"
import { codeService } from "../services/code-block.service"
import { SOCKET_EMIT_MY_ROLE, SOCKET_EVENT_ASSIGN_ROLE, SOCKET_EVENT_MENTOR_LEAVE, SOCKET_EVENT_STUDENT_COUNT, socketService } from "../services/socket.service"
import { useSelector } from "react-redux"
import { updateCode } from "../store/actions/code.action"
import { setMentorPosition, setRole, setStudentCount } from "../store/actions/role.action"


export function Codeblock() {
    const navigate = useNavigate()
    const [code, setCode] = useState(null)
    const role = useSelector(storeState => storeState.roleModule.role)
    const { codeId } = useParams()

    // using two useEffect that the re-render from the use effect doesn't effect on the sockets 

    useEffect(() => {
        if (!code) loadCode()

        return () => {
            if (code === null || role === 'student') return
            codeEdit(code.initialCode)
        }
    }, [code])

    useEffect(() => {
        if (role === '') {

            socketService.emit(SOCKET_EMIT_MY_ROLE, role); // doing emit to let the server now my role and start the socket

            socketService.on(SOCKET_EVENT_ASSIGN_ROLE, (data) => { // listening to the assign role socket
                codeService.saveSocketId(data.socketId, data.role)
                setRole(data.role)
                if (data.role === 'instructor') {
                    socketService.emit('where-mentor', codeId)
                }
            });
        }
        socketService.on(SOCKET_EVENT_STUDENT_COUNT, Count => { // socket for the student count that contain it in the store for the app header to show it
            setStudentCount(Count)
        })

        socketService.on(SOCKET_EVENT_MENTOR_LEAVE, (mentorPosition) => { //listening to leave instructor when he leave its trigger the socket and navigate everyone back
            setMentorPosition(mentorPosition)
            navigate('/')
        })

        return () => {
            console.log(role);
            socketService.off(SOCKET_EVENT_STUDENT_COUNT)
            socketService.off(SOCKET_EVENT_ASSIGN_ROLE)
            socketService.off(SOCKET_EVENT_MENTOR_LEAVE)
            cleanUp()
            setStudentCount(0)
        }

    }, [role])

    function cleanUp() {
        socketService.emit('leave-room', role)
        if (role === 'instructor' ||role === 'student') { //this if is to prevent after first render to determent the role it will not triggered
            setRole('')
        }
        if(role === 'instructor') setMentorPosition(null)
    }

    function codeEdit(newCode) {

        const updatedCode = code
        updatedCode.studentCode = newCode
        updateCode(updatedCode)
    }

    async function loadCode() {
        try {
            const code = await codeService.getById(codeId)
            setCode(code)
        }
        catch (err) {
            console.log('Hade issues wite loading code', err)
            navigate('/')
        }
    }

    if (code === null || role === null) return <div>Loading ...</div>
    return (
        <section className="code-block  flex align-center column">

            <h1>{code.name}</h1>
            <TextEditor codeEdit={codeEdit} initialCode={code.studentCode} solution={code.solution} role={role} />
        </section>
    )
}