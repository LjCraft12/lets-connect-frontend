import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({title, keywords, description, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name={'description'} content={description}/>
                <meta name={keywords} content={keywords}/>
            </Head>
            <Header/>
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