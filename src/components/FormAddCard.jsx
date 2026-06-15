// AddProductModal.jsx
const FormAddCard = ({ show, onClose, onSubmit }) => {
    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Aggiungi Nuovo Prodotto</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nome Prodotto</label>
                                <input type="text" className="form-control" name="name" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descrizione</label>
                                <textarea className="form-control" name="description" rows="2"></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descrizione Marketing</label>
                                <textarea className="form-control" name="marketingDescription" rows="2"></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Prezzo (€)</label>
                                <input type="number" step="0.01" className="form-control" name="price" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Ingredienti</label>
                                <textarea className="form-control" name="ingredients" rows="2" placeholder="Separati da virgola"></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Aggiungi Foto/File</label>
                                <input type="file" className="form-control" accept="image/*" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Annulla
                            </button>
                            <button type="submit" className="btn btn-dark">
                                Salva Prodotto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormAddCard;