import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
const loadMore = document.querySelector('.btn-load');
let page = 1;


form.addEventListener('submit', event => {
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

  clearGallery();
  showLoader(); 
hideLoadMoreButton();

  getImagesByQuery(query, page)
    .then(data => {
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


      createGallery(data.hits);

      iziToast.success({
        title: 'Success',
        message: `Found ${data.totalHits} images!`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        titleColor: '#fff',
        timeout: 3000,
      });
      showLoadMoreButton();
loadMore.addEventListener('click', 
async function addGalleryItems() {
  page += 1;
  getImagesByQuery(query, page);

 
  return createGallery(data.hits);
});



    })
    .catch(error => {
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
    });

  searchInput.value = '';
});