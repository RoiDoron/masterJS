import { useState } from "react"
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'; // Import the base CodeMirror styles
import 'codemirror/mode/javascript/javascript'; // Import the JavaScript mode
import { UserMsg } from "./UserMsg";
import { showSuccessMsg } from "../services/event-bus.service";

export function TextEditor({ initialCode, role, solution }) {
    const [code, setCode] = useState(initialCode)

    function handelChange(newCode){
        setCode(newCode)
        if (newCode === solution) success()
    }

    function success() {
        showSuccessMsg('Congratulation! you are correct!')
    }
    function isMentor(){
        if(role === 'instructor') return true
        else return false
    }

    return (
        <>
            <CodeMirror
                value={code}
                options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true,
                    readOnly: isMentor() 
                }}
                onChange={(editor, data,value) => {
                    handelChange(value)

                }}
            />
            <UserMsg />
        </>
    )
}