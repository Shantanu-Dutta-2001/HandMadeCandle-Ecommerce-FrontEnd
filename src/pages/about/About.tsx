import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Flame, FlaskConical, Layers, Leaf, Package } from 'lucide-react';
import { productService } from '../../services/product.service';
import type { Product } from '../../services/mockData';
import { STORY_IMAGE } from '../../constants/media';
import PageIntro from '../../components/layout/PageIntro';
import classes from '../../styles/components/About.module.css';

const CRAFT_POINTS = [
    { icon: Layers, title: 'Hand-poured in small batches' },
    { icon: Droplet, title: '100% natural soy wax' },
    { icon: Flame, title: 'Lead-free cotton wicks' },
    { icon: FlaskConical, title: 'Phthalate-free fragrance oils' },
    { icon: Package, title: 'Recyclable packaging' },
    { icon: Leaf, title: 'Ethically sourced ingredients' },
];

const About = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getAllProducts()
            .then(data => setProducts(data.slice(1, 3)))
            .catch(error => console.error('Failed to fetch products:', error));
    }, []);

    return (
        <>
            <PageIntro
                crumb="Our Story"
                eyebrow="Our story"
                title={<>It began in a <em>small kitchen.</em></>}
                intro="A simple love for scents, and the way they transform a space."
            />

            <div className="container">
                <img
                    src={STORY_IMAGE}
                    alt="A lit candle glowing in a glass jar"
                    className={classes.heroImage}
                />
            </div>

            <section className="section">
                <div className={`container ${classes.split}`}>
                    <div>
                        <h2 className={classes.step}>01 — Where it started</h2>
                        <blockquote className={classes.pullQuote}>
                            <p>“A candle is more than just a source of light — it’s a mood, a memory, and a moment of peace in a busy world.”</p>
                        </blockquote>
                    </div>
                    <div className={classes.copy}>
                        <p className="body-copy">
                            Our journey began with a simple love for scents and the way they transform a space. What started as a weekend hobby in our small kitchen has blossomed into a passion for crafting the finest, cleanest burning candles for your home.
                        </p>
                        <p className="body-copy">
                            We believe that a candle is more than just a source of light — it’s a mood, a memory, and a moment of peace in a busy world.
                        </p>
                    </div>
                </div>
            </section>

            <section className={`section ${classes.craft}`}>
                <div className="container">
                    <div className={classes.split}>
                        <div>
                            <p className={classes.step}>02 — How we make them</p>
                            <h2 className={`display-2 ${classes.heading}`}>
                                Craftsmanship <em>&amp; quality</em>
                            </h2>
                        </div>
                        <p className={`body-copy ${classes.craftIntro}`}>
                            Every single candle is hand-poured in small batches to ensure quality and consistency — with ingredients chosen for a clean, beautiful burn.
                        </p>
                    </div>

                    <ol className={classes.tiles}>
                        {CRAFT_POINTS.map(({ icon: Icon, title }, index) => (
                            <li key={title} className={classes.tile}>
                                <Icon size={20} strokeWidth={1.3} className={classes.tileIcon} aria-hidden="true" />
                                <span className={classes.tileNumber}>{String(index + 1).padStart(2, '0')}</span>
                                <span className={classes.tileTitle}>{title}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="section">
                <div className={`container ${classes.promise}`}>
                    <div className={classes.promiseMedia}>
                        {products.map((product, index) => (
                            <img
                                key={product.id}
                                src={product.image}
                                alt={`${product.name} candle`}
                                loading="lazy"
                                className={index === 0 ? classes.promiseImageSmall : classes.promiseImageLarge}
                            />
                        ))}
                    </div>
                    <div>
                        <p className={classes.step}>03 — Our promise</p>
                        <h2 className={`display-2 ${classes.heading}`}>
                            We pour our hearts <em>into every jar.</em>
                        </h2>
                        <p className={`body-copy ${classes.promiseText}`}>
                            Our commitment to sustainability means our packaging is recyclable and our ingredients are ethically sourced — so you can fill your home with love.
                        </p>
                        <div className={classes.actions}>
                            <Link to="/shop" className="pill-btn pill-btn-primary">
                                Find your candle <ArrowRight size={15} aria-hidden="true" />
                            </Link>
                            <Link to="/contact" className="text-link">Ask about custom orders</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
