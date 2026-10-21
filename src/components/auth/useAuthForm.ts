import { useId, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type Values<F extends string> = Record<F, string>;
type Errors<F extends string> = Partial<Record<F, string>>;

export const useAuthForm = <F extends string>(
    initialValues: Values<F>,
    validate: (values: Values<F>) => Errors<F>,
    submit: (values: Values<F>) => Promise<void>,
    failureMessage: string,
) => {
    const idPrefix = useId();
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Errors<F>>({});
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const fieldId = (field: F) => `${idPrefix}-${field}`;

    const fieldProps = (field: F) => ({
        id: fieldId(field),
        name: field,
        value: values[field],
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setValues(prev => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
        },
        'aria-invalid': errors[field] ? true : undefined,
        'aria-describedby': errors[field] ? `${fieldId(field)}-error` : undefined,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError('');
        const nextErrors = validate(values);
        setErrors(nextErrors);
        const firstInvalid = (Object.keys(nextErrors) as F[])[0];
        if (firstInvalid) {
            document.getElementById(fieldId(firstInvalid))?.focus();
            return;
        }

        setLoading(true);
        try {
            await submit(values);
        } catch (error) {
            console.error(error);
            setFormError(failureMessage);
        } finally {
            setLoading(false);
        }
    };

    return { fieldId, fieldProps, errors, formError, loading, handleSubmit };
};
