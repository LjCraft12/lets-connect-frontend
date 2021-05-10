import Layout from "@/components/Layout";
import styles from '@/styles/404.module.css'
import {useRouter} from "next/router";
import Link from 'next/link'
import {FaExclamationTriangle} from 'react-icons/fa'

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <Layout title={'Page Not Found'}>
            <div className={styles.error}>
                <h1> <FaExclamationTriangle/> 404</h1>
                <h3>Sorry, nothing here</h3>
                <Link href={'/'}><a>Go Back</a></Link>
            </div>
        </Layout>
    )
}