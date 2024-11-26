import { useSelector } from "react-redux";
import { Link } from "react-router";


export function AppHeader() {
    const role = useSelector(storeState => storeState.roleModule.role)
    return (
        <header className="app-header flex justify-space-between align-center">
            <Link to='/'>
            <h1>Coding With Tom</h1>
            </Link>
            {role === 'instructor' ? <div className="indicator" style={{ backgroundColor: '#c3eddf' }}>Mentor</div>
            : <div className="indicator" style={{ backgroundColor: '#ee9b00' }}>Student</div>} 
        
        </header>
    )
}