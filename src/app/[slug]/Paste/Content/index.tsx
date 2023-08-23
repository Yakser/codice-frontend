import React from 'react';
import styles from "@/app/[slug]/Paste/index.module.scss";
import CopyButton from "@/app/components/CopyButton";
import MarkdownView from "@/app/[slug]/Paste/Content/MarkdownView";
import CodeView from "@/app/[slug]/Paste/Content/CodeView";


type ContentProps = {
    content: string;
    language: string;
}


const Content: React.FC<ContentProps> = ({content, language}) => {
    return (
        <div className={styles.paste__content}>
            <CopyButton
                textToCopy={content}
                className={styles.paste__copy}
            />
            {
                language === 'md' ? (
                    <MarkdownView content={content}/>
                ) : (
                    <CodeView language={language} content={content}/>
                )
            }


        </div>
    );
};

export default Content;