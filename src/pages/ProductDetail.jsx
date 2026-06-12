import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../services/api";

function ProductDetail() {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("details");

    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('id');

    useEffect(() => {
        if (productId) {
            loadProductAndReviews();
        }
    }, [productId]);

    const loadProductAndReviews = async () => {
        setLoading(true);
        try {
            const productData = await api.getProductById(parseInt(productId));
            setProduct(productData);
            const reviewsData = await api.getReviews(productId);
            setReviews(reviewsData);
        } catch (error) {
            console.error("Errore nel caricamento:", error);
        } finally {
            setLoading(false);
        }
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.start_rating, 0) / reviews.length).toFixed(1)
        : 0;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - Math.ceil(rating);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
                ))}
                {hasHalfStar && <i className="bi bi-star-half text-warning"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
                ))}
            </>
        );
    };

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                </div>
                <p className="mt-3 text-white">Caricamento del prodotto...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container text-center py-5">
                <div className="alert alert-danger">
                    <h4>Prodotto non trovato</h4>
                    <p>Il prodotto che stai cercando non esiste o è stato rimosso.</p>
                    <Link to="/Show" className="btn btn-warning">Torna ai prodotti</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Breadcrumb */}
            <div className="bg-dark py-3 border-bottom border-secondary">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/Homepage" className="text-warning text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/Show" className="text-warning text-decoration-none">Prodotti</Link>
                            </li>
                            <li className="breadcrumb-item active text-light" aria-current="page">
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Section */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Card Immagine Prodotto */}
                    <div className="col-lg-6">
                        <div className="card bg-dark border-0 shadow-lg h-100">
                            <div className="card-body p-0">
                                <img
                                    src={product.image_url || "https://via.placeholder.com/600x500?text=iScream+Gelato"}
                                    alt={product.name}
                                    className="card-img-top rounded-3"
                                    style={{ objectFit: "cover", width: "100%", height: "450px" }}
                                />
                                {!product.availability && (
                                    <div className="position-absolute top-0 start-0 m-3">
                                        <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">
                                            <i className="bi bi-x-circle me-1"></i> Esaurito
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="card-footer bg-transparent border-0 text-center py-3">
                                <small className="text-muted">
                                    <i className="bi bi-camera me-1"></i>
                                    {product.name} - Edizione Limitata
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Card Info Prodotto */}
                    <div className="col-lg-6">
                        <div className="card bg-dark text-light border-0 shadow-lg h-100">
                            <div className="card-body">
                                <h1 className="card-title display-5 fw-bold mb-3">{product.name}</h1>
                                <p className="card-text text-muted fs-5">{product.short_description}</p>

                                <div className="mb-4 pb-2 border-bottom border-secondary">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="fs-3">
                                            {renderStars(averageRating)}
                                        </div>
                                        <span className="text-muted">
                                            <i className="bi bi-chat-dots me-1"></i>
                                            {reviews.length} {reviews.length === 1 ? 'recensione' : 'recensioni'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h2 className="display-4 text-warning fw-bold">€{product.price}</h2>
                                    <small className="text-muted">
                                        <i className="bi bi-credit-card me-1"></i>
                                        prezzo al pubblico IVA inclusa
                                    </small>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-warning btn-lg fw-bold"
                                        disabled={!product.availability}
                                    >
                                        <i className="bi bi-cart-plus me-2"></i>
                                        {product.availability ? 'Aggiungi al Carrello' : 'Non Disponibile'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs e Recensioni */}
                <div className="row mt-5">
                    <div className="col-12">
                        <ul className="nav nav-tabs nav-fill">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'details' ? 'active bg-warning text-dark fw-bold' : 'text-light bg-dark'}`}
                                    onClick={() => setActiveTab('details')}
                                >
                                    <i className="bi bi-info-circle me-2"></i>
                                    Descrizione
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'ingredients' ? 'active bg-warning text-dark fw-bold' : 'text-light bg-dark'}`}
                                    onClick={() => setActiveTab('ingredients')}
                                >
                                    <i className="bi bi-flower me-2"></i>
                                    Ingredienti & Allergeni
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'reviews' ? 'active bg-warning text-dark fw-bold' : 'text-light bg-dark'}`}
                                    onClick={() => setActiveTab('reviews')}
                                >
                                    <i className="bi bi-star me-2"></i>
                                    Recensioni ({reviews.length})
                                </button>
                            </li>
                        </ul>

                        <div className="p-4 bg-dark rounded-bottom rounded-end">
                            {/* Tab Descrizione */}
                            {activeTab === 'details' && (
                                <div className="card bg-secondary bg-opacity-25 border-0">
                                    <div className="card-body">
                                        <h3 className="text-warning mb-3">
                                            <i className="bi bi-journal-text me-2"></i>
                                            Descrizione
                                        </h3>
                                        <p className="text-light fs-5 mb-0">{product.marketing_description}</p>
                                    </div>
                                </div>
                            )}

                            {/* Tab Ingredienti e Allergeni */}
                            {activeTab === 'ingredients' && (
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="card bg-secondary bg-opacity-25 border-0 h-100">
                                            <div className="card-body">
                                                <h3 className="text-warning mb-3">
                                                    <i className="bi bi-droplet me-2"></i>
                                                    Ingredienti
                                                </h3>
                                                <p className="text-light mb-0">{product.ingredients}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card bg-secondary bg-opacity-25 border-0 h-100">
                                            <div className="card-body">
                                                <h3 className="text-warning mb-3">
                                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                                    Allergeni
                                                </h3>
                                                <p className="text-light mb-0">{product.allergens}</p>
                                                <hr className="border-secondary" />
                                                <small className="text-muted">
                                                    <i className="bi bi-info-circle me-1"></i>
                                                    Contiene allergeni. Consulta il personale per maggiori dettagli.
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab Recensioni */}
                            {activeTab === 'reviews' && (
                                <div>
                                    {/* Card Riepilogo Recensioni */}
                                    <div className="card bg-secondary bg-opacity-25 border-0 mb-4">
                                        <div className="card-body text-center">
                                            <h3 className="text-warning mb-3">Recensioni dei Clienti</h3>
                                            <div className="display-1 mb-2">
                                                {renderStars(averageRating)}
                                            </div>
                                            <p className="text-light fs-4 mb-0">
                                                Media di <span className="text-warning fw-bold">{averageRating}</span> su 5
                                            </p>
                                            <p className="text-muted mt-2">
                                                basata su {reviews.length} {reviews.length === 1 ? 'recensione' : 'recensioni'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Lista Recensioni con Card */}
                                    {reviews.length === 0 ? (
                                        <div className="card bg-secondary bg-opacity-25 border-0">
                                            <div className="card-body text-center py-5">
                                                <i className="bi bi-chat-dots display-1 text-muted"></i>
                                                <p className="text-muted mt-3 fs-5">
                                                    Nessuna recensione ancora per questo prodotto.
                                                    <br />
                                                    Sii il primo a lasciare una recensione!
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="reviews-list">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="card bg-secondary bg-opacity-25 border-0 mb-3">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                                                            <div>
                                                                <h5 className="text-warning mb-1">
                                                                    <i className="bi bi-chat-quote me-1"></i>
                                                                    {review.title}
                                                                </h5>
                                                                <div className="mb-2">
                                                                    {renderStars(review.start_rating)}
                                                                </div>
                                                            </div>
                                                            <small className="text-muted">
                                                                <i className="bi bi-calendar me-1"></i>
                                                                {new Date(review.submission_date).toLocaleDateString('it-IT')}
                                                            </small>
                                                        </div>
                                                        <p className="text-light mb-3">{review.body}</p>
                                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                            <small className="text-muted">
                                                                <i className="bi bi-person-circle me-1"></i>
                                                                {review.author_name}
                                                            </small>
                                                            {review.find_it_useful && (
                                                                <small className="text-success">
                                                                    <i className="bi bi-hand-thumbs-up me-1"></i>
                                                                    {review.find_it_useful} persone hanno trovato utile questa recensione
                                                                </small>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Bottone per aggiungere recensione */}
                                    <div className="text-center mt-4">
                                        <button
                                            className="btn btn-outline-warning btn-lg px-5"
                                            data-bs-toggle="modal"
                                            data-bs-target="#reviewModal"
                                        >
                                            <i className="bi bi-pencil-square me-2"></i>
                                            Scrivi una recensione
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal per aggiungere recensione */}
            <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header border-secondary">
                            <h5 className="modal-title text-warning" id="reviewModalLabel">
                                <i className="bi bi-star me-2"></i>
                                Scrivi una recensione per {product.name}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="reviewForm">
                                <div className="mb-3">
                                    <label className="form-label text-warning">Titolo</label>
                                    <input type="text" className="form-control bg-secondary bg-opacity-25 text-light border-secondary" placeholder="es. Fantastico!" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-warning">Il tuo nome</label>
                                    <input type="text" className="form-control bg-secondary bg-opacity-25 text-light border-secondary" placeholder="Come vuoi apparire" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-warning">Valutazione</label>
                                    <select className="form-select bg-secondary bg-opacity-25 text-light border-secondary" required>
                                        <option value="">Seleziona una valutazione...</option>
                                        <option value="5">★★★★★ (5/5) - Eccellente</option>
                                        <option value="4">★★★★☆ (4/5) - Molto buono</option>
                                        <option value="3">★★★☆☆ (3/5) - Buono</option>
                                        <option value="2">★★☆☆☆ (2/5) - Discreto</option>
                                        <option value="1">★☆☆☆☆ (1/5) - Scarso</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-warning">La tua recensione</label>
                                    <textarea className="form-control bg-secondary bg-opacity-25 text-light border-secondary" rows="4" placeholder="Condividi la tua esperienza..." required></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-secondary">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                <i className="bi bi-x-circle me-1"></i>
                                Annulla
                            </button>
                            <button type="button" className="btn btn-warning" onClick={() => alert('Grazie! La tua recensione è stata inviata con successo.')}>
                                <i className="bi bi-send me-1"></i>
                                Invia Recensione
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;