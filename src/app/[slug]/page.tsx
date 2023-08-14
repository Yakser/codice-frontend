import React from 'react';
import {xt256} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from "@/app/[slug]/SyntaxHighlighter";
import styles from './page.module.scss'
import theme from "@/app/[slug]/theme";

type PasteDetail = {
    id: number;
    title: string | null;
    description: string | null;
    author: string | null;
    content: string;
    slug: string;
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
                            <svg height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path
                                    d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                                <path
                                    d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                            </svg>
                            <SyntaxHighlighter
                                style={theme}
                                customStyle={{
                                    backgroundColor: "transparent",
                                    borderRadius: "1rem",
                                    border: ".1rem solid var(--color-white)",
                                    padding: "2rem",
                                    fontFamily: "JetBrains Mono",
                                }}
                                showLineNumbers={true}
                            >
                                {paste.content}
                            </SyntaxHighlighter>
                            <p className={styles.paste__description}>{paste.description}</p>
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