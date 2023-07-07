import axios from 'axios';

const API_KEY = '36582526-a8db093774735a2a7b8946e60';
const BASE_URL = 'https://pixabay.com/api/';

export async  function fetchImages ( searchQuery = '', page = 1, perPage = 12 ) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
  try {
    const { data: { totalHits, hits } } = await axios.get(url);
    return { images: hits, totalImages: totalHits};
  } catch(error) {
    console.error('Error getting images', error);
  }
}
