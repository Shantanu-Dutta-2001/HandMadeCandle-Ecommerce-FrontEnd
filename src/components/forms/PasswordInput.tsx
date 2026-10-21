import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import classes from '../../styles/components/Form.module.css';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={classes.passwordWrap}>
            <input
                {...props}
                type={isVisible ? 'text' : 'password'}
                className={`${classes.input} ${classes.passwordInput} ${className ?? ''}`}
            />
            <button
                type="button"
                className={classes.reveal}
                onClick={() => setIsVisible(visible => !visible)}
                aria-label="Show password"
                aria-pressed={isVisible}
            >
                {isVisible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
            </button>
        </div>
    );
};

export default PasswordInput;
