import { useState } from 'react';
import api from '../services/api';

function ReviewForm({ productId, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        start_rating: 5,
        author_name: '',
        submission_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        product_id: productId
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const newReview = await api.createReview(formData);
            onSuccess(newReview);
            // Reset form
            setFormData({
                title: '',
                body: '',
                start_rating: 5,
                author_name: '',
                submission_date: new Date().toISOString().split('T')[0],
                product_id: productId
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Scrivi una recensione</h3>

            {error && <div className="error">{error}</div>}

            <input
                type="text"
                placeholder="Titolo"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
            />

            <textarea
                placeholder="La tua recensione"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                required
            />

            <select
                value={formData.start_rating}
                onChange={(e) => setFormData({ ...formData, start_rating: parseInt(e.target.value) })}
                required
            >
                {[1, 2, 3, 4, 5].map(r => (
                    <option key={r} value={r}>{r} stelle</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Il tuo nome"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                required
            />

            <button type="submit" disabled={submitting}>
                {submitting ? 'Invio...' : 'Invia recensione'}
            </button>
        </form>
    );
}

export default ReviewForm;