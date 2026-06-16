import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function ProductCardShow({ item }) {
    const { toggleWishlist, isInWishlist } = useContext(DataContext);

    return <div className="card product-card m-3" style={{ width: "18rem" }}>
        <button
            type="button"
            className="btn btn-black-50 position-absolute top-0 end-0 m-2 rounded-circle"
            onClick={() => toggleWishlist(item)}
        >
            {isInWishlist(item.id) ? (
                <i className="bi bi-heart-fill text-danger"></i>
            ) : (
                <i className="bi bi-heart text-danger"></i>
            )}
        </button>
        <img src={item.image_url} className="card-img-top" alt={item.title} />
        <div className="card-body">
            <h5 className="card-title">{item.name}</h5>

            <div className="d-flex align-items-center mb-3 justify-content-between">
                <p className="fw-bold mb-0">€ {item.price}</p>
                <Link to={`/ProductDetail/${item.id}`} className="text-dark text-decoration-none" aria-label="Dettagli">
                    <i className="bi bi-arrow-right-circle-fill fs-2"></i>
                </Link>
            </div>
            {/*btn delete and modify*/}
            {/* <div className="d-flex">
                                <button className="btn btn-dark me-1">
                                    <i className="bi bi-pencil-fill text-white"></i>
                                </button>
                                <button className="btn btn-danger">
                                    <i className="bi bi-trash-fill text-white"></i>
                                </button>
                            </div>*/}
        </div>
    </div>
};

export default ProductCardShow;