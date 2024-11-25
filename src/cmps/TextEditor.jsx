import { useState } from "react"
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'; // Import the base CodeMirror styles
import 'codemirror/mode/javascript/javascript'; // Import the JavaScript mode

export function TextEditor({ codeToEdit,isMentor }) {
    const [code, setCode] = useState(codeToEdit)

    return (
        <>
            {/* <form className="flex column align-center text-form" action="">
                <textarea className="text-area" name="codeArea" >{code.initialCode}</textarea>
                <button>Submit</button>
            </form> */}


            <CodeMirror
                value={code.initialCode}
                options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true,
                    readOnly:isMentor
                }}
                onChange={(editor, data, value) => {
                }}
            />
            
        </>
    )
}