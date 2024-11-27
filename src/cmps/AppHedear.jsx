import { useSelector } from "react-redux";
import { Link } from "react-router";
import { setRole, setStudentCount } from "../store/actions/role.action";
import { useEffect } from "react";
import { SOCKET_EVENT_STUDENT_COUNT, socketService } from "../services/socket.service";


export function AppHeader() {
    const role = useSelector(storeState => storeState.roleModule.role)
    const studentCount = useSelector(storeState => storeState.roleModule.studentCount)

    useEffect(() => {

        

    }, [])

    // function restRole() {
    //     setRole('')
    // }

    return (
        <header className="app-header flex justify-space-between align-center">
            <Link  to='/'>
                <h1>Coding With Tom</h1>
            </Link>
            <div className="flex">

                {studentCount > 0 ? <div className="indicator"> Student:{studentCount}</div> : <></>}
                {role ?
                    (role === 'instructor' ? <div className="indicator" style={{ backgroundColor: '#c3eddf' }}>Mentor</div>
                        : <div className="indicator" style={{ backgroundColor: '#ee9b00' }}>Student</div>) : <></>
                }
            </div>


        </header>
    )
}