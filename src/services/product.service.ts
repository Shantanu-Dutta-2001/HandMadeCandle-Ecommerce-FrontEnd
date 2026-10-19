import api, { getList } from './api';
import type { Product } from './mockData';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const productService = {
    getAllProducts: () => getList<Product>(API_ENDPOINTS.PRODUCTS.BASE),

    getProductById: async (id: string): Promise<Product> => {
        const { data } = await api.get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
        return data;
    }
};
