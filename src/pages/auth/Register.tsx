import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validation';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuthForm } from '../../components/auth/useAuthForm';
import FormField from '../../components/forms/FormField';
import PasswordInput from '../../components/forms/PasswordInput';
import formClasses from '../../styles/components/Form.module.css';

type Field = 'name' | 'email' | 'password';

const validate = (values: Record<Field, string>) => {
    const errors: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) errors.name = 'Name is required';
    if (!values.email.trim()) errors.email = 'Email is required';
    else if (!isValidEmail(values.email)) errors.email = 'Email is invalid';
    if (!values.password) errors.password = 'Password is required';
    return errors;
};

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const { fieldId, fieldProps, errors, formError, loading, handleSubmit } = useAuthForm<Field>(
        { name: '', email: '', password: '' },
        validate,
        async values => {
            await register(values.name, values.email, values.password);
            navigate('/dashboard');
        },
        'We couldn’t create your account. Please check your details and try again.',
    );

    return (
        <AuthLayout
            eyebrow="Join us"
            title={<>Create an <em>account</em></>}
            subtitle="Start your journey with handmade candles."
            footer={<>Already have an account? <Link to="/login" className="text-link">Log in</Link></>}
        >
            <form className={`${formClasses.form} ${formClasses.authForm}`} onSubmit={handleSubmit} noValidate>
                {formError && <p className={formClasses.summary} role="alert">{formError}</p>}
                <FormField id={fieldId('name')} label="Name" error={errors.name}>
                    <input type="text" autoComplete="name" placeholder="Your name" className={formClasses.input} {...fieldProps('name')} />
                </FormField>
                <FormField id={fieldId('email')} label="Email" error={errors.email}>
                    <input type="email" autoComplete="email" placeholder="you@example.com" className={formClasses.input} {...fieldProps('email')} />
                </FormField>
                <FormField id={fieldId('password')} label="Password" error={errors.password}>
                    <PasswordInput autoComplete="new-password" placeholder="Create a password" {...fieldProps('password')} />
                </FormField>
                <button type="submit" className={`pill-btn pill-btn-primary ${formClasses.submit}`} disabled={loading}>
                    {loading ? 'Creating account…' : 'Create account'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
