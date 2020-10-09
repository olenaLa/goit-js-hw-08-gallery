// Створення і рендер розмітки по масиву даних і наданим шаблоном.
import images from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const galleryElOpen = document.querySelector(`.lightbox`);
const imageOpen = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector(`.lightbox__button`);
const backdropOverlay = document.querySelector(`.lightbox__overlay`);

const imagesGallery = createImagesGallery(images);
galleryContainer.insertAdjacentHTML('beforeend', imagesGallery);
// console.log(createImagesGallery(images));

// Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
galleryContainer.addEventListener('click', onImageGalleryClick);

function createImagesGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}

function onImageGalleryClick(event) {
  event.preventDefault();
  const isImageGalleryEl = event.target.classList.contains('gallery__image');
  if (!isImageGalleryEl) {return;}
  
  galleryElOpen.classList.add(`is-open`);

  // Підміна значення атрибута src елемента img.lightbox__image.
  imageOpen.src = event.target.dataset.source;
  imageOpen.alt = event.target.alt;
}

// Закриття модального вікна при натисканні на кнопку button[data-action="close-modal"].
modalCloseBtn.addEventListener(`click`, closeModal);

function offImageModal(event) {
  imageOpen.src = ``;
  imageOpen.alt = ``;
}

function closeModal(event) {
  galleryElOpen.classList.remove(`is-open`);
  offImageModal();
    }
// Закриття модального вікна при натисканні на div.lightbox__overlay.
backdropOverlay.addEventListener(`click`, onBackdropClick);
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
    offImageModal();
  }
}
// Закриття модального вікна після натискання клавіші ESC.
window.addEventListener('keydown', escKeyPress);

function escKeyPress(event) {
   if (event.code === `Escape`) {
    
  }
  closeModal();
    offImageModal();
}


