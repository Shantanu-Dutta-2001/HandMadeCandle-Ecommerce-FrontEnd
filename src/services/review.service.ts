import { getList } from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export interface Review {
    id: number;
    userName: string;
    content: string;
    rating: number;
    date: string;
}

export const reviewService = {
    getReviews: () => getList<Review>(API_ENDPOINTS.REVIEWS.BASE)
};
