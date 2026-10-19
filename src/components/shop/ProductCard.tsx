import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '../../services/mockData';
import { useCart } from '../../context/CartContext';
import classes from '../../styles/components/ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { items, addToCart } = useCart();
    const quantity = items.find(item => item.id === product.id)?.quantity ?? 0;
    const href = `/shop/${product.id}`;

    return (
        <article className={classes.card}>
            {/* Image link is skipped by keyboard; the name link below is the focusable target. */}
            <Link to={href} className={classes.media} tabIndex={-1}>
                <img src={product.image} alt={product.name} loading="lazy" className={classes.image} />
            </Link>
            {product.category && <p className={classes.category}>{product.category}</p>}
            <div className={classes.row}>
                <h3 className={classes.name}>
                    <Link to={href}>{product.name}</Link>
                </h3>
                <span className={classes.price}>${product.price.toFixed(2)}</span>
            </div>
            <button type="button" className={classes.add} onClick={() => addToCart(product)}>
                <ShoppingBag size={15} aria-hidden="true" />
                {quantity > 0 ? `Added · ${quantity} in bag` : 'Add to bag'}
            </button>
        </article>
    );
};

export default ProductCard;
