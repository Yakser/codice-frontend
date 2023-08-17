import '../scss/style.scss';

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";

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
                <h1 className={styles.main__title}>
                    <Image
                        src="/logo.svg"
                        width={100}
                        height={100}
                        alt="Codice logo"
                    />
                    codice - paste tool</h1>
                <div className={styles.main__backgroundWrapper}>
                </div>
                {children}
            </div>
        </main>
        </body>
        </html>
    )
}
