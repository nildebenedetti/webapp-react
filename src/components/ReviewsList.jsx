import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { formatDate } from "../utils/fucntions.js";
import FindItUseful from "./FindItUseful.jsx";

function ReviewsList({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [ratingFilter, setRatingFilter] = useState(null);
    const reviewsPerPage = 3;
    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await api.getReviewsByProductId(productId);
                setReviews(Array.isArray(data) ? data : []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);
    const averageRating = useMemo(() => {
        if (reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce(
            (sum, review) => sum + Number(review.start_rating),
            0
        );
        return total / reviews.length;
    }, [reviews]);
    const ratingSummary = useMemo(() => {
        return [5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(
                review => Number(review.start_rating) === rating
            ).length;
            const percentage =
                reviews.length === 0
                    ? 0
                    : Math.round((count / reviews.length) * 100);
            return {
                rating,
                count,
                percentage
            };
        });
    }, [reviews]);
    const filteredReviews = useMemo(() => {
        if (ratingFilter === null) {
            return reviews;
        }
        return reviews.filter(
            review => Number(review.start_rating) === ratingFilter
        );
    }, [reviews, ratingFilter]);
    const startIndex = currentPage * reviewsPerPage;
    const visibleReviews = filteredReviews.slice(
        startIndex,
        startIndex + reviewsPerPage
    );
    const totalPages = Math.ceil(
        filteredReviews.length / reviewsPerPage
    );
    const handleRatingFilter = rating => {
        setRatingFilter(rating);
        setCurrentPage(0);
    };
    const resetRatingFilter = () => {
        setRatingFilter(null);
        setCurrentPage(0);
    };
    if (loading) {
        return (
            <p className="text-light mt-4">
                Caricamento recensioni...
            </p>
        );
    }
    if (error) {
        return (
            <p className="text-danger mt-4">
                Errore nel caricamento delle recensioni: {error}
            </p>
        );
    }
    return (
        <section className="mt-5 pb-4">
            <h2 className="text-light mb-4 fw-bold">
                Recensioni clienti
            </h2>
            {reviews.length === 0 ? (
                <p className="text-light">
                    Nessuna recensione disponibile.
                </p>
            ) : (
                <>
                    <div className="card main-card mb-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <span className="fs-4 rating-star">
                                    {"★".repeat(
                                        Math.round(averageRating)
                                    )}
                                    {"☆".repeat(
                                        5 - Math.round(averageRating)
                                    )}
                                </span>
                                <span className="fs-4">
                                    {averageRating
                                        .toFixed(1)
                                        .replace(".", ",")}{" "}
                                    su 5
                                </span>
                            </div>
                            <p className="text-secondary">
                                {reviews.length} valutazioni
                            </p>
                            {ratingSummary.map(item => (
                                <button
                                    type="button"
                                    key={item.rating}
                                    className={`btn w-100 border-0 text-start mb-2 ${ratingFilter === item.rating
                                        ? "bg-warning-subtle"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        handleRatingFilter(item.rating)
                                    }
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <span
                                            style={{ minWidth: "70px" }}
                                        >
                                            {item.rating}{" "}
                                            {item.rating === 1
                                                ? "stella"
                                                : "stelle"}
                                        </span>
                                        <div
                                            className="progress flex-grow-1"
                                            role="progressbar"
                                            aria-valuenow={
                                                item.percentage
                                            }
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <div
                                                className="progress-bar rating-bar"
                                                style={{
                                                    width: `${item.percentage}%`
                                                }}
                                            />
                                        </div>
                                        <span
                                            style={{ minWidth: "45px" }}
                                        >
                                            {item.percentage}%
                                        </span>
                                    </div>
                                </button>
                            ))}
                            {ratingFilter !== null && (
                                <button
                                    type="button"
                                    className="btn btn-dark mt-2 fw-bold"
                                    onClick={resetRatingFilter}
                                >
                                    Mostra tutte le recensioni
                                </button>
                            )}
                        </div>
                    </div>
                    <h3 className="text-light mb-3 fw-bold">
                        {ratingFilter === null
                            ? "Tutte le recensioni"
                            : `Recensioni da ${ratingFilter} ${ratingFilter === 1
                                ? "stella"
                                : "stelle"
                            }`}
                    </h3>
                    {visibleReviews.length === 0 ? (
                        <p className="text-light">
                            Nessuna recensione trovata.
                        </p>
                    ) : (
                        visibleReviews.map(review => (
                            <div
                                className="card review-card mb-3"
                                key={review.id}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {review.title}
                                    </h5>
                                    <p className="rating-star">
                                        {"★".repeat(
                                            Number(
                                                review.start_rating
                                            )
                                        )}
                                        {"☆".repeat(
                                            5 -
                                            Number(
                                                review.start_rating
                                            )
                                        )}
                                    </p>
                                    <p>{review.body}</p>
                                    <p className="mb-0">
                                        <strong>
                                            {review.author_name}
                                        </strong>
                                    </p>
                                    
                                    <div className="d-flex justify-content-end px-2">
                                        <p className="date-text small fst-italic text-black-50 py-1 m">Pubblicato il {formatDate(review.submission_date)}</p>
                                    </div>
                                    <FindItUseful reviewLikes={review.find_it_useful}/>
                                </div>

                            </div>
                        ))
                    )}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button
                                className="btn btn-warning"
                                disabled={currentPage === 0}
                                onClick={() =>
                                    setCurrentPage(
                                        previousPage =>
                                            previousPage - 1
                                    )
                                }
                            >
                                ←
                            </button>
                            <span className="align-self-center text-light">
                                Pagina {currentPage + 1} di{" "}
                                {totalPages}
                            </span>
                            <button
                                className="btn btn-warning"
                                disabled={
                                    currentPage >= totalPages - 1
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        previousPage =>
                                            previousPage + 1
                                    )
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