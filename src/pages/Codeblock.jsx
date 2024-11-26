import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { TextEditor } from "../cmps/TextEditor"
import { codeService } from "../services/code-block.service"
import { SOCKET_EMIT_MY_ROLE, SOCKET_EVENT_ASSIGN_ROLE, SOCKET_EVENT_EDIT_CODE, SOCKET_EVENT_MENTOR_LEAVE, socketService } from "../services/socket.service"
import { useDispatch, useSelector } from "react-redux"
import { UPDATE_CODE } from "../store/reducers/code.reducer"
import { getActionEditCode, updateCode } from "../store/actions/code.action"
import { setRole } from "../store/actions/role.action"


export function Codeblock() {
    const navigate = useNavigate()
    const [code, setCode] = useState(null)
    const role = useSelector(storeState => storeState.roleModule.role)
    const { codeId } = useParams()


    useEffect(() => {
        if (!code) loadCode()

        socketService.emit(SOCKET_EMIT_MY_ROLE, role);

        socketService.on(SOCKET_EVENT_ASSIGN_ROLE, (data) => {
            codeService.saveSocketId(data.socketId, data.role)
            setRole(data.role)
        });

        socketService.on(SOCKET_EVENT_MENTOR_LEAVE, (instructor) => {
            console.log('hi', instructor)
            backToLooby()
        })

        return () => {
            socketService.off(SOCKET_EVENT_ASSIGN_ROLE)
            socketService.off(SOCKET_EVENT_MENTOR_LEAVE)
            socketService.emit('leave-room', role)
        }


    }, [code])

    function codeEdit(newCode) {

        const updatedCode = code
        updatedCode.studentCode = newCode
        updateCode(updatedCode)
    }

    function backToLooby() {
        setRole('')
        navigate('/')
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