"use client"

import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './index.module.scss';
import axios from "axios";

const PasteForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`).then(
            (response) => {
                console.log(response);
            }
        )
    }

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
                cols="30"
                rows="15"
                {...register('content')}
                placeholder={'Content'}
            />
            <textarea
                cols="30"
                rows="3"
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