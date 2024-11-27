import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { loadCodes } from "../store/actions/code.action";
import { socketService } from "../services/socket.service";
import { setMentorPosition } from "../store/actions/role.action";


export function Lobby() {
    const codes = useSelector(storeState => storeState.codeModule.codes)
    const mentorPosition = useSelector(storeState => storeState.roleModule.mentorPosition)

    useEffect(() => {
        loadCodes() // load all codes to the store for editing theme on real time on every user

        socketService.on('where-is-mentor', codeId => {
            console.log(codeId);
            
            setMentorPosition(codeId)
        })
    }, [mentorPosition])

    function mentorIn(e,codeId){
        if(mentorPosition != codeId && mentorPosition !=null){
            e.preventDefault()
        }
    }

    return (
        <section className="lobby flex column align-center">
            <h1>Choose code block</h1>

            {codes ?
                (codes.map(code => (
                    <Link onClick={(event)=>mentorIn(event,code._id)} className="task-link" style={mentorPosition === code._id? {backgroundColor:'#c3eddf'}:{cursor:'default'}} key={code._id} to={`/codeblock/${code._id}`}>
                        <h4>{code.name}</h4>
                    </Link>)))
                : <div>is loading</div>
            }

        </section>
    )
}