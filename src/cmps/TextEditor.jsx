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
    const [code, setCode] = useState(initialCode)

    const dispatch = useDispatch()

    useState(() => {
        // socket for dispatching the changes on every one that sees the codeblock 
        socketService.on(SOCKET_EVENT_EDIT_CODE, (code) => {  
            dispatch(getActionEditCode(code)) 
            console.log(code);

            setCode(code.studentCode) // editing on the student code and not the initial
        })

        return () => {
            socketService.off(SOCKET_EVENT_EDIT_CODE)
        }

    }, [code])

    function handleChange(newCode) {
        setCode(newCode)
        codeEdit(newCode)
        if (newCode === solution) success()
    }

    function success() {
        showSuccessMsg('Congratulation! you are correct!') // on success pop up the smile
    }

    function isMentor() {
        if (role === 'instructor') return true
        else return false
    }

    return (
        <>
        {/* using lib "codemirror" to show the code with syntax highlighting   */}
            <div className="code-mirror">
                <CodeMirror
                    value={code}
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
            </div>
            {/* the massage that will pop if the student correct */}
            <UserMsg />
        </>
    )
}