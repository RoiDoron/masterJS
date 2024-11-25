import { useEffect, useState } from "react"
import { codeServiceLocal } from "../services/code-block.service-local"
import { useNavigate, useParams } from "react-router"
import { TextEditor } from "../cmps/TextEditor"


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
        codeServiceLocal.getById(codeId)
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
            <h1>{code.name}</h1>
            <TextEditor codeToEdit={code} isMentor={mentor}/>
        </section>
    )
}