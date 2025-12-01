import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMore = document.querySelector('.btn-load');

let page = 1;
let currentQuery = ''; 
let totalHits = 0; 

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchInput = form.elements['search-text'];
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
      backgroundColor: '#ffa500',
      messageColor: '#fff',
      titleColor: '#fff',
    });
    return;
  }

  page = 1;
  currentQuery = query;
  
  clearGallery();
  showLoader(); 
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
      });
      return;
    }

    totalHits = data.totalHits;
    await createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images!`,
      position: 'topRight',
      backgroundColor: '#59A10D',
      messageColor: '#fff',
      titleColor: '#fff',
      timeout: 3000,
    });

    if (page * 15 < totalHits) {
      showLoadMoreButton();
    }

  } catch (error) {
    hideLoader();

    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      titleColor: '#fff',
    });

    console.error('Error:', error);
  }

  searchInput.value = '';
});

loadMore.addEventListener('click', async () => {
  page += 1;
  
  showLoader();
  hideLoadMoreButton();
  
  try {
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();
    
    await createGallery(data.hits);

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#4A90E2',
        messageColor: '#fff',
        titleColor: '#fff',
      });
    } else {
      showLoadMoreButton();
    }

    setTimeout(() => {
      const galleryItem = document.querySelector('.gallery-item');
      
      if (galleryItem) {
        const { height: cardHeight } = galleryItem.getBoundingClientRect();
        
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }, 200);

  } catch (error) {
    hideLoader();
    showLoadMoreButton();
    
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#fff',
      titleColor: '#fff',
    });

    console.error('Error loading more:', error);
  }
});