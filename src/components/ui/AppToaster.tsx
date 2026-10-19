import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import classes from '../../styles/components/AppToaster.module.css';

// react-hot-toast applies inline styles, so theming has to go through toastOptions.style.
const TOAST_STYLE = {
    background: 'var(--cocoa)',
    color: 'var(--ivory)',
    borderRadius: 'var(--radius-pill)',
    padding: '10px 10px 10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    maxWidth: 'min(520px, calc(100vw - 32px))',
    boxShadow: '0 12px 32px rgba(46, 35, 29, 0.22)',
};

const AppToaster = () => (
    <Toaster
        position="bottom-center"
        toastOptions={{
            duration: 3200,
            style: TOAST_STYLE,
            iconTheme: { primary: 'var(--sage-light)', secondary: 'var(--cocoa)' },
        }}
    >
        {t => (
            <ToastBar toast={t}>
                {({ icon, message }) => (
                    <>
                        {icon}
                        {message}
                        {t.type !== 'loading' && (
                            <button type="button" className={classes.dismiss} onClick={() => toast.dismiss(t.id)} aria-label="Dismiss notification">
                                <X size={16} aria-hidden="true" />
                            </button>
                        )}
                    </>
                )}
            </ToastBar>
        )}
    </Toaster>
);

export default AppToaster;
