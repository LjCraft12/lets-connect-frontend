import Link from 'next/link'
import Head from 'next/head'
import {API_URL, PER_PAGE} from "@/config/index";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";


export default function EventsPage({events, page, total}) {
    const lastPage = Math.ceil(total / PER_PAGE);

    return (
        <Layout>
            <h1>Connections</h1>

            {/* Check for events */}
            {events.length === 0 && <h3>No connections to be found</h3>}

            {/* Show available events */}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt}/>
            ))}

            {page > 1 && (
                <Link href={`/events?page=${page - 1 }`}><a className={'btn-secondary'}>Prev</a></Link>
            )}

            {page < lastPage && (
                <Link href={`/events?page=${page + 1 }`}><a className={'btn-secondary'}>Next</a></Link>
            )}
        </Layout>
    )
}

export async function getServerSideProps({query: {page = 1}}) {
    const startPage = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    // Fetch total count of events
    const totalRes = await fetch(`${API_URL}/events/count`)
    const total = await totalRes.json();
    // Fetch events
    const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${startPage}`)
    const events = await eventRes.json();
    return {
        props: {events, page: +page, total}
    }
}