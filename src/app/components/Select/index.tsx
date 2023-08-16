"use client";

import React, {RefObject, useEffect, useRef, useState} from 'react';
import styles from './index.module.scss';
import Option, {Option as OptionType} from "@/app/components/Select/Option";


export type SelectMode = 'rows' | 'cells';
export type SelectStatus = 'default' | 'invalid';

export type SelectProps = {
    selected: OptionType | null;
    options: OptionType[];
    placeholder?: string;
    mode?: SelectMode;
    status?: SelectStatus;
    onChange?: (selected: OptionType['value']) => void;
    onClose?: () => void;
};

const Select: React.FC<SelectProps> = ({selected, mode, onChange, options, status, onClose, placeholder}) => {
    const [isOpened, setIsOpened] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const onPlaceholderClick = () => {
        setIsOpened(prev => !prev);
    };

    const onOptionClick = (value: OptionType['value']) => {
        setIsOpened(false);
        placeholderRef?.current?.focus();
        onChange?.(value);
    }

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const {target} = event;

            if (target instanceof Node && !rootRef.current?.contains(target)) {
                if (isOpened) {
                    onClose?.();
                }
                setIsOpened(false);
            }
        }
        window.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('click', onClick);

        }
    }, []);

    useEffect(() => {
        const placeholderElement = placeholderRef.current;
        if (!placeholderElement) {
            return;
        }

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                setIsOpened(prev => !prev);
            }
        }

        placeholderElement.addEventListener('keydown', onKeydown);

        return () => {
            placeholderElement.removeEventListener('keydown', onKeydown);
        }

    }, []);


    return (
        <div ref={rootRef} className={styles.select}>

            <div className={`
                        ${styles.select__placeholder} 
                        ${selected?.title ? styles.select__placeholder_selected : ""}
                        ${status === "invalid" ? styles.select__placeholder_invalid : ""
            }`}
                 role={'button'}
                 tabIndex={0}
                 onClick={onPlaceholderClick}
                 ref={placeholderRef}
            >
                {selected?.title || placeholder}
                <svg width={20} height={20} viewBox="0 0 20 20" fill="var(--color-white)" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd"></path>
                </svg>
            </div>
            {
                isOpened && (
                    <ul className={styles.select__list}>
                        {
                            options.map(option =>
                                <Option
                                    key={option.value}
                                    option={option}
                                    onClick={onOptionClick}
                                />
                            )
                        }
                    </ul>
                )
            }
        </div>
    );
};

export default Select;