import React from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { useContext, useState, useEffect } from 'react';
import api from '../services/api';
import FormAddCard from '../components/FormAddCard'

function Show() {
    const { items, loading, initialLoad, error, fetchItems } = useContext(DataContext)

    //useState tema
    const [newTheme, setNewTheme] = useState(false)

    const toggleTheme = () => {
        setNewTheme(!newTheme)
    }

    //show modal form
    const [showModal, setShowModal] = useState(false)

    //useState per ricerca
    const [research, setResearch] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    //useState ricerca per nav
    const [searchParams] = useSearchParams();

    //handle searching bar
    const handleSearch = (term) => {
        const query = term !== undefined ? term : research;

        if (query.trim() === '') {
            setSearchResults(null);
            return;
        }

        api.searchProducts(query)
            .then(data => setSearchResults(data))
            .catch(err => console.error('errore ricerca:', err));
    }

    //useEffect nav search->product search
    useEffect(() => {
        const queryFromUrl = searchParams.get('search');
        if (queryFromUrl) {
            setResearch(queryFromUrl);
            handleSearch(queryFromUrl);
        }
    }, [searchParams]);



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

    //btn form
    const handleSubmitProduct = (e) => {
        e.preventDefault();
    }

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
                                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
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

                    {displayedItems.length === 0 ?
                        (<p className='fw-bold fs-5 text-white d-flex mx-4'>⚠️ Nessun elemento trovato. Riprova!</p>) :
                        (<p className='fw-bold fs-5 text-white d-flex mx-4'>Risultati ({displayedItems.length})</p>)}

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
                                    <div className='d-flex justify-content-between'>
                                        <Link to={`/ProductDetail/${item.id}`}>
                                            <button className="btn btn-dark">Dettagli</button>
                                        </Link>
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
                            </div>
                        ))}
                        <div className="card m-3" style={{ width: "18rem" }}>

                            <div className="card-body d-flex justify-content-center align-items-center">
                                <button className="btn btn-dark" onClick={() => setShowModal(true)}>
                                    Aggiungi Prodotto
                                    <i className="bi bi-plus-circle-fill mx-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FormAddCard
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmitProduct}
            />
        </>
    )
};

export default Show;




