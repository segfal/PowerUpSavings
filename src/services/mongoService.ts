import axios from 'axios';

const API_KEY = process.env.REACT_APP_MONGODB_DATA_API_KEY;
const DATA_API_URL = process.env.REACT_APP_MONGODB_DATA_API_URL;
const DATABASE = 'mongodata';
const COLLECTION = 'transactions';

export const mongoService = {
    async getTransactions() {
        try {
            const response = await axios.post(
                `${DATA_API_URL}/action/find`,
                {
                    collection: COLLECTION,
                    database: DATABASE,
                    dataSource: 'Cluster0',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Headers': '*',
                        'api-key': API_KEY,
                    },
                }
            );
            return response.data.documents;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    },

    async getAccountInfo() {
        try {
            const response = await axios.post(
                `${DATA_API_URL}/action/findOne`,
                {
                    collection: COLLECTION,
                    database: DATABASE,
                    dataSource: 'Cluster0',
                    filter: { type: 'Checking' }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Headers': '*',
                        'api-key': API_KEY,
                    },
                }
            );
            return response.data.document;
        } catch (error) {
            console.error('Error fetching account info:', error);
            throw error;
        }
    }
}; 