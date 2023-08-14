"use client"

import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation'

import {FieldValues, useForm} from 'react-hook-form';
import styles from './index.module.scss';
import axios from "axios";

const PasteForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: {isSubmitSuccessful, errors},
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        if (data?.slug?.length === 0) {
            data.slug = null;
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pastes/`, data);
        console.log(response);
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
            // router.push('/dashboard', { scroll: false })
        }
    }, [formState, reset]);

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}>
            <input
                className={styles.form__mainInput}
                type={'text'}
                {...register('title')}
                placeholder={'Title'}
            />
            <textarea
                className={`${styles.form__input} ${styles.form__input_content}`}
                cols={30}
                rows={15}
                {...register('content')}
                placeholder={'Content'}
            />
            <textarea
                cols={30}
                rows={3}
                className={`${styles.form__input} ${styles.form__input_description}`}
                {...register('description')}
                placeholder={'Description (optional)'}
            />
            <input
                className={styles.form__input}
                type={'text'}
                {...register('slug')}
                placeholder={'Custom slug (optional)'}
            />
            <button
                className={styles.form__submit}
                type={'submit'}>
                Create
            </button>
        </form>
    );
};

export default PasteForm;