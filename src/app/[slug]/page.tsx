import React from 'react';
import SyntaxHighlighter from "@/app/[slug]/SyntaxHighlighter";
import styles from './page.module.scss'
import theme from "@/app/[slug]/theme";
import CopyButton from "@/app/components/CopyButton";
import Link from "next/link";

type PasteDetail = {
    id: number;
    title: string | null;
    description: string | null;
    author: string | null;
    content: string;
    slug: string;
    language: string | null;
}

const getPaste = async (slug: string): Promise<PasteDetail> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pastes/${slug}/`,
        {cache: 'force-cache'});
    return response.json();
}

const Paste = async ({params}: { params: { slug: string } }) => {
    const paste = await getPaste(params.slug);
    return (
        <>
            {
                paste.slug ? (
                        <article className={styles.paste}>
                            <h2 className={styles.paste__title}>{paste.title}</h2>
                            <div className={styles.paste__content}>
                                <CopyButton
                                    textToCopy={paste.content}
                                    className={styles.paste__copy}
                                />
                                <SyntaxHighlighter
                                    language={paste.language || ""}
                                    style={theme}
                                    customStyle={{
                                        backgroundColor: "transparent",
                                        padding: "2rem",
                                        fontFamily: "JetBrains Mono",
                                    }}
                                    showLineNumbers={true}
                                >
                                    {paste.content}
                                </SyntaxHighlighter>
                            </div>
                            <p className={styles.paste__description}>{paste.description}</p>

                            <Link href={'/'} className={styles.paste__link}>
                                Create another paste
                            </Link>
                        </article>
                    )
                    :
                    (
                        <>
                            <h2>Not found</h2>
                        </>
                    )
            }
        </>
    )
};

export default Paste;