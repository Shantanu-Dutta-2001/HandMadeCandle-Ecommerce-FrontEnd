import { Link } from 'react-router-dom';
import { Globe, Mail, Truck, User, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PolicyPage, { type PolicySection } from '../../components/policy/PolicyPage';
import classes from '../../styles/components/Policy.module.css';

const TIMELINE = [
    { title: 'Order placed', text: 'Your candles are poured just for you' },
    { title: 'Processing · 2–3 business days', text: 'Hand-poured and prepared to ship' },
    { title: 'Shipped', text: 'Confirmation email with your tracking number' },
    { title: 'Delivered', text: 'Standard 3–5 or express 1–2 business days' },
];

const METHODS = [
    { icon: Truck, label: 'Standard', range: '3–5' },
    { icon: Zap, label: 'Express', range: '1–2' },
];

const Shipping = () => {
    const { isAuthenticated } = useAuth();

    const sections: PolicySection[] = [
        {
            id: 'methods',
            navLabel: 'Methods & times',
            title: 'Shipping methods & times',
            content: (
                <>
                    <p className={classes.text}>
                        We hand-pour all our candles to order to ensure the freshest potential scent throw. Please allow 2–3 business days for processing before your order ships.
                    </p>
                    <ul className={classes.methods}>
                        {METHODS.map(({ icon: Icon, label, range }) => (
                            <li key={label} className={classes.card}>
                                <p className={classes.cardLabel}>
                                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" /> {label}
                                </p>
                                <p className={classes.figure}>
                                    {range} <em>business days</em>
                                </p>
                                <p className={classes.cardNote}>in transit, after processing</p>
                            </li>
                        ))}
                    </ul>
                </>
            ),
        },
        {
            id: 'international',
            navLabel: 'International shipping',
            title: 'International shipping',
            content: (
                <>
                    <p className={classes.notice}>
                        <Globe size={18} strokeWidth={1.5} aria-hidden="true" />
                        We currently ship within the domestic region only.
                    </p>
                    <p className={classes.text}>
                        Currently, we only ship within the domestic region. We are working hard to expand our shipping capabilities to bring our candles to homes around the world soon.
                    </p>
                </>
            ),
        },
        {
            id: 'tracking',
            navLabel: 'Tracking your order',
            title: 'Tracking your order',
            content: (
                <>
                    <p className={classes.text}>
                        Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order status directly from your account dashboard.
                    </p>
                    <ul className={classes.channels}>
                        <li className={classes.channel}>
                            <Mail size={18} strokeWidth={1.5} className={classes.channelIcon} aria-hidden="true" />
                            <div>
                                <p className={classes.channelTitle}>By email</p>
                                <p className={classes.channelText}>Your tracking number arrives when your order ships.</p>
                            </div>
                        </li>
                        <li className={classes.channel}>
                            <User size={18} strokeWidth={1.5} className={classes.channelIcon} aria-hidden="true" />
                            <div>
                                <p className={classes.channelTitle}>In your account</p>
                                <p className={classes.channelText}>
                                    {isAuthenticated
                                        ? <><Link to="/dashboard/orders" className={classes.inlineLink}>View your orders</Link> to see their status.</>
                                        : <><Link to="/login" className={classes.inlineLink}>Log in</Link> to see your order status.</>}
                                </p>
                            </div>
                        </li>
                    </ul>
                </>
            ),
        },
    ];

    return (
        <PolicyPage
            crumb="Shipping Policy"
            title={<>Shipping <em>policy</em></>}
            intro="We hand-pour all our candles to order to ensure the freshest potential scent throw."
            glance={
                <ol className={classes.timeline} aria-label="How your order travels">
                    {TIMELINE.map((step, index) => (
                        <li key={step.title} className={classes.timelineStep}>
                            <span className={index === TIMELINE.length - 1 ? `${classes.stepDot} ${classes.stepDotFilled}` : classes.stepDot} aria-hidden="true">
                                {index + 1}
                            </span>
                            <p className={classes.stepTitle}>{step.title}</p>
                            <p className={classes.stepText}>{step.text}</p>
                        </li>
                    ))}
                </ol>
            }
            sections={sections}
            help={{
                title: 'Questions about your delivery?',
                text: <>See our <Link to="/returns" className={classes.inlineLink}>returns &amp; refunds</Link> policy, or get in touch.</>,
            }}
        />
    );
};

export default Shipping;
