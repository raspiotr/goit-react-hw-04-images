import axios from 'axios';

export async function fetchImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '9318257-96b567a3bb5708a16f509a99b';
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);
  return response;
}
