import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { BRAND } from '../../constants/brand';
import { AUTH_ROUTES } from '../../constants/routes';
import CartDrawer from '../shop/CartDrawer';
import classes from './Navbar.module.css';

const NAV_LINKS = [
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'Our Story' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.navLink} ${classes.active}` : classes.navLink;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${classes.mobileLink} ${classes.mobileLinkActive}` : classes.mobileLink;

const Navbar = () => {
    const { logout, isAuthenticated } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAuthPage = AUTH_ROUTES.includes(pathname);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const handleOpenCart = () => setIsCartOpen(true);
        window.addEventListener('open-cart', handleOpenCart);
        return () => window.removeEventListener('open-cart', handleOpenCart);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/');
    };

    return (
        <header className={classes.header}>
            <div className={`container ${classes.bar}`}>
                <Link to="/" className={classes.logo} onClick={closeMenu}>
                    {BRAND.NAME}
                </Link>

                <nav aria-label="Main" className={classes.desktopNav}>
                    {NAV_LINKS.map(link => (
                        <NavLink key={link.to} to={link.to} className={navLinkClass}>{link.label}</NavLink>
                    ))}
                </nav>

                <div className={classes.actions}>
                    {/* TODO: no search feature exists yet; links to the full catalogue for now. */}
                    <Link to="/shop" className={classes.iconBtn} aria-label="Browse all candles">
                        <Search size={18} aria-hidden="true" />
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className={`${classes.iconBtn} ${classes.desktopOnly}`} aria-label="Your account">
                                <User size={18} aria-hidden="true" />
                            </Link>
                            <button type="button" onClick={handleLogout} className={`${classes.textAction} ${classes.desktopOnly}`}>
                                Log out
                            </button>
                        </>
                    ) : !isAuthPage && (
                        <>
                            <Link to="/login" className={`${classes.textAction} ${classes.desktopOnly}`}>Log in</Link>
                            <Link to="/register" className={`${classes.signUp} ${classes.desktopOnly}`}>Sign up</Link>
                        </>
                    )}

                    {isAuthenticated ? (
                        <button
                            type="button"
                            className={classes.iconBtn}
                            onClick={() => setIsCartOpen(true)}
                            aria-label={`Open bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                        >
                            <ShoppingBag size={18} aria-hidden="true" />
                            {itemCount > 0 && <span className={classes.badge} aria-hidden="true">{itemCount}</span>}
                        </button>
                    ) : (
                        <Link to="/login" className={classes.iconBtn} aria-label="Log in to view your bag">
                            <ShoppingBag size={18} aria-hidden="true" />
                        </Link>
                    )}

                    <button
                        type="button"
                        className={`${classes.iconBtn} ${classes.menuToggle}`}
                        onClick={() => setIsMenuOpen(open => !open)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <nav id="mobile-menu" aria-label="Mobile" className={classes.mobileMenu}>
                    <div className="container">
                        {NAV_LINKS.map(link => (
                            <NavLink key={link.to} to={link.to} className={mobileLinkClass} onClick={closeMenu}>{link.label}</NavLink>
                        ))}
                        <div className={classes.mobileActions}>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard" className="pill-btn pill-btn-outline" onClick={closeMenu}>Your account</Link>
                                    <button type="button" className="pill-btn pill-btn-primary" onClick={handleLogout}>Log out</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="pill-btn pill-btn-outline" onClick={closeMenu}>Log in</Link>
                                    <Link to="/register" className="pill-btn pill-btn-primary" onClick={closeMenu}>Sign up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            )}

            {isAuthenticated && (
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            )}
        </header>
    );
};

export default Navbar;
