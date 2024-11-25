import { Link } from "react-router";


export function AppHeader() {
    return (
        <header className="app-header">
            <Link to='/'>
            <h1>Coding With Tom</h1>
            </Link>
        </header>
    )
}