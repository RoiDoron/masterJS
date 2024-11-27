import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"

export function UserMsg() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {  //using an event bus to pop the message from anywhere
            setMsg(msg)
        })
        return unsubscribe
    }, [])

    if (!msg) return <span></span>
    return (
        <section className={`user-msg`}>
            😁
        </section>
    )
}
