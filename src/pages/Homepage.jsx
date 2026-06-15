import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroBanner from '../img/bannerhome.png';
import api from '../services/api';
import ProductCardHome from '../components/ProductCardHome';


function Homepage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                const data = await api.getFeaturedProducts();
                setFeaturedProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <>
            <section className="hero-section">
                <img className='hero-banner' src={heroBanner} alt="iScream banner" />

                <div className="featured-section fade-in-content">
                    <h2 className="text-center mb-4 text-white">Le Novità</h2>

                    {loading && <p className="text-center text-white">Caricamento...</p>}
                    {error && <p className="text-center text-white">Errore: {error}</p>}

                    <div className="row justify-content-center g-3 align-items-stretch">
                        {featuredProducts.map((product) => (
                            <ProductCardHome product={product} key={product.id}/>
                        ))};
                    </div>
                    <div className="btn-container text-center mt-4">
                        <Link to="/Show" className="btn btn-dark btn-lg">
                            Vai al Menù completo
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Homepage;