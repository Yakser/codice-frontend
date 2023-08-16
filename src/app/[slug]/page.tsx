import React from 'react';
import SyntaxHighlighter from "@/app/[slug]/SyntaxHighlighter";
import styles from './page.module.scss'
import theme from "@/app/[slug]/theme";
import CopyButton from "@/app/components/CopyButton";
import Link from "next/link";
import {Metadata, ResolvingMetadata} from 'next'

type PasteProps = {
    params: { slug: string };
}

type PasteDetail = {
    id: number;
    title: string | null;
    description: string | null;
    author: string | null;
    content: string;
    slug: string;
    language: string | null;
}

const getPaste = async (slug: string): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pastes/${slug}/`,
        {cache: 'force-cache'});
}

export async function generateMetadata(
    {params: {slug}}: PasteProps,
    parent: ResolvingMetadata
): Promise<Metadata> {


    try {
        const response = await getPaste(slug);
        if (!response.ok) {
            return {
                title: "Not found!",
            }
        }
        const paste = await response.json();

        return {
            title: paste.title,
            description: paste.description,
            openGraph: {
                title: paste.title,
                description: paste.description,
                type: "article",
            },
        }

    } catch (error) {
        return {
            title: "Server error!",
        }
    }


}

const Paste: React.FC<PasteProps> = async ({params}: { params: { slug: string } }) => {
    try {
        const response = await getPaste(params.slug);
        if (response.ok) {
            const paste = await response.json() as PasteDetail;

            return (
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
        }
        return (
            <h2>Not found</h2>
        )
    } catch (error) {
        return (
            <h2>Server error!</h2>
        )
    }
};

export default Paste;