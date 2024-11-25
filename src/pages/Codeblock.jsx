import { useEffect, useState } from "react"
import { codeServiceLocal } from "../services/code-block.service-local"
import { useNavigate, useParams } from "react-router"
import { TextEditor } from "../cmps/TextEditor"
import { codeService } from "../services/code-block.service"


export function Codeblock() {
    const navigate = useNavigate()
    const [code, setCode] = useState()
    const { codeId } = useParams()
    const mentor = false // need to continue

    useEffect(() => {
        if (!code) loadCode()
    }, [])

    function loadCode() {
        console.log('hi')
        codeService.getById(codeId)
            .then(code => {
                setCode(code)
            })
            .catch(err => {
                console.log('Hade issues wite loading code', err)
                navigate('/')
            })
    }

    if (!code) return <div>Loading ...</div>
    return (
        <section className="code-block  flex align-center column">
            {mentor ? <div className="indicator" style={{backgroundColor:'#c3eddf'}}>Mentor</div>
                : <div className="indicator" style={{backgroundColor:'#ee9b00'}}>Student</div>}
            <h1>{code.name}</h1>
            <TextEditor initialCode={code.initialCode} solution={code.solution} isMentor={mentor} />
        </section>
    )
}