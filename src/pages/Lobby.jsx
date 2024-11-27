import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { loadCodes } from "../store/actions/code.action";


export function Lobby() {
    const codes = useSelector(storeState => storeState.codeModule.codes)

    useEffect(() => {
         loadCodes() // load all codes to the store for editing theme on real time on every user
    }, [])

    return (
        <section className="lobby flex column align-center">
            <h1>Choose code block</h1>

            {codes ?
                (codes.map(code => (
                    <Link className="task-link" key={code._id} to={`/codeblock/${code._id}`}>
                        <h4>{code.name}</h4>
                    </Link>)))
                : <div>is loading</div>
            }

        </section>
    )
}