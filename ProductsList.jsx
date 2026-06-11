import { useState, useEffect } from 'react';
import api from '../services/api';

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Caricamento prodotti...</div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <div>
            <h1>I Nostri Gelati Horror</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image_url} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.short_description}</p>
                        <p className="price">€{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsList;