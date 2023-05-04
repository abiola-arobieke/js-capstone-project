import { addLike, getLikes } from './likes.js';
import { likeUrl } from './endpoint.js';


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
      <img class='card-img' src='${recipe.photoUrl}' alt='recipe.title'>
        <div class='card-detail'>
          <div class='d-flex space-btw py-10'>
            <div class='card-title'>
              <h4 class='ft-20 capitalize'>
                ${recipe.title}
              </h4>
            </div>
            <div class='card-likes d-flex flex-col align-end'>
              <i id='${recipe.id}' class='fa fa-heart-o ft-28" aria-hidden='true'></i>
              <div class='d-flex justify-end pt-5"> 
                ${recipeItem ? `${recipeItem.likes} ${recipeItem.likes > 1 ? 'likes' : 'like'}` : `${0} like`}
              </div>
            </div>
          </div>
          <div>
            <button name='${recipe.id}' class='comment-btn py-10 bg-white capitalize' type='button'>Comments</button>
          </div>
        </div>
        <div class='modal hide'>
          <div class='modal-container'>
            <span id='close' class='close'>
              <i id='${recipe.id} ${'close'}' class='fa fa-times' aria-hidden='true'></i>
            </span>
            <div class='modal-info'>
              <div id='recipe-info'>
                <div id='modal-detail'>
                  <div>
                    <img class='w-100c pop-image' src='${recipe.photoUrl}'>
                  </div>
                  <div class='py-10'>
                    <h4 class='ft-20 capitalize text-center'>${recipe.title}</h4>
                  </div>
                  <div class='grid-2'>
                    <div class='py-10">Calories: ${recipe.calories}</div>
                    <div class='py-10'>Main Ingredient: ${recipe.mainIngredient}</div>
                    <div class='py-10">Cholesterol: ${recipe.cholesterol}</div>
                    <div class='py-10'>Cook Time: ${recipe.cookTime} mins</div>
                  </div>
                </div>
              </div>
              <div class='comments-section'>
                <h4 class='py-20 text-center'>Comment(2)</h4>
                <ul>
                  <li>Alex is a boy</li>
                  <li>Alex is a boy</li>
                  <li>Alex is a boy</li>
                </ul>
              </div>
              <div class='w-100c'>
                <h4 class='form-text-header py-10 text-center'>Add a comment</h4>
                <form  action='form' class='form d-flex flex-col gap-10'>
                  <input class='py-10" type='text' id='userName' placeholder='Your name' name='user'>
                  <textarea name='textarea' id='textarea' cols='30' rows='10" placeholder='Your insights'></textarea>
                  <button class='py-10" type='button' id='comment-btn'>Comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    `;
    const divElement = document.createElement('div');
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

    /*

    commentBtn.addEventListener('click', (e) => {
      const showModal = e.target.parentElement.parentElement.parentElement.lastElementChild;
      showModal.classList.remove('hide');
      showModal.classList.add('show');
    }); */
    const closeBtn = document.getElementById(`${recipe.id} ${'close'}`);
    closeBtn.addEventListener('click', (e) => {
      const closeModal = e.target.parentElement.parentElement.parentElement;
      closeModal.classList.remove('show');
      closeModal.classList.add('hide');
    });
  });
};
export default createNewElement;