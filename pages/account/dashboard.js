import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import {parseCookie} from "@/helpers/index";
import {useRouter} from "next/router";
import {API_URL} from "@/config/index";
import styles from '@/styles/Dashboard.module.css'
import {toast} from "react-toastify";

export default function DashboardPage({token, events}) {
    const router = useRouter()
    if (!token) router.push('/')

    const deleteEvent = async (id) => {
        if (confirm(`Are you sure you want to delete event`)) {
            const res = await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
            } else {
                await router.push('/account/dashboard')
            }
        }
    }

    return (
        <Layout title={`User Dashboard`}>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map(event => (
                    <DashboardEvent key={event.id} evt={event} handleDelete={deleteEvent}>{event.name}</DashboardEvent>
                ))}
            </div>

        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const {token} = parseCookie(req)
    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()
    console.log(events)
    return {
        props: {
            token,
            events
        }
    }
}



