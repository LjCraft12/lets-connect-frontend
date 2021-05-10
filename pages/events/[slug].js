import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import Link from 'next/link'
import Image from "next/image";
import {FaPenAlt, FaTimes} from 'react-icons/fa'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Event.module.css'
import EventMap from "@/components/EventMap";
export default function EventPage({evt}) {


    return (
        <Layout title={`${evt.name}`}>
            <div className={styles.event}>

                <span>
                    {new Date(evt.date).toLocaleDateString('en-us')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                <ToastContainer/>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image.formats.medium.url} height={600} width={1000} atl={evt.name}/>
                    </div>
                )}
                <h3>Host:</h3>
                <p>{evt.host}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>
                <EventMap evt={evt}/>
                <Link href={'/events'}><a className={styles.back}>{'<'} Go Back</a></Link>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({query: {slug}}) {
    console.log(slug)
    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    const events = await res.json()
    return {
        props: {
            evt: events[0]
        },
    }
}

// export async function getStaticPaths() {
//     const res = await fetch(`${API_URL}/events`)
//     const events = await res.json();
//     const paths = events.map(evt => ({
//         params: {slug: evt.slug}
//     }))
//     return {
//         paths,
//         fallback: false
//     }
// }
//
// export async function getStaticProps({params: {slug}}) {
//     const res = await fetch(`${API_URL}/events?slug=${slug}`)
//     const events = await res.json()
//
//     return {
//         props: {
//             evt: events[0]
//         },
//         revalidate: 1
//     }
// }