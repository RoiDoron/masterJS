import { useEffect, useState } from "react";
import { Link } from "react-router";
import { codeServiceLocal } from "../services/code-block.service-local";
import { codeService } from "../services/code-block.service";


export function Lobby() {
    const [codes, setCodes] = useState()

    useEffect(() => {
        if (!codes) loadCodes()
    }, [])

    function loadCodes() {
        console.log('load code')
        codeService.query().then(codes => setCodes(codes))
    }
    return (
        <section className="lobby flex column align-center">
            <h1>Choose code block</h1>

            {codes ?
                (codes.map(code => (
                    <Link className="tasks-link" key={code._id} to={`/codeblock/${code._id}`}>
                        <h3>{code.name}</h3>
                    </Link>)))
                : <div>is loading</div>
            }

        </section>
    )
}