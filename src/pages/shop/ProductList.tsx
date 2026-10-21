import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PRODUCTS, type Product } from '../../services/mockData';
import { productService } from '../../services/product.service';
import PageIntro from '../../components/layout/PageIntro';
import ProductCard from '../../components/shop/ProductCard';
import classes from '../../styles/components/Shop.module.css';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const PRICE_FILTERS = [
    { value: 'all', label: 'All', matches: () => true },
    { value: 'under-25', label: 'Under $25', matches: (price: number) => price < 25 },
    { value: '25-40', label: '$25 – $40', matches: (price: number) => price >= 25 && price <= 40 },
    { value: 'over-40', label: 'Over $40', matches: (price: number) => price > 40 },
];

const SORT_OPTIONS: { value: SortOption; label: string; compare: (a: Product, b: Product) => number }[] = [
    { value: 'featured', label: 'Featured', compare: () => 0 },
    { value: 'price-asc', label: 'Price: low to high', compare: (a, b) => a.price - b.price },
    { value: 'price-desc', label: 'Price: high to low', compare: (a, b) => b.price - a.price },
    { value: 'name', label: 'Name: A–Z', compare: (a, b) => a.name.localeCompare(b.name) },
];

const ProductList = () => {
    const [products, setProducts] = useState(PRODUCTS);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        productService.getAllProducts()
            .then(data => data.length > 0 && setProducts(data))
            .catch(error => console.error('Failed to fetch products:', error));
    }, []);

    const priceFilter = PRICE_FILTERS.find(f => f.value === searchParams.get('price')) ?? PRICE_FILTERS[0];
    const sort = SORT_OPTIONS.find(o => o.value === searchParams.get('sort')) ?? SORT_OPTIONS[0];

    const visibleProducts = useMemo(
        () => products.filter(p => priceFilter.matches(p.price)).sort(sort.compare),
        [products, priceFilter, sort]
    );

    // Defaults are dropped from the URL so /shop stays clean.
    const setParam = (key: 'price' | 'sort', value: string, fallback: string) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value === fallback) next.delete(key);
            else next.set(key, value);
            return next;
        }, { replace: true });
    };

    return (
        <>
            <div className={classes.page}>
                <PageIntro
                    crumb="Shop"
                    eyebrow="The signature collection"
                    title={<>All <em>candles</em></>}
                    intro="Handcrafted candles to illuminate your moments — each one hand-poured at home with premium soy wax."
                    introPlacement="below"
                />

                <div className="container">
                    <div className={classes.toolbar}>
                        <div className={classes.filters} role="group" aria-label="Filter by price">
                            <span className={classes.filterLabel} aria-hidden="true">Price</span>
                            {PRICE_FILTERS.map(filter => (
                                <button
                                    key={filter.value}
                                    type="button"
                                    className={classes.chip}
                                    aria-pressed={filter.value === priceFilter.value}
                                    onClick={() => setParam('price', filter.value, 'all')}
                                >
                                    {filter.label}
                                    <span className={classes.chipCount}>
                                        {products.filter(p => filter.matches(p.price)).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className={classes.meta}>
                            <p className={classes.count} aria-live="polite">
                                {visibleProducts.length} {visibleProducts.length === 1 ? 'candle' : 'candles'}
                            </p>
                            <label className={classes.sortLabel}>
                                Sort
                                <span className={classes.selectWrap}>
                                    <select
                                        className={classes.select}
                                        value={sort.value}
                                        onChange={e => setParam('sort', e.target.value, 'featured')}
                                    >
                                        {SORT_OPTIONS.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className={classes.selectIcon} aria-hidden="true" />
                                </span>
                            </label>
                        </div>
                    </div>

                    <h2 className="visually-hidden">Candles</h2>
                    {visibleProducts.length > 0 ? (
                        <div className={classes.grid}>
                            {visibleProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className={classes.empty}>
                            <p className={classes.emptyTitle}>No candles in this price range</p>
                            <button type="button" className="pill-btn pill-btn-outline" onClick={() => setParam('price', 'all', 'all')}>
                                Show all candles
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <section className={classes.band}>
                <div className={`container ${classes.bandInner}`}>
                    <div>
                        <h2 className={`display-2 ${classes.bandTitle}`}>
                            Looking for something <em>made just for you?</em>
                        </h2>
                        <p className={classes.bandText}>
                            We take custom orders and bulk purchases for celebrations, events and gifting.
                        </p>
                    </div>
                    <Link to="/contact" className="pill-btn pill-btn-primary">
                        Get in touch <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default ProductList;
