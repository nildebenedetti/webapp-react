function ReviewFormFields({ formData, setFormData }) {
    return (
        <>
            <div className="mb-3">
                <label className="form-label">
                    Titolo
                </label>
                <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            title: event.target.value
                        })
                    }
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Recensione
                </label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={formData.body}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            body: event.target.value
                        })
                    }
                    required
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Valutazione
                </label>
                <select
                    className="form-select"
                    value={formData.start_rating}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            start_rating: Number(event.target.value)
                        })
                    }
                    required
                >
                    <option value={5}>5 stelle</option>
                    <option value={4}>4 stelle</option>
                    <option value={3}>3 stelle</option>
                    <option value={2}>2 stelle</option>
                    <option value={1}>1 stella</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Il tuo nome
                </label>
                <input
                    type="text"
                    className="form-control"
                    value={formData.author_name}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            author_name: event.target.value
                        })
                    }
                    required
                />
            </div>
        </>
    );
}

export default ReviewFormFields;