import { useState } from "react";



function FindItUseful({ reviewLikes }) {
    const [findItUsefulCount, setFindItUsefulCount] = useState(reviewLikes);
    const [isLiked, setIsLiked] = useState(false); // toggle per il like

    const clickHandler = () => {
        if (isLiked === false) {
            setFindItUsefulCount(reviewLikes + 1);
            setIsLiked(true)
        } else if (isLiked === true) {
            setFindItUsefulCount(reviewLikes);
            setIsLiked(false)
        }
    };

    return (
        <div className="d-flex justify-content-start">
            <span className="like-btn spx-2" onClick={clickHandler}>
                <i className="bi bi-hand-thumbs-up-fill"></i>
            </span>
            <p className={`date-text small text-black-50 py-1 ${isLiked ? "btn-liked" : '' }`}>{findItUsefulCount} {findItUsefulCount > 1 || findItUsefulCount === 0
                ? "persone l'hanno trovata utile"
                : "persona l'ha trovata utile"}</p>
        </div>
    )
}
export default FindItUseful;