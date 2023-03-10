import Show from './showClass.js';
import { showInfo } from './tvmaze.js';
import { getUserInfo, postLike } from './involvement.js';
import commentClicked from './commentPopup.js';

export default class Shows {
  constructor(entryDom, showCountDom) {
    this.shows = [];
    this.count = 0;
    this.entryDom = entryDom;
    this.showCountDom = showCountDom;
  }

  #addToDom = (showElement) => {
    this.entryDom.appendChild(showElement);
  }

  #showCount = () => {
    this.showCountDom.textContent = `Shows listed (${this.shows.length})`;
  }

  generateInitial = (showList) => {
    showList.forEach(async (showTitle) => {
      const s = await showInfo(showTitle);
      const u = await getUserInfo(s.id);
      const newShow = await new Show(s.id, s.name, s.summary, s.image, u.likes, u.comments);
      this.shows.push(await newShow);
      this.count = await this.shows.length;
      this.#showCount();
      this.#addToDom(this.showEntryDom(newShow));
    });
  }

  addLikes = (id, div) => {
    const likeBtn = div.querySelector(`#like-${id}`);
    const likeCount = div.querySelector(`#likes-count-${id}`);
    likeBtn.addEventListener('click', async () => {
      likeCount.textContent = await postLike(id);
    });
  }

  showEntryDom = (show) => {
    const div = document.createElement('div');
    div.classList = 'col-lg-4 col-md-6 col-12';
    div.innerHTML = `
      <div class="card p-3">
        <div class="card-img-top d-flex align-items-center justify-content-center">
          <img src="${show.image}" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">${show.title}<span class="ms-2 badge bg-primary rounded-pill">${show.id}</span></h5>
          <p class="card-text">${show.summary.substring(0, 100)}...</p>
          <div class="d-md-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center justify-content-between">
              <a id="comments-${show.id}" href="#" class="btn btn-primary">Check comments</a>
              <button id="like-${show.id}" class="ms-2 btn btn-primary text-light"><i class="fa-solid fa-thumbs-up"></i></button>
            </div>
            <div>
              <div class="d-flex align-items-center justify-content-between">
                Likes
                <span id="likes-count-${show.id}" class="ms-2 badge bg-primary rounded-pill">${show.likes}</span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                Comments
                <span id="comments-count-${show.id}" class="ms-2 badge bg-primary rounded-pill">${show.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    this.addLikes(show.id, div);
    const eventTest = div.querySelector(`#comments-${show.id}`);
    eventTest.addEventListener('click', (e) => {
      e.preventDefault();
      // console.log(`test-${show.id}-${show.title}`);
      commentClicked(show);
    });

    return div;
  }
}
