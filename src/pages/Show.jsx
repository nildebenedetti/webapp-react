import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

function Show() {
    const { items, loading, error } = useContext(DataContext)
    
    if (loading) return <p>Pagina in caricamento...</p>
    if (error) return <Navigate to='/NotFound'/>

    return (

        <>
            <div className='hero-products'>
                <div className='container my-3' >
                    <div className="row">
                        {items.map(item => (
                            <div className="card m-3" style={{ width: "18rem" }} key={item.id}>
                                <img src={item.image_url} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.short_description}</p>
                                    <div className="d-flex align-items-center mb-3 justify-content-between">
                                        <p className="fw-bold mb-0">€ {item.price}</p>
                                    </div>
                                    <Link to={`/ProductDetail/${item.id}`}>
                                        <button className="btn btn-dark">Dettagli</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Show;