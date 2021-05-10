import Head from 'next/head'
import {useRouter} from "next/router";
import styles from '@/styles/Layout.module.css'
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "@/components/Showcase";

export default function Layout({title, keywords, description, children}) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name={'description'} content={description}/>
                <meta name={keywords} content={keywords}/>
            </Head>
            <Header/>
            {router.pathname === '/' && <Showcase/>}
            <div className={styles.container}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Let\'s Connect',
    description: 'Let\'s connect helps you find people, places, and things to do around your area',
    keywords: 'black meetup, tech meetup, have fun, yoga, lets connect, parks and recreation, outdoors, indoors, quarantine fun, events'
}