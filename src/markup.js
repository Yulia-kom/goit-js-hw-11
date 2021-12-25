export const getGalleryMarkup = items => {
    return items.map(hit => getCardMarkup(hit))
        .join("");
};

export const getCardMarkup = item => {
    return `<div class="photo-card">
            <a href="${item.largeImageURL}">
                <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class="card-image" />
            </a>
            <div class="info">
                 <p class="info-item">
                   <b>Likes:</b>
                   ${item.likes}
                </p>
                <p class="info-item">
                  <b>Views:</b>
                  ${item.views}
                </p>
                <p class="info-item">
                  <b>Comments:</b>
                  ${item.comments}
                </p>
              <p class="info-item">
                <b>Downloads:</b>
                ${item.downloads}
              </p>
            </div>
          </div >
        `;
};
