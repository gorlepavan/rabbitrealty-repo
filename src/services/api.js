import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const propertyService = {
    // Get all properties
    getAllProperties: async () => {
        try {
            const response = await api.get('/properties');
            return response.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Get property by ID
    getPropertyById: async (id) => {
        try {
            const response = await api.get(`/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching property ${id}:`, error);
            throw error;
        }
    },

    // Create new property
    createProperty: async (propertyData) => {
        try {
            const response = await api.post('/properties', propertyData);
            return response.data;
        } catch (error) {
            console.error('Error creating property:', error);
            throw error;
        }
    },

    // Update property
    updateProperty: async (id, propertyData) => {
        try {
            const response = await api.put(`/properties/${id}`, propertyData);
            return response.data;
        } catch (error) {
            console.error(`Error updating property ${id}:`, error);
            throw error;
        }
    },

    // Delete property
    deleteProperty: async (id) => {
        try {
            await api.delete(`/properties/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting property ${id}:`, error);
            throw error;
        }
    },

    // Search properties
    searchProperties: async (filters) => {
        try {
            const response = await api.get('/properties/search', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Error searching properties:', error);
            throw error;
        }
    }
}; 