import { addLike, getLikes } from './likes.js';
import { likeUrl } from './endpoint.js';
const popUp = document.getElementById('modal');
const createNewElement = async (baseUrl, interUrl, recipeArray, likesArray) => {
  const totalRecipe = document.getElementById('recipe');
  const grid = document.getElementById('grid');
  const getData = await recipeArray(baseUrl);
  const allLikes = await likesArray(interUrl);
  totalRecipe.innerHTML = `(${getData.length})`;
  // Remove existing childNodes
  while (grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }
  getData.forEach((recipe) => {
    const recipeItem = allLikes.find((item) => item.item_id === recipe.id);
    const cardChild = `
          <img class=“card-img” src=“${recipe.photoUrl}” alt=“recipe.title”>
          <div class=“card-detail”>
              <div class=“d-flex space-btw py-10”>
                <div class=“card-title”>
                  <h4 class=“ft-20 capitalize”>
                      ${recipe.title}
                  </h4>
                </div>
                <div class=“card-likes d-flex flex-col align-end”>
                    <i id=“${recipe.id}” class=“fa fa-heart-o ft-28" aria-hidden=“true”></i>
                    <div class=“d-flex justify-end pt-5"> ${recipeItem ? `${recipeItem.likes} ${recipeItem.likes > 1 ? 'likes' : 'like'}` : `${0} like`}</div>
                </div>
              </div>
              <div>
                  <button name=“${recipe.id}” class=“comment-btn py-10 bg-white capitalize” type=“button”>Comments</button>
              </div>
          </div>
        `;
    const divElement = document.createElement('div');
    divElement.classList.add('card');
    divElement.innerHTML = cardChild;
    grid.appendChild(divElement);
    const likeBtn = document.getElementById(`${recipe.id}`);
    const commentBtn = document.getElementsByName(`${recipe.id}`)[0];
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
    commentBtn.addEventListener('click', () => {
      popUp.style.display = 'block';
    });
  });
};
const closeBtn = document.getElementById('close');
closeBtn.addEventListener('click', () => {
  popUp.style.display = 'none';
});
export default createNewElement;