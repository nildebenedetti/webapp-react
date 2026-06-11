import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productData, reviewsData] = await Promise.all([
                    api.getProductById(id),
                    api.getReviews(id)
                ]);
                setProduct(productData);
                setReviews(reviewsData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Caricamento...</div>;
    if (!product) return <div>Prodotto non trovato</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image_url} alt={product.name} />
            <p>{product.marketing_description}</p>
            <p>Prezzo: €{product.price}</p>
            <p>Ingredienti: {product.ingredients}</p>
            <p>Allergeni: {product.allergens}</p>

            <h2>Recensioni ({reviews.length})</h2>
            {reviews.map(review => (
                <div key={review.id} className="review">
                    <h3>{review.title}</h3>
                    <p>{review.body}</p>
                    <p>⭐ {review.start_rating}/5</p>
                    <p>Da: {review.author_name}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductDetail;