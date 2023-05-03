import { addLike, getLikes } from './likes.js';
import { likeUrl } from './endpoint.js';

const createNewElement = async (url, recipeArray) => {
  const grid = document.getElementById('grid');
  const getData = await recipeArray(url);

  while (grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }

  getData.forEach((recipe) => {
    const cardChild = `
          <img class="card-img" src="${recipe.photoUrl}" alt="recipe.title">
          <div class="card-detail">
              <div class="d-flex space-btw py-10">
                <div class="card-title">
                  <h4 class="ft-20 capitalize">
                      ${recipe.title}
                  </h4>
                </div>
                <div class="card-likes d-flex flex-col align-end">
                    <i id="${recipe.id}" class="fa fa-heart-o ft-28" aria-hidden="true"></i> 
                    <div class="d-flex justify-end pt-5">0 likes</div>
                </div>
              </div>   
              <div>
                  <button id="${recipe.id}" class="comment-btn py-10 bg-white capitalize" type="button">Comments</button>
              </div>
          </div>
        `;

    const divElement = document.createElement('div');
    divElement.classList.add('card');
    divElement.innerHTML = cardChild;
    grid.appendChild(divElement);
    const likeBtn = document.getElementById(`${recipe.id}`);

    likeBtn.addEventListener('click', async (event) => {
      const getId = {
        item_id: Number(event.target.id),
      };
      const updateLike = await addLike(likeUrl, JSON.stringify(getId));
      if (updateLike) {
        const likesCount = await getLikes(likeUrl, getId.item_id);
        if (likesCount > 1) {
          event.target.nextElementSibling.innerHTML = `${likesCount} likes`;
        } else {
          event.target.nextElementSibling.innerHTML = `${likesCount} like`;
        }
      }
    });
  });
};

export default createNewElement;
