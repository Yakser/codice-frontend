import React from 'react';
import theme from "@/app/[slug]/theme";
import SyntaxHighlighter from "@/app/[slug]/SyntaxHighlighter";
import {JetBrains_Mono} from "next/font/google";

const jetbrains_mono = JetBrains_Mono(
    {
        subsets: ['latin', 'cyrillic'],
        display: 'swap',
    }
)

type CodeViewProps = {
    language: string;
    content: string;
}


const CodeView: React.FC<CodeViewProps> = ({language, content}) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={theme}
            customStyle={{
                backgroundColor: "transparent",
                padding: "2rem",
                fontFamily: jetbrains_mono.style.fontFamily,
                fontStyle: jetbrains_mono.style.fontStyle,
                fontWeight: jetbrains_mono.style.fontWeight,
            }}
            showLineNumbers={true}
        >
            {content}
        </SyntaxHighlighter>
    );
};

export default CodeView;