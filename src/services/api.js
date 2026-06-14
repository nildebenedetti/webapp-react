const API_BASE_URL = 'http://localhost:3000';

const api = {
    // Categorie
    async getCategories() {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    },

    // Prodotti
    async getProducts() {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    },

    async getProductById(id) {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    },

    async searchProducts(searchString) {
        const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchString)}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    },

    // Recensioni
    async getReviews(productId = null) {
        let url = `${API_BASE_URL}/reviews`;
        if (productId) {
            url += `?product_id=${productId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    },

    async getReviewsByProductId(productId) {
        const response = await fetch(`${API_BASE_URL}/reviews/${productId}`);
        if (!response.ok) {
            throw new Error(
                `Errore HTTP ${response.status} nel recupero delle recensioni`
            );
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.results;
    },

    async getReviewById(id) {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    },

    async createReview(reviewData) {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.results;
    }
};

export default api;