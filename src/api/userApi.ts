import type { ApiResponse, ApiError } from '../types/user';

const API_BASE_URL = 'https://randomuser.me/api';

export const fetchUsers = async (count: number = 100): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?results=${count}&seed=userseed`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    

    if ('error' in data) {
      throw new Error((data as ApiError).error);
    }
    
    return data as ApiResponse;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserDisplayName = (user: { name: { first: string; last: string } }): string => {
  return `${user.name.first} ${user.name.last}`;
};

export const formatAddress = (location: {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: string;
}): string => {
  return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country} ${location.postcode}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}; 