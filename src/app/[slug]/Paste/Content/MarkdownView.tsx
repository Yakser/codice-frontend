import React from 'react';
import styles from "@/app/[slug]/Paste/index.module.scss";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import {Roboto} from "next/font/google";

const roboto = Roboto({
    weight: ["300", "400", "500", "700", "900",],
    style: ['normal', 'italic'],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
});

type MarkdownViewProps = {
    content: string;
}

const MarkdownView: React.FC<MarkdownViewProps> = ({content}) => {
    return (
        <ReactMarkdown
            className={`${styles.paste__content_markdown} ${roboto.className}`}
            children={content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        />
    );
};

export default MarkdownView;