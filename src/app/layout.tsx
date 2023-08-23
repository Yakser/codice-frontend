import '../scss/style.scss';

import type {Metadata} from 'next'
import {Inter, Roboto} from 'next/font/google'
import styles from "@/app/page.module.scss";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const inter = Inter({subsets: ['latin', 'cyrillic'], display: 'swap'});

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
                    <Link href={'/'} className={styles.main__link}>
                        <Image
                            src="/logo.svg"
                            width={50}
                            height={50}
                            alt="Codice logo"
                        />
                        codice - paste tool
                    </Link>
                </h1>
                <div className={styles.main__backgroundWrapper}>
                </div>
                {children}
            </div>
        </main>
        </body>
        </html>
    )
}
