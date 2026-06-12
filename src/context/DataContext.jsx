import { useState, useEffect, createContext } from "react";

// Context
const DataContext = createContext(null);

// Definisco l'URL della mia API.
const API_URL = 'http://localhost:3000/products';


// componente Provider per fornire i dati a tutti i figli
function DataProvider({ children }) {

    // STEP 4: Stati che servono per gestire i dati.
    const [items, setItems] = useState([]);     // qui finiranno i dati per le card
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);      

    // useEffect per la fetch 
    useEffect(() => {

        const fetchItems = async () => {
            setLoading(true);  
            setError(null);    

            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('Errore nel fetch');

                const data = await res.json(); 
                setItems(data.results);              

            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchItems(); 

    }, []); 

    // Funzioni CRUD (Create, Update, Delete).
    
    // CREATE
    const createItem = async (payload) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const newItem = await res.json();

        setItems(prev => [...prev, newItem]);

        return newItem;
    };

    // UPDATE
    const updateItem = async (id, payload) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const updated = await res.json();

        setItems(prev => prev.map(i => i.id === id ? updated : i));

        return updated;
    };

    // DELETE
    const deleteItem = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        setItems(prev => prev.filter(i => i.id !== id));
    };

    

    const value = {
        items,      
        loading,    
        error,      
        createItem, 
        updateItem, 
        deleteItem, 
    };

    return (
        <DataContext value={value}>
            {children}
        </DataContext>
    );
}

export { DataContext, DataProvider };