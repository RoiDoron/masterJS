import { useState } from "react"
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'; // Import the base CodeMirror styles
import 'codemirror/mode/javascript/javascript'; // Import the JavaScript mode
import { UserMsg } from "./UserMsg";
import { showSuccessMsg } from "../services/event-bus.service";
import { useDispatch } from "react-redux";
import { getActionEditCode } from "../store/actions/code.action";
import { SOCKET_EVENT_EDIT_CODE } from "../services/socket.service";

export function TextEditor({ initialCode, role, solution, codeEdit }) {
    const [code1, setCode] = useState(initialCode)

    const dispatch = useDispatch()

    useState(() => {
        socketService.on(SOCKET_EVENT_EDIT_CODE, (code) => {
            dispatch(getActionEditCode(code))
            console.log(code);

            setCode(code.studentCode)
        })

        return () => {
            socketService.off(SOCKET_EVENT_EDIT_CODE)
        }
        
    }, [code1])

    function handleChange(newCode) {
        setCode(newCode)
        codeEdit(newCode)
        if (newCode === solution) success()
    }

    function success() {
        showSuccessMsg('Congratulation! you are correct!')
    }

    function isMentor() {
        if (role === 'instructor') return true
        else return false
    }

    return (
        <>
            <CodeMirror
                value={code1}
                options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true,
                    readOnly: isMentor(),
                }}
                onBeforeChange={(editor, data, value) => {
                    handleChange(value);
                }}
            />
            <UserMsg />
        </>
    )
}