import { useEffect, useState } from "react";
import { Link } from "react-router";
import { codeServiceLocal } from "../services/code-block.service-local";


export function Lobby() {
    const [codes, setCodes] = useState()

    useEffect(() => {
        if (!codes) loadCodes()
    }, [])

    function loadCodes() {
        console.log('load code')
        codeServiceLocal.query().then(codes => setCodes(codes))
    }
    return (
        <section>
            <h1>Choose code block</h1>

            {codes ?
                (codes.map(code => (
                    <Link to={`/codeblock/${code._id}`}>
                        <h3>{code.name}</h3>
                    </Link>)))
                : <div>is loading</div>
            }

        </section>
    )
}