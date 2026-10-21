import { NavLink } from 'react-router-dom';
import { BRAND } from '../../constants/brand';
import classes from './Footer.module.css';

interface FooterLink {
    to: string;
    label: string;
}

interface FooterColumnProps {
    title: string;
    links: FooterLink[];
}

const EXPLORE_LINKS: FooterLink[] = [
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const SUPPORT_LINKS: FooterLink[] = [
    { to: '/faq', label: 'FAQ' },
    { to: '/shipping', label: 'Shipping Policy' },
    { to: '/returns', label: 'Returns & Refunds' },
];

const FooterColumn = ({ title, links }: FooterColumnProps) => (
    <nav aria-label={title}>
        <h2 className={classes.label}>{title}</h2>
        <ul className={classes.list}>
            {links.map(link => (
                <li key={link.to}>
                    <NavLink to={link.to} className={classes.link}>{link.label}</NavLink>
                </li>
            ))}
        </ul>
    </nav>
);

const Footer = () => (
    <footer className={classes.footer}>
        <div className="container">
            <div className={classes.grid}>
                <div className={classes.brand}>
                    <p className={classes.wordmark}>{BRAND.NAME}</p>
                    <p className={classes.tagline}>{BRAND.TAGLINE}</p>
                    <p className={classes.blurb}>Handcrafted candles, hand-poured at home.</p>
                </div>
                <FooterColumn title="Explore" links={EXPLORE_LINKS} />
                <FooterColumn title="Support" links={SUPPORT_LINKS} />
            </div>
            <div className={classes.bottom}>
                <p>© {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.</p>
                <p>Made by hand, with love.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
