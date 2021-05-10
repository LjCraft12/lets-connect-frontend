import {useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link';
import Image from "next/image";
import {FaImage} from "react-icons/fa";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {API_URL} from "@/config/index";
import styles from '@/styles/Form.module.css'
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import moment from "moment";
import ImageUpload from "@/components/ImageUpload";
import {parseCookie} from "@/helpers/index";

export default function EditEventPage({evt, token}) {
    const [values, setValues] = useState({
        name: evt.name,
        host: evt.host,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    })
    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const imageUploaded = async () => {
        const res = await fetch(`${API_URL}/events/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }
    const handleSubmit = async e => {
        e.preventDefault();
        // Check for values
        const hasEmptyFields = Object.values(values).some(el => el === '')
        if (hasEmptyFields) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })
        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('You know you are not authorized to do that! Go on now! GET!')
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
            <h1>Edit Event</h1>
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
                        <input type="date" id={'date'} name={'date'} value={moment(values.date).format('yyyy-MM-DD')}
                               onChange={handleInputChange}/>
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
                <input type="submit" value={'Update Event'} className={'btn'}/>
            </form>

            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170}/>
            ) : (
                <div>
                    <h4>No Image Set</h4>
                </div>
            )}

            <div>
                <button onClick={() => setShowModal(true)} className="btn-secondary">
                    <FaImage/> Update Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token}/>
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({params: {id}, req}) {
    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()
    const {token} = parseCookie(req)


    return {
        props: {evt, token}
    }
}