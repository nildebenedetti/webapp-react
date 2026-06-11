import React from 'react';
import { Link } from 'react-router-dom';

function Show() {
    return (
        <>
            <div className='container my-3' >
                <div className="card" style={{ width: "18rem" }}>
                    <img src="https://placehold.co/286x180" className="card-img-top" alt="product" />
                    <div className="card-body">
                        <h5 className="card-title">Nome Prodotto</h5>
                        <p className="card-text">Short description del prodotto qui.</p>
                        <p className="fw-bold">€ 3,99</p>
                        <button className="btn btn-primary">Dettagli</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Show;