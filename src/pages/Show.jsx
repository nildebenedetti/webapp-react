import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';
import { useState } from 'react';
import api from '../services/api';

function Show() {
    const { items, loading, initialLoad, error, fetchItems } = useContext(DataContext)

    //useState tema
    const [newTheme, setNewTheme] = useState(false)

    const toggleTheme = () => {
        setNewTheme(!newTheme)
    }

    //useState per ricerca
    const [research, setResearch] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    const handleSearch = () => {
        console.log('research:', research);

        if (research.trim() === '') {
            setSearchResults(null);
            return;
        }

        api.searchProducts(research)
            .then(data => {
                console.log('risultati ricevuti:', data);
                setSearchResults(data);
            })
            .catch(err => console.error('errore ricerca:', err));
    }

    const displayedItems = searchResults !== null ? searchResults : items;

    //resettare la search bar al click dei filtri 
    const handleReset = (categoryID) => {
        setSearchResults(null)
        setResearch('')
        fetchItems(categoryID)
    }

    if (initialLoad) return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
    if (error) return <Navigate to='/NotFound' />

    return (

        <>
            <div className='hero-products'>
                <div className='container my-3' >

                    <div className='d-flex justify-content-center mt-4 mb-3'>
                        <button className={`rounded-pill fw-bold ${newTheme ? 'btn btn-warning' : 'btn btn-dark'}`} onClick={toggleTheme}>
                            {newTheme ? 'Ricerca per Prodotto' : 'Ricerca per Tema'}
                        </button>

                        {/*input search bar */}
                        <div className='d-flex justify-content-center mx-4'>
                            <button
                                className="btn btn-dark rounded-pill ms-2"
                                type="button"
                                onClick={handleSearch}
                            >
                                <i className="bi bi-search"></i>
                            </button>

                            <div>
                                <input
                                    type="text"
                                    className="form-control rounded-pill mx-2"
                                    placeholder="Cerca..."
                                    style={{ minWidth: '200px' }}
                                    value={research}
                                    onChange={e => setResearch(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='btn-filter  d-flex justify-content-center gap-2 flex-wrap'>
                        <div className='selectcategories'>
                            <div className={`btnproduct ${newTheme ? 'd-none' : 'd-block'}`}>
                                <button className='btn btn-warning rounded-pill fw-bold border-dark border-3' onClick={() => handleReset()}>Tutti</button>
                                <button className='btn btn-warning rounded-pill fw-bold border-dark border-3' onClick={() => handleReset(6)}>Coni</button>
                                <button className='btn btn-warning rounded-pill fw-bold border-dark border-3' onClick={() => handleReset(7)}>Coppette</button>
                                <button className='btn btn-warning rounded-pill fw-bold border-dark border-3' onClick={() => handleReset(8)}>Granite</button>
                                <button className='btn btn-warning rounded-pill fw-bold border-dark border-3' onClick={() => handleReset(9)}>Gusti Speciali</button>
                                <button className='btn-le btn btn-warning rounded-pill fw-bold border-3' onClick={() => handleReset(10)}>Limited Edition</button>
                            </div>
                            <div className={`btntheme ${newTheme ? 'd-block' : 'd-none'}`}>
                                <button className='btn btn-dark rounded-pill fw-bold border-warning border-3' onClick={() => handleReset(1)}>Zombie</button>
                                <button className='btn btn-dark rounded-pill fw-bold border-warning border-3' onClick={() => handleReset(2)}>Fantasmi</button>
                                <button className='btn btn-dark rounded-pill fw-bold border-warning border-3' onClick={() => handleReset(3)}>Serial Killer</button>
                                <button className='btn btn-dark rounded-pill fw-bold border-warning border-3' onClick={() => handleReset(4)}>Villain</button>
                                <button className='btn btn-dark rounded-pill fw-bold border-warning border-3' onClick={() => handleReset(5)}>Vampiri</button>
                            </div>

                        </div>
                    </div>
                    <div className="row d-flex justify-content-center flex-wrap">
                        {displayedItems.map(item => (
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