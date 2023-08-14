import '../scss/style.scss';

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import styles from "@/app/page.module.scss";

const inter = Inter({subsets: ['latin', 'cyrillic']})

export const metadata: Metadata = {
    title: 'codice',
    description: 'codice - paste tool',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <main className={styles.main}>
            <div className={styles.main__wrapper}>
                {children}
            </div>
        </main>
        </body>
        </html>
    )
}
