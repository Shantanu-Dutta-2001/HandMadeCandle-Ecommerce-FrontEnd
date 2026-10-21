import { Link, useLocation } from 'react-router-dom';
import { AUTH_ROUTES } from '../../constants/routes';
import classes from './AnnouncementBar.module.css';

const AnnouncementBar = () => {
    const { pathname } = useLocation();

    if (AUTH_ROUTES.includes(pathname)) return null;

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
