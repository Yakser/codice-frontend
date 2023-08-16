import React, {useEffect, useRef} from 'react';
import styles from './index.module.scss';

export type Option = {
    title: string;
    value: string;
};

type OptionProps = {
    option: Option;
    onClick: (value: Option['value']) => void;
}

const Option: React.FC<OptionProps> = ({option, onClick}) => {
    const optionRef = useRef<HTMLLIElement>(null);

    const onOptionClick = (clickedValue: Option['value']) => {
        return () => {
            onClick(clickedValue);
        }
    }

    useEffect(() => {
        const optionElement = optionRef.current;
        if (!optionElement) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onClick(option.value);
            }
        }

        optionElement.addEventListener('keydown', onKeyDown);

        return () => {
            optionElement.removeEventListener('keydown', onKeyDown);
        }

    }, [option, onClick]);

    return (
        <li
            className={styles.option}
            value={option.value}
            onClick={onOptionClick(option.value)}
            tabIndex={0}
            ref={optionRef}
        >
            {option.title}
        </li>
    );
};

export default Option;