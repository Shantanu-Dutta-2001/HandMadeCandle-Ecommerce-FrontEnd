import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Flame, Leaf, Star } from 'lucide-react';
import { productService } from '../../services/product.service';
import { reviewService, type Review } from '../../services/review.service';
import type { Product } from '../../services/mockData';
import { BRAND } from '../../constants/brand';
import ProductCard from '../../components/shop/ProductCard';
import ContactForm from '../../components/forms/ContactForm';
import Skeleton from '../../components/ui/Skeleton';
import classes from '../../styles/components/Home.module.css';

const taglineWords = BRAND.TAGLINE.split(' ');
const taglineEnd = taglineWords.pop();

const VALUES = [
    { icon: Flame, title: 'Hand-poured at home', text: 'Every candle made by hand, in small batches' },
    { icon: Droplet, title: 'Premium soy wax', text: 'A natural base for a clean, gentle glow' },
    { icon: Leaf, title: 'Thoughtful fragrances', text: 'Chosen to evoke memories of togetherness' },
];

const CONTACT_TOPICS = [
    { title: 'Custom orders', detail: 'Made for your moment' },
    { title: 'Bulk purchases', detail: 'Events & gifting' },
    { title: 'Just saying hello', detail: 'Always welcome' },
];

const Stars = ({ rating }: { rating: number }) => {
    const count = Math.max(0, Math.min(5, Math.round(rating)));
    return (
        <div className={classes.stars} role="img" aria-label={`Rated ${count} out of 5`}>
            {Array.from({ length: count }, (_, i) => (
                <Star key={i} size={14} fill="currentColor" stroke="none" aria-hidden="true" />
            ))}
        </div>
    );
};

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [products, fetchedReviews] = await Promise.all([
                    productService.getAllProducts(),
                    reviewService.getReviews()
                ]);

                setFeaturedProducts(products.slice(0, 3));
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [heroProduct, secondProduct] = featuredProducts;

    return (
        <>
            <section className="container">
                <div className={classes.hero}>
                    <div className={classes.heroCopy}>
                        <p className="eyebrow">Handmade candles</p>
                        <h1 className={`display-1 ${classes.heroTitle}`}>
                            {taglineWords.join(' ')} <em>{taglineEnd}</em>
                        </h1>
                        <p className="body-copy">
                            Hand-poured in our home with premium soy wax and thoughtfully chosen fragrances — for celebrations, quiet rituals, and the moments you want to remember.
                        </p>
                        <div className={classes.heroActions}>
                            <Link to="/shop" className="pill-btn pill-btn-primary">
                                Shop the collection <ArrowRight size={15} aria-hidden="true" />
                            </Link>
                            <Link to="/about" className="text-link">Our story</Link>
                        </div>
                    </div>
    
                    <figure className={classes.heroMedia}>
                        {loading ? (
                            <Skeleton className={classes.heroImage} />
                        ) : heroProduct ? (
                            <>
                                <img src={heroProduct.image} alt={`${heroProduct.name} candle`} className={classes.heroImage} />
                                <figcaption className={classes.heroTag}>
                                    <span className={classes.heroTagLabel}>In the photo</span>
                                    <span className={classes.heroTagRow}>
                                        <Link to={`/shop/${heroProduct.id}`} className={classes.heroTagName}>{heroProduct.name}</Link>
                                        <span className={classes.heroTagPrice}>${heroProduct.price.toFixed(2)}</span>
                                    </span>
                                </figcaption>
                            </>
                        ) : (
                            <div className={classes.heroImage} aria-hidden="true" />
                        )}
                    </figure>
                </div>
            </section>

            <section className={classes.values} aria-label="Our craft">
                <ul className={`container ${classes.valuesList}`}>
                    {VALUES.map(({ icon: Icon, title, text }) => (
                        <li key={title} className={classes.valueItem}>
                            <Icon size={20} strokeWidth={1.4} className={classes.valueIcon} aria-hidden="true" />
                            <div>
                                <p className={classes.valueTitle}>{title}</p>
                                <p className={classes.valueText}>{text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="section">
                <div className="container">
                    <header className={classes.sectionHead}>
                        <div>
                            <p className="eyebrow">The signature collection</p>
                            <h2 className={`display-2 ${classes.sectionTitle}`}>
                                Crafted for the moments <br /><em>you share</em>
                            </h2>
                        </div>
                        <Link to="/shop" className="text-link">
                            View all candles <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                    </header>

                    {loading ? (
                        <div className={classes.productGrid}>
                            {[1, 2, 3].map(i => (
                                <div key={i}>
                                    <Skeleton className={classes.cardSkeleton} />
                                    <Skeleton height="26px" width="70%" borderRadius="4px" className={classes.skeletonGap} />
                                </div>
                            ))}
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className={classes.productGrid}>
                            {featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className={classes.emptyText}>No products found.</p>
                    )}
                </div>
            </section>

            <section className={`section ${classes.story}`}>
                <div className={`container ${classes.storyGrid}`}>
                    <div className={classes.storyMedia}>
                        {loading ? (
                            <>
                                <Skeleton className={classes.storyImageMain} />
                                <Skeleton className={classes.storyImageSide} />
                            </>
                        ) : (
                            <>
                                {heroProduct && <img src={heroProduct.image} alt={`${heroProduct.name} candle`} loading="lazy" className={classes.storyImageMain} />}
                                {secondProduct && <img src={secondProduct.image} alt={`${secondProduct.name} candle`} loading="lazy" className={classes.storyImageSide} />}
                            </>
                        )}
                    </div>

                    <div className={classes.storyCopy}>
                        <p className="eyebrow">Our story</p>
                        <h2 className={`display-2 ${classes.sectionTitle}`}>
                            Made with love, <em>shared with heart</em>
                        </h2>
                        <p className="body-copy">
                            In our cozy home kitchen, magic happens every day. What started as a simple desire to fill our space with beautiful, natural light has blossomed into something much more meaningful.
                        </p>
                        <p className="body-copy">
                            Each candle is carefully hand-poured with premium soy wax and thoughtfully selected fragrances that evoke memories of togetherness. From intimate dinner conversations to quiet reading moments, our candles create the backdrop for life's most precious experiences.
                        </p>
                        <p className={classes.storyQuote}>Because every moment deserves to be illuminated with love.</p>
                    </div>
                </div>
            </section>

            {(loading || reviews.length > 0) && (
                <section className="section">
                    <div className="container">
                        <header className={classes.centerHead}>
                            <p className="eyebrow">Kind words</p>
                            <h2 className={`display-2 ${classes.sectionTitle}`}>
                                Love in <em>every review</em>
                            </h2>
                        </header>

                        <div className={classes.reviewGrid}>
                            {loading
                                ? [1, 2, 3].map(i => (
                                    <div key={i} className={classes.reviewCard}>
                                        <Skeleton height="14px" width="90px" borderRadius="4px" />
                                        <Skeleton height="16px" width="100%" borderRadius="4px" className={classes.skeletonGap} />
                                        <Skeleton height="16px" width="80%" borderRadius="4px" className={classes.skeletonLine} />
                                    </div>
                                ))
                                : reviews.map(review => (
                                    <figure key={review.id} className={classes.reviewCard}>
                                        <Stars rating={review.rating} />
                                        <blockquote className={classes.reviewQuote}>“{review.content}”</blockquote>
                                        <figcaption className={classes.reviewAuthor}>{review.userName}</figcaption>
                                    </figure>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            <section className={`section ${classes.contact}`}>
                <div className={`container ${classes.contactGrid}`}>
                    <div className={classes.contactCopy}>
                        <p className="eyebrow">Get in touch</p>
                        <h2 className={`display-2 ${classes.sectionTitle}`}>
                            Let's create something <em>beautiful</em>
                        </h2>
                        <p className="body-copy">
                            Planning a celebration, a gift for many, or simply want to say hello? Write to us — we read every message.
                        </p>
                        <dl className={classes.topics}>
                            {CONTACT_TOPICS.map(topic => (
                                <div key={topic.title} className={classes.topic}>
                                    <dt>{topic.title}</dt>
                                    <dd>{topic.detail}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <ContactForm subjectFallback="Home Page Contact" />
                </div>
            </section>
        </>
    );
};

export default Home;
