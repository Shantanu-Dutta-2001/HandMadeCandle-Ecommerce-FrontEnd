import React from 'react';
import { PRODUCTS } from '../../services/mockData';
import { productService } from '../../services/product.service';
import classes from '../../styles/components/Shop.module.css';
import ProductCard from '../../components/shop/ProductCard';

const ProductList = () => {
    const [products, setProducts] = React.useState(PRODUCTS);

    React.useEffect(() => {
        productService.getAllProducts()
            .then(data => data.length > 0 && setProducts(data))
            .catch(error => console.error('Failed to fetch products:', error));
    }, []);

    return (
        <div className="container">
            <header className={classes.header}>
                <h1>Our <span>Signature Collection</span></h1>
                <p>Handcrafted candles to illuminate your moments</p>
            </header>

            <div className={classes.grid}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
