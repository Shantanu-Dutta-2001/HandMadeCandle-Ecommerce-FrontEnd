import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { BRAND } from '../../constants/brand';
import { STORY_IMAGE } from '../../constants/media';
import classes from '../../styles/components/Auth.module.css';

interface AuthLayoutProps {
    eyebrow: string;
    title: ReactNode;
    subtitle: string;
    footer: ReactNode;
    children: ReactNode;
}

const taglineWords = BRAND.TAGLINE.split(' ');
const taglineLead = taglineWords.slice(0, -2).join(' ');
const taglineEnd = taglineWords.slice(-2).join(' ');

const tabClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.tab} ${classes.tabActive}` : classes.tab;

const AuthLayout = ({ eyebrow, title, subtitle, footer, children }: AuthLayoutProps) => (
    <div className={classes.page}>
        <div className="container">
            <div className={classes.grid}>
                <div className={classes.visual}>
                    <img src={STORY_IMAGE} alt="" className={classes.visualImage} />
                    <div className={classes.visualCopy}>
                        <p className={classes.visualBrand}>{BRAND.NAME}</p>
                        <p className={classes.visualTitle}>{taglineLead} <em>{taglineEnd}</em></p>
                        <p className={classes.visualText}>Handcrafted candles, hand-poured at home.</p>
                    </div>
                </div>

                <div className={classes.panel}>
                    <nav aria-label="Account" className={classes.tabs}>
                        <NavLink to="/login" className={tabClass}>Log in</NavLink>
                        <NavLink to="/register" className={tabClass}>Create account</NavLink>
                    </nav>

                    <div className={classes.heading}>
                        <p className="eyebrow">{eyebrow}</p>
                        <h1 className={`display-2 ${classes.title}`}>{title}</h1>
                        <p className={classes.subtitle}>{subtitle}</p>
                    </div>

                    {children}

                    <p className={classes.switch}>{footer}</p>
                </div>
            </div>
        </div>
    </div>
);

export default AuthLayout;
