import { useSelector } from "react-redux";
import { Link } from "react-router";

export function AppHeader() {
    const role = useSelector(storeState => storeState.roleModule.role)
    const studentCount = useSelector(storeState => storeState.roleModule.studentCount)

    return (
        <header className="app-header flex justify-space-between align-center">
            <Link to='/'>
                <h1>Coding With Tom</h1>
            </Link>
            <div className="flex">

                {studentCount > 0 ? <div className="indicator student-count"> Students:{studentCount}</div> : <></>}
                {role ?
                    (role === 'instructor' ? <div className="indicator" style={{ backgroundColor: '#c3eddf' }}>Mentor</div>
                        : <div className="indicator" style={{ backgroundColor: '#ee9b00' }}>Student</div>) : <></>
                }
            </div>
        </header>
    )
}