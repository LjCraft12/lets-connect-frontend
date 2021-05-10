import Link from "next/link";
import Layout from "@/components/Layout";
export default function AboutPage() {
    return (
        <Layout title={'About Let\'s Connect'}>
            <h1>About</h1>
            <p>This is an app to find whats going on around your city.</p>
            <p>Version 1.0.0</p>
        </Layout>
    )
}