import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { TextEditor } from "../cmps/TextEditor"
import { codeService } from "../services/code-block.service"
import { socketService } from "../services/socket.service"
import { useSelector } from "react-redux"


export function Codeblock() {
    const navigate = useNavigate()
    const [code, setCode] = useState(null)
    const role = useSelector(storeState => storeState.roleModule.role)
    const { codeId } = useParams()

    
    useEffect(() => {
        if (!code) loadCode()
        
    }, [])

    function codeEdit(newCode){

    }
    

    async function loadCode() {
        try {
            const code = await codeService.getById(codeId)
            console.log(code)
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
            <TextEditor initialCode={code.initialCode} solution={code.solution} role={role} />
        </section>
    )
}