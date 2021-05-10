import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css'
import Layout from "@/components/Layout";
import {parseCookie} from "@/helpers/index";

export default function AddEventPage({token}) {
    const router = useRouter();
    const [values, setValues] = useState({
        name: '',
        host: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    })

    const handleSubmit = async e => {
        e.preventDefault();
        // Check for values
        const hasEmptyFields = Object.values(values).some(el => el === '')
        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something went wrong!')
        } else {
            const evt = await res.json();
            await router.push(`/events/${evt.slug}`)
        }
    }

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})

    }

    return (
        <Layout title={'Add new event'}>
            <Link href={'/events'}>Go Back</Link>
            <h1>Add Event</h1>
            <ToastContainer/>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">
                            Event Name
                        </label>
                        <input type="text" id={'name'} name={'name'} value={values.name} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="host">
                            Event Host(s)
                        </label>
                        <input type="text" id={'host'} name={'host'} value={values.host} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="venue">
                            Event Location
                        </label>
                        <input type="text" id={'venue'} name={'venue'} value={values.venue}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="address">
                            Event Address
                        </label>
                        <input type="text" id={'address'} name={'address'} value={values.address}
                               onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="host">
                            Event Date
                        </label>
                        <input type="date" id={'date'} name={'date'} value={values.date} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="host">
                            Event Time
                        </label>
                        <input type="text" id={'time'} name={'time'} value={values.time} onChange={handleInputChange}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="description">
                        Event Description
                    </label>
                    <textarea name="description" id="description" value={values.description}
                              onChange={handleInputChange}>

                    </textarea>
                </div>
                <input type="submit" value={'Add Event'} className={'btn'}/>
            </form>
        </Layout>
    )
}

export async function getServerSideProps ({req}) {
    const {token} = parseCookie(req)
    console.log(token)
    return {
        props: {
            token
        }
    }
}