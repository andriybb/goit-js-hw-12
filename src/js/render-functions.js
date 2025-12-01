import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = null;

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('hidden');
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden');
  }
}

export function showLoadMoreButton() {
  const load = document.querySelector('.btn-load');
  if (load) {
    load.classList.remove('hidden');
  }
}

export function hideLoadMoreButton() {
  const load = document.querySelector('.btn-load');
  if (load) {
    load.classList.add('hidden');
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  
  if (!gallery) {
    console.error('Element .gallery not found in HTML');
    return;
  }


  const markup = images
    .map(image => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img 
              class="gallery-image" 
              src="${webformatURL}" 
              alt="${tags}" 
              loading="lazy"
            />
          </a>
          <div class="image-box-statistic">
            <div class="image-box-statistic-item">
              <p class="info-label">Likes</p>
              <p class="info-value">${likes}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Views</p>
              <p class="info-value">${views}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Comments</p>
              <p class="info-value">${comments}</p>
            </div>
            <div class="image-box-statistic-item">
              <p class="info-label">Downloads</p>
              <p class="info-value">${downloads}</p>
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      overlayOpacity: 0.8,
    });
  } else {
    lightbox.refresh();
  }
}