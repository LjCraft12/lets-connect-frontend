import Layout from "@/components/Layout";
import {FaUser} from "react-icons/fa";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect, useContext} from "react";
import AuthContext from "@/context/AuthContext";
import Link from 'next/link';
import styles from '@/styles/Authform.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login, error} = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        console.log({email, password})
        login({email, password})
    }
    useEffect(() => {
    if(error) {
        toast.error(error)
    }

    })

    return (
        <Layout title={'User Login'}>
            <div className={styles.auth}>
                <h1>
                    <FaUser/> Log In
                </h1>
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id={'email'} value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id={'password'} value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value={'Login'} className={'btn'}/>
                </form>

                <p>Need an account?<Link href={'/account/register'}>Register Here</Link></p>
            </div>
        </Layout>
    )
}