import { Link, useLocation } from 'react-router-dom';
import classes from './AnnouncementBar.module.css';

const AnnouncementBar = () => {
    const { pathname } = useLocation();

    return (
        <div className={classes.bar}>
            <p className="container">
                Custom orders &amp; bulk gifting welcome —{' '}
                {pathname === '/contact' ? 'send us a note below' : <Link to="/contact">Get in touch</Link>}
            </p>
        </div>
    );
};

export default AnnouncementBar;
