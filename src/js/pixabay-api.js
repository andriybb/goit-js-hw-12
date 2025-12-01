import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_KEY; 
const baseUrl = 'https://pixabay.com/api/';

export function getImagesByQuery(query, page) {

  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };
  return axios.get(baseUrl, { params: searchParams }).then(response => response.data);
}
