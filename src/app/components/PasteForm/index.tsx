"use client"

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'

import {FieldValues, useForm} from 'react-hook-form';
import styles from './index.module.scss';
import axios, {AxiosError} from "axios";
import Select from "@/app/components/Select";
import {Option as OptionType} from "@/app/components/Select/Option";


type FormInputs = {
    title: string,
    content: string,
    description: string,
    slug: string,
}

type ErrorResponse = {
    detail: string;
}

const LANGUAGES: OptionType[] = [
    {
        title: "Python",
        value: "python",
    },
    {
        title: "Javascript",
        value: "javascript",
    },
    {
        title: "Markdown",
        value: "md",
    },
    {
        title: "C/C++",
        value: "C/C++",
    },
];

const PasteForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [slug, setSlug] = useState<string>("");

    const [selectedLanguageValue, setSelectedLanguageValue] = useState("");
    const selectedLanguageTitle = LANGUAGES.find(item => item.value === selectedLanguageValue);


    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: {isSubmitSuccessful, errors},
        setError,
    } = useForm<FormInputs>();

    const onSubmit = async (data: FieldValues) => {
        if (data?.slug?.length === 0) {
            data.slug = null;
        }
        try {
            setIsLoading(true);
            data['language'] = selectedLanguageValue;
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pastes/`, data);
            const slug = response.data.slug;
            setSlug(slug);
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                const data = err.response.data as ErrorResponse;
                setError("slug", {
                    type: "server", message: data.detail
                });
            } else {
                setError("root", {
                    type: "server", message: "Server not available!"
                });
            }
        } finally {
            setIsLoading(false);
        }

    }

    const onSelectChange = (value: string) => {
        setSelectedLanguageValue(value);
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            router.push(`/${slug}`, {scroll: false});
        }
    }, [formState, reset]);

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <label
                className={styles.form__label}
            >
                <input
                    className={styles.form__mainInput}
                    type={'text'}
                    {...register('title', {})}
                    placeholder={'Title'}
                />
            </label>
            <textarea
                className={`${styles.form__input} ${styles.form__input_content}`}
                cols={30}
                rows={15}
                {...register('content', {
                        required: true,
                    }
                )}
                placeholder={'Content'}
            />
            {errors.content?.type === "required" && (
                <p className={styles.form__error}>
                    Content can't be empty
                </p>
            )}
            <Select selected={selectedLanguageTitle || null}
                    options={LANGUAGES}
                    onChange={onSelectChange}
                    placeholder={'Select language'}
            />
            <textarea
                cols={30}
                rows={3}
                className={`${styles.form__input} ${styles.form__input_description}`}
                {...register('description',
                    {
                        maxLength: 500
                    })}
                placeholder={'Description (optional)'}
            />
            {errors.description?.type === "maxLength" && (
                <p className={styles.form__error}>
                    Description length must be less than 500
                </p>
            )}
            <input
                className={styles.form__input}
                type={'text'}
                {...register('slug',
                    {
                        pattern: /^[-\w]+$/i,
                        maxLength: 255,
                    }
                )}
                placeholder={'Custom slug (optional)'}
            />
            {errors.slug?.type === "pattern" && (
                <p className={styles.form__error}>
                    Slug field must contain only letters, digits, or '_'
                </p>
            )}
            {errors.slug?.type === "maxLength" && (
                <p className={styles.form__error}>
                    Slug length must be less than 256
                </p>
            )}
            {errors.slug?.type === "server" && (
                <p className={styles.form__error}>
                    {errors.slug.message}
                </p>
            )}
            {errors.root && (
                <p className={styles.form__error}>
                    {errors.root.message}
                </p>
            )}

            <button
                className={styles.form__submit}
                type={'submit'}
                disabled={isLoading}
            >
                {isLoading ? "Creating..." : "Create"}
            </button>
        </form>
    );
};

export default PasteForm;