import { useId, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { messageService } from '../../services/message.service';
import FormField from './FormField';
import classes from '../../styles/components/Form.module.css';

type Field = 'name' | 'email' | 'subject' | 'message';
type FormData = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

interface ContactFormProps {
    subjectFallback: string;
}

const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };

const validate = (data: FormData): Errors => {
    const errors: Errors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
    if (!data.message.trim()) errors.message = 'Message is required';
    return errors;
};

const ContactForm = ({ subjectFallback }: ContactFormProps) => {
    const idPrefix = useId();
    const summaryRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const fieldId = (field: Field) => `${idPrefix}-${field}`;
    const errorEntries = Object.entries(errors).filter(([, message]) => message) as [Field, string][];

    const inputProps = (field: Field) => ({
        id: fieldId(field),
        name: field,
        value: formData[field],
        onChange: handleChange,
        'aria-invalid': errors[field] ? true : undefined,
        'aria-describedby': errors[field] ? `${fieldId(field)}-error` : undefined,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const field = e.target.name as Field;
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    const focusField = (e: MouseEvent<HTMLAnchorElement>, field: Field) => {
        e.preventDefault();
        document.getElementById(fieldId(field))?.focus();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const nextErrors = validate(formData);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            requestAnimationFrame(() => summaryRef.current?.focus());
            return;
        }

        setIsSubmitting(true);
        try {
            await messageService.sendMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.subject || subjectFallback,
                body: formData.message,
            });
            setFormData(EMPTY_FORM);
            setIsSent(true);
        } catch {
            toast.error('Failed to send message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSent) {
        return (
            <div className={`${classes.card} ${classes.success}`} role="status">
                <CheckCircle2 size={36} strokeWidth={1.25} className={classes.successIcon} aria-hidden="true" />
                <h3 className={classes.title}>Thank you — your message is on its way.</h3>
                <p className={classes.successText}>We read every message and will be in touch soon.</p>
                <button type="button" className="text-link" onClick={() => setIsSent(false)}>
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className={classes.card}>
            <h3 className={classes.title}>Send us a message</h3>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                {errorEntries.length > 0 && (
                    <div ref={summaryRef} tabIndex={-1} role="alert" className={classes.summary}>
                        <p>Please check the following:</p>
                        <ul>
                            {errorEntries.map(([field, message]) => (
                                <li key={field}>
                                    <a href={`#${fieldId(field)}`} onClick={e => focusField(e, field)}>{message}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className={classes.row}>
                    <FormField id={fieldId('name')} label="Name" required error={errors.name}>
                        <input type="text" autoComplete="name" aria-required="true" className={classes.input} {...inputProps('name')} />
                    </FormField>
                    <FormField id={fieldId('email')} label="Email" required error={errors.email}>
                        <input type="email" autoComplete="email" aria-required="true" className={classes.input} {...inputProps('email')} />
                    </FormField>
                </div>
                <FormField id={fieldId('subject')} label="Subject">
                    <input type="text" className={classes.input} {...inputProps('subject')} />
                </FormField>
                <FormField id={fieldId('message')} label="Message" required error={errors.message}>
                    <textarea rows={5} aria-required="true" className={`${classes.input} ${classes.textarea}`} {...inputProps('message')} />
                </FormField>
                <button type="submit" className={`pill-btn pill-btn-primary ${classes.submit}`} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : <>Send message <ArrowRight size={15} aria-hidden="true" /></>}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
