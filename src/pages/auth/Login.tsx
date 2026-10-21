import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../constants/brand';
import { isValidEmail } from '../../utils/validation';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuthForm } from '../../components/auth/useAuthForm';
import FormField from '../../components/forms/FormField';
import PasswordInput from '../../components/forms/PasswordInput';
import formClasses from '../../styles/components/Form.module.css';

type Field = 'email' | 'password';

const validate = (values: Record<Field, string>) => {
    const errors: Partial<Record<Field, string>> = {};
    if (!values.email.trim()) errors.email = 'Email is required';
    else if (!isValidEmail(values.email)) errors.email = 'Email is invalid';
    if (!values.password) errors.password = 'Password is required';
    return errors;
};

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { fieldId, fieldProps, errors, formError, loading, handleSubmit } = useAuthForm<Field>(
        { email: '', password: '' },
        validate,
        async values => {
            const user = await login(values.email, values.password);
            navigate(user.role === 'Admin' ? '/admin' : '/dashboard');
        },
        'We couldn’t log you in. Please check your email and password.',
    );

    return (
        <AuthLayout
            eyebrow="Welcome back"
            title={<>Log in to your <em>account</em></>}
            subtitle="Enter your details to access your account."
            footer={<>New to {BRAND.NAME}? <Link to="/register" className="text-link">Create an account</Link></>}
        >
            <form className={`${formClasses.form} ${formClasses.authForm}`} onSubmit={handleSubmit} noValidate>
                {formError && <p className={formClasses.summary} role="alert">{formError}</p>}
                <FormField id={fieldId('email')} label="Email" error={errors.email}>
                    <input type="email" autoComplete="email" placeholder="you@example.com" className={formClasses.input} {...fieldProps('email')} />
                </FormField>
                <FormField id={fieldId('password')} label="Password" error={errors.password}>
                    <PasswordInput autoComplete="current-password" placeholder="Your password" {...fieldProps('password')} />
                </FormField>
                <button type="submit" className={`pill-btn pill-btn-primary ${formClasses.submit}`} disabled={loading}>
                    {loading ? 'Logging in…' : 'Log in'}
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
