import axios from 'axios';

const API_KEY = '53379433-198b2b18e5117643ffa461def'; 


const baseUrl = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };
  
  const response = await axios.get(baseUrl, { params: searchParams });
  return response.data;
}
