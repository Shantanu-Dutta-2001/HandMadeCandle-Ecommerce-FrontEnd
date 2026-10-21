import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { BRAND } from '../../constants/brand';
import PolicyPage, { type PolicySection } from '../../components/policy/PolicyPage';
import classes from '../../styles/components/Policy.module.css';

const AT_A_GLANCE = [
    { figure: '30', unit: 'days', text: 'to return unused, unlit candles from the date of delivery' },
    { figure: '48', unit: 'hours', text: 'to let us know, with a photo, if your order arrives damaged' },
    { figure: 'No', unit: 'cost', text: 'to you for replacing an item damaged in transit' },
];

const ELIGIBILITY = ['Unused and unlit', 'Within 30 days of delivery', 'In original condition', 'In original packaging'];

const DAMAGE_STEPS = [
    { title: 'Take a photo', text: 'Capture the damaged item as it arrived.' },
    {
        title: 'Email us within 48 hours of delivery',
        text: <>Send the photo to <a href={`mailto:${BRAND.EMAIL}`} className={classes.inlineLink}>{BRAND.EMAIL}</a>.</>,
    },
    { title: 'We’ll replace it', text: 'We will happily replace the damaged item at no cost to you.' },
];

const SECTIONS: PolicySection[] = [
    {
        id: 'guarantee',
        navLabel: 'Our guarantee',
        title: 'Our guarantee',
        content: (
            <p className={classes.text}>
                We want you to absolutely love your candles. If you are not completely satisfied with your purchase, we’re here to help.
            </p>
        ),
    },
    {
        id: 'return-policy',
        navLabel: 'Return policy',
        title: 'Return policy',
        content: (
            <>
                <p className={classes.text}>
                    We accept returns of unused, unlit candles within 30 days of delivery. The product must be in its original condition and packaging.
                </p>
                <div className={classes.card}>
                    <p className={classes.cardLabel}>Eligible for return</p>
                    <ul className={classes.checklist}>
                        {ELIGIBILITY.map(item => (
                            <li key={item}>
                                <Check size={15} strokeWidth={1.75} className={classes.checkIcon} aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <h3 className={classes.subTitle}>How to start a return</h3>
                <p className={classes.text}>To initiate a return, please contact our support team with your order number.</p>
                <Link to="/contact" className={`pill-btn pill-btn-primary ${classes.sectionAction}`}>
                    Contact support <ArrowRight size={15} aria-hidden="true" />
                </Link>
            </>
        ),
    },
    {
        id: 'damaged',
        navLabel: 'Damaged items',
        title: 'Damaged items',
        content: (
            <>
                <p className={classes.text}>
                    We take great care in packaging our candles, but accidents can happen during transit. If your order arrives damaged, here’s what to do:
                </p>
                <ol className={classes.steps}>
                    {DAMAGE_STEPS.map((step, index) => (
                        <li key={step.title} className={classes.step}>
                            <span className={index === DAMAGE_STEPS.length - 1 ? `${classes.stepDot} ${classes.stepDotFilled}` : classes.stepDot} aria-hidden="true">
                                {index + 1}
                            </span>
                            <div>
                                <p className={classes.stepTitle}>{step.title}</p>
                                <p className={classes.stepText}>{step.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </>
        ),
    },
];

const Returns = () => (
    <PolicyPage
        crumb="Returns & Refunds"
        title={<>Returns <em>&amp; refunds</em></>}
        intro="We want you to absolutely love your candles. If you are not completely satisfied with your purchase, we’re here to help."
        glance={
            <dl className={classes.stats}>
                {AT_A_GLANCE.map(stat => (
                    <div key={stat.unit} className={classes.stat}>
                        <dt className={classes.figure}>
                            {stat.figure} <em>{stat.unit}</em>
                        </dt>
                        <dd className={classes.statText}>{stat.text}</dd>
                    </div>
                ))}
            </dl>
        }
        sections={SECTIONS}
        help={{ title: 'Need a hand?', text: 'We’re happy to help with anything about your order.' }}
    />
);

export default Returns;
