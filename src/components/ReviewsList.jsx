import { useEffect, useState } from "react";
import api from "../services/api";

function ReviewsList({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await api.getReviewsByProductId(productId);
                setReviews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);
    const startIndex = currentPage * reviewsPerPage;
    const visibleReviews = reviews.slice(
        startIndex,
        startIndex + reviewsPerPage
    );
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    if (loading) {
        return <p className="text-light mt-4">Caricamento recensioni...</p>;
    }
    if (error) {
        return (
            <p className="text-danger mt-4">
                Errore nel caricamento delle recensioni: {error}
            </p>
        );
    }
    return (
        <section className="mt-5">
            <h2 className="text-light mb-4">Recensioni</h2>
            {reviews.length === 0 ? (
                <p className="text-light">
                    Nessuna recensione disponibile.
                </p>
            ) : (
                <>
                    {visibleReviews.map(review => (
                        <div className="card mb-3" key={review.id}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {review.title}
                                </h5>
                                <p>
                                    {"★".repeat(review.start_rating)}
                                    {"☆".repeat(5 - review.start_rating)}
                                </p>
                                <p>{review.body}</p>
                                <p className="mb-0">
                                    <strong>{review.author_name}</strong>
                                </p>
                            </div>
                        </div>
                    ))}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button
                                className="btn btn-warning"
                                disabled={currentPage === 0}
                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }
                            >
                                ←
                            </button>
                            <span className="align-self-center text-light">
                                Pagina {currentPage + 1} di {totalPages}
                            </span>
                            <button
                                className="btn btn-warning"
                                disabled={currentPage === totalPages - 1}
                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }
                            >
                                →
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default ReviewsList;