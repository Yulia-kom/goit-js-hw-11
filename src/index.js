import './sass/main.scss';
import { searchApi, PER_PAGE } from './service';
import { refs } from './refs';
import { getGalleryMarkup } from './markup';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.loadMoreBtn.hidden = true;

let page = 1;
let query = "";

const lightbox = new SimpleLightbox('.gallery a',
  {
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
  });

refs.searchForm.addEventListener("submit",
  async (event) => {
    event.preventDefault();
    refs.loadMoreBtn.hidden = true;

    query = event.currentTarget.elements.searchQuery.value;
    page = 1;
    const data = await searchApi(query, page);

    if (data.totalHits > 0) {
      const markup = getGalleryMarkup(data.hits);
      refs.gallery.innerHTML = markup;
      scrollToCard(0);

      if (data.totalHits > PER_PAGE) {
        refs.loadMoreBtn.hidden = false;
      }
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } else {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
  }
);

refs.loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  const data = await searchApi(query, page);

  if (page * PER_PAGE >= data.totalHits) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.hidden = true;
  } else {
    Notiflix.Notify.info(`Added ${data.hits.length} images.`);
  }

  const markup = getGalleryMarkup(data.hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  scrollToCard((page - 1) * PER_PAGE);
  lightbox.refresh();
});

function scrollToCard(num) {
  const rect = refs.gallery.children[num].getBoundingClientRect();
  window.scrollBy({
    top: rect.y,
    behavior: "smooth"
  });
}
