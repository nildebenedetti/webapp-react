import { formatDate } from "../utils/fucntions.js";
import FindItUseful from "./FindItUseful.jsx";

function ReviewCard({ review }) {
    return (
        <div className="card review-card mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    {review.title}
                </h5>
                <p className="rating-star">
                    {"★".repeat(Number(review.start_rating))}
                    {"☆".repeat(5 - Number(review.start_rating))}
                </p>
                <p>{review.body}</p>
                <p className="mb-0">
                    <strong>{review.author_name}</strong>
                </p>
                <div className="d-flex justify-content-between py-2 px-1">
                    <FindItUseful reviewLikes={review.find_it_useful} />
                    <div>
                        <p className="date-text small fst-italic text-black-50 py-1 m-0">
                            Pubblicato il {formatDate(review.submission_date)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;