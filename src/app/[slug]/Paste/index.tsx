import React from 'react';
import styles from "./index.module.scss";
import CopyButton from "@/app/components/CopyButton";
import SyntaxHighlighter from "@/app/[slug]/SyntaxHighlighter";
import theme from "@/app/[slug]/theme";
import Link from "next/link";
import {PasteDetail} from "@/app/[slug]/page";
import Content from "@/app/[slug]/Paste/Content";


type PasteProps = {
    paste: PasteDetail;
}

const Paste: React.FC<PasteProps> = ({paste}) => {
    return (
        <article className={styles.paste}>
            <h2 className={styles.paste__title}>{paste.title}</h2>
            <Content content={paste.content} language={paste.language || ""}/>
            <p className={styles.paste__description}>{paste.description}</p>
            <Link href={'/'} className={styles.paste__link}>
                Create another paste
            </Link>
        </article>
    )
        ;
};

export default Paste;