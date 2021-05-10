import Link from 'next/link'
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

export default function HomePage({events}) {

    return (
        <Layout>
            <h1>Latest's Connections</h1>

            {/* Check for events */}
            {events.length === 0 && <h3>No connections to be found</h3>}

            {/* Show available events */}
            {events.map(evt => (
               <EventItem key={evt.id} evt={evt}/>
            ))}

            {events.length > 0 && (
                <Link href={'/events'}><a className={'btn-secondary'}>View All Connections</a></Link>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
    const events = await res.json();
    return {
        props: {events},
        revalidate: 10,
    }
}