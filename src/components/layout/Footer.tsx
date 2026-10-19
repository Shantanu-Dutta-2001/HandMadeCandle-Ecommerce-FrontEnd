import classes from './Footer.module.css';
import { BRAND } from '../../constants/brand';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={`container ${classes.container}`}>
                <div className={classes.column}>
                    <h3>{BRAND.NAME}</h3>
                    <p>{BRAND.TAGLINE}</p>
                </div>
                <div className={classes.column}>
                    <h4>Links</h4>
                    <a href="/shop">Shop</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className={classes.column}>
                    <h4>Support</h4>
                    <a href="/faq">FAQ</a>
                    <a href="/shipping">Shipping Policy</a>
                    <a href="/returns">Returns & Refunds</a>
                </div>
            </div>
            <div className={`container ${classes.copyright}`}>
                © {new Date().getFullYear()} {BRAND.NAME}. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
