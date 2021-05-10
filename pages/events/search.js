import {API_URL} from "@/config/index";
import Link from 'next/link'
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import qs from 'qs'

export default function SearchPage({events, term}) {

    return (
        <Layout>
            <Link href={'/events'}><a>Go Back</a></Link>
            <h1>Search results for {term}:</h1>

            {/* Check for events */}
            {events.length === 0 && <h3>No connections to be found</h3>}

            {/* Show available events */}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt}/>
            ))}
        </Layout>
    )
}

export async function getServerSideProps({query: {term}}) {
    const query = qs.stringify({
        _where: {
            _or: [
                {name_contains: term},
                {host_contains: term},
                {description_contains: term},
                {venue_contains: term}
            ]
        }
    })
    console.log(query)
    const res = await fetch(`${API_URL}/events?${query}`)
    const events = await res.json();
    console.log(events)
    return {
        props: {events, term},
    }
}