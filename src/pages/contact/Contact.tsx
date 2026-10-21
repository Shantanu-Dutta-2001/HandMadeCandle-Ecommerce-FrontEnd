import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { productService } from '../../services/product.service';
import { BRAND } from '../../constants/brand';
import Breadcrumb from '../../components/layout/Breadcrumb';
import ContactForm from '../../components/forms/ContactForm';
import classes from '../../styles/components/Contact.module.css';

const Contact = () => {
    const [thumbnail, setThumbnail] = useState<string>();

    useEffect(() => {
        productService.getAllProducts()
            .then(products => setThumbnail(products[0]?.image))
            .catch(error => console.error('Failed to fetch products:', error));
    }, []);

    return (
        <div className={classes.page}>
            <div className="container">
                <Breadcrumb current="Contact" />

                <div className={classes.grid}>
                    <div className={classes.info}>
                        <p className="eyebrow">Get in touch</p>
                        <h1 className={`display-1 ${classes.title}`}>
                            We’d love to <em>hear from you</em>
                        </h1>
                        <p className="body-copy">
                            Have questions about our candles, a custom order in mind, or simply want to say hello? Write to us — we read every message.
                        </p>

                        <dl className={classes.details}>
                            <div className={classes.detail}>
                                <Mail size={18} strokeWidth={1.5} className={classes.detailIcon} aria-hidden="true" />
                                <div>
                                    <dt className={classes.detailLabel}>Email</dt>
                                    <dd><a href={`mailto:${BRAND.EMAIL}`} className={classes.email}>{BRAND.EMAIL}</a></dd>
                                </div>
                            </div>
                            <div className={classes.detail}>
                                <MapPin size={18} strokeWidth={1.5} className={classes.detailIcon} aria-hidden="true" />
                                <div>
                                    <dt className={classes.detailLabel}>Address</dt>
                                    <dd className={classes.detailValue}>{BRAND.ADDRESS}</dd>
                                </div>
                            </div>
                        </dl>

                        <div className={classes.customPanel}>
                            {thumbnail && <img src={thumbnail} alt="" className={classes.customImage} />}
                            <div>
                                <h2 className={classes.customTitle}>Custom orders &amp; bulk purchases</h2>
                                <p className={classes.customText}>
                                    Planning a celebration or gifting for many? Tell us about it in your message.
                                </p>
                            </div>
                        </div>

                        <p className={classes.faq}>
                            Looking for a quick answer? <Link to="/faq" className="text-link">Visit our FAQ</Link>
                        </p>
                    </div>

                    <ContactForm subjectFallback="Contact Form Message" variant="page" />
                </div>
            </div>
        </div>
    );
};

export default Contact;
