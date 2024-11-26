import { useEffect, useState } from "react";
import { Link } from "react-router";
import { codeServiceLocal } from "../services/code-block.service-local";
import { codeService } from "../services/code-block.service";
import { setRole } from "../store/actions/role.action";
import { useSelector } from "react-redux";
import { SOCKET_EVENT_ASSIGN_ROLE, SOCKET_EMIT_MY_ROLE, socketService } from "../services/socket.service";


export function Lobby() {
    const [codes, setCodes] = useState()
    const role = useSelector(storeState => storeState.roleModule.role)

    useEffect(() => {
        if (!codes) loadCodes()

        socketService.emit(SOCKET_EMIT_MY_ROLE, role);

        socketService.on(SOCKET_EVENT_ASSIGN_ROLE, (role) => {
            console.log("Received role:", role);
            setRole(role)
        });

        return () => {
            socketService.off('assignRole');
        }

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