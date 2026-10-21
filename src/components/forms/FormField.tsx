import type { ReactNode } from 'react';
import classes from '../../styles/components/Form.module.css';

interface FormFieldProps {
    id: string;
    label: string;
    required?: boolean;
    optional?: boolean;
    error?: string;
    children: ReactNode;
}

const FormField = ({ id, label, required, optional, error, children }: FormFieldProps) => (
    <div className={classes.field}>
        <label htmlFor={id} className={classes.label}>
            {label}
            {required && <span className={classes.required} aria-hidden="true"> *</span>}
            {optional && <span className={classes.optional}> (optional)</span>}
        </label>
        {children}
        {error && <p id={`${id}-error`} className={classes.error}>{error}</p>}
    </div>
);

export default FormField;
