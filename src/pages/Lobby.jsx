import { Link } from "react-router";


export function Lobby() {
    return (
        <section>
            <h1>Choose code block</h1>
            <Link to={'/codeblock'}>
            <h3>Async case</h3>
            </Link>
        </section>
    )
}