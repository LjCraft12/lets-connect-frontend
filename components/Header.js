import {useContext} from "react";
import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from "@/components/Search";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import AuthContext from "@/context/AuthContext";

export default function Header() {
    const {user, logout} = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={'/'}><a>Let's Connect</a></Link>
            </div>
            <Search/>
            <nav>
                <ul>
                    <li>
                        <Link href={'/about'}><a>About</a></Link>
                    </li>
                    <li>
                        <Link href={'/events'}><a>Events</a></Link>
                    </li>
                    {user ? <>
                        {/* if logged in*/}
                        <li>
                            <Link href={'/events/add'}><a>Create Event</a></Link>
                        </li>
                        <li>
                            <Link href={'/account/dashboard'}><a>Dashboard</a></Link>
                        </li>
                        <li>
                            <button onClick={() => logout()} className={'btn-secondary btn-icon'}><FaSignOutAlt/> Logout</button>
                        </li>
                    </> : <>
                        {/* If logged out */}
                        <li>
                            <Link href={'/account/login'}><a
                                className={'btn-secondary btn-icon'}><FaSignInAlt/> Login</a></Link>
                        </li>
                    </>}
                </ul>
            </nav>
        </header>
    )
}