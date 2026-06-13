import React, { useContext } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

function ProductDetail() {
    const { id } = useParams(); // Prende l'ID dall'URL
    const { items, loading, error } = useContext(DataContext);

    if (loading) return <p className="text-center text-light mt-5">Caricamento prodotto...</p>;
    if (error) return <Navigate to='/NotFound' />;

    // Trovo il prodotto con l'ID corrispondente
    const product = items.find(item => item.id === parseInt(id));

    if (!product) return <Navigate to='/NotFound' />;

    return (
        <div className="container my-5">
            <Link to="/Show" className="btn btn-outline-warning mb-4">
                ← Torna ai prodotti
            </Link>

            <div className="row">
                {/* Colonna immagine */}
                <div className="col-md-6">
                    <div className="card bg-dark text-light border-warning">
                        <img
                            src={product.image_url}
                            className="card-img-top"
                            alt={product.name}
                            style={{ objectFit: 'cover', height: '400px' }}
                        />
                    </div>
                </div>

                {/* Colonna info */}
                <div className="col-md-6">
                    <div className="card bg-dark text-light border-warning">
                        <div className="card-body">
                            <h1 className="card-title text-warning">{product.name}</h1>
                            <p className="card-text fs-5">{product.marketing_description}</p>
                            <hr className="border-secondary" />
                            <h5>Prezzo: <span className="text-warning">€ {product.price}</span></h5>
                            <h5 className="mt-3">Ingredienti:</h5>
                            <p>{product.ingredients}</p>
                            <h5>Allergeni:</h5>
                            <p>{product.allergens}</p>
                            <button
                                className="btn btn-warning mt-3 w-100"
                                disabled={!product.availability}
                            >
                                {product.availability ? 'Acquista' : 'Non disponibile'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;