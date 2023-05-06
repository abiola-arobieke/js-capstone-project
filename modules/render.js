import moment from 'moment';
import { addLike, getLikes } from './likes.js';
import { likeUrl, commentUrl } from './endpoint.js';
import { addComment, getComment } from './comment.js';

const getCommenturl = `${commentUrl}?item_id=`;

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

  getData.forEach(async (recipe) => {
    const recipeItem = allLikes.find((item) => item.item_id === recipe.id);
    const newUrl = `${getCommenturl}${recipe.id}`;
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
                    <i id="${recipe.id}" class="fa fa-heart-o ft-28 pointer" aria-hidden="true"></i> 
                    <div class="d-flex justify-end pt-5"> ${recipeItem ? `${recipeItem.likes} ${recipeItem.likes > 1 ? 'likes' : 'like'}` : `${0} like`}</div>
                </div>
              </div>   
              <div>
                  <button name="${recipe.id}" class="comment-btn py-10 bg-white pointer capitalize" type="button">Comments</button>
              </div>
          </div>
          <div class="modal hide">
                        <div class="modal-container">
                            <span id="close" class="close">
                                <i id="${recipe.id} ${'close'}" class="fa fa-times" aria-hidden="true"></i>
                            </span>
                            <div class="modal-info">
                                <div id="recipe-info">
                                    <div id="modal-detail">
                                        <div>
                                            <img class="w-100c pop-image" src="${recipe.photoUrl}"> 
                                        </div>
                                        <div class="py-10">
                                            <h4 class="ft-20 capitalize text-center">${recipe.title}</h4> 
                                        </div> 
                                        <div class="grid-2">
                                            <div class="py-10">Calories: ${recipe.calories}</div>
                                            <div class="py-10">Main Ingredient: ${recipe.mainIngredient}</div>
                                            <div class="py-10">Cholesterol: ${recipe.cholesterol}</div>
                                            <div class="py-10">Cook Time: ${recipe.cookTime} mins</div>
                                        </div> 
                                    </div> 
                                </div>
                                <div class="comments-section">
                                    <h4 class="py-20 text-center"></h4>
                                    <ul id="comment-list">
                                        <li>Alex is a boy</li>
                                        <li>Alex is a boy</li>
                                        <li>Alex is a boy</li>
                                    </ul>
                                </div>
                                <div class="w-100c">
                                    <h4 class="form-text-header py-10 text-center">Add a comment</h4>
                                    <form  action="form" class="form d-flex flex-col gap-10">
                                    <input class="py-10 capitalize ft-16" type="text" id="userName" placeholder="Your name" name="user">
                                    <textarea class="ft-16" name="textarea" id="textarea" cols="30" rows="10" placeholder="Your insights"></textarea>
                                    <button class="py-10 submit-comment pointer btn-submit" type="button" id="${recipe.id} ${'comment-btn'}" title="${recipe.id}">Comment</button>
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
    const closeBtn = document.getElementById(`${recipe.id} ${'close'}`);
    const submitComment = document.getElementById(`${recipe.id} ${'comment-btn'}`);

    likeBtn.addEventListener('click', async (event) => {
      const getId = {
        item_id: Number(event.target.id),
      };
      const updateLike = await addLike(likeUrl, JSON.stringify(getId));
      if (updateLike) {
        event.target.classList.add('heart');
        const likesCount = await getLikes(likeUrl, getId.item_id);
        if (likesCount > 1) {
          event.target.nextElementSibling.innerHTML = `${likesCount} likes`;
        } else {
          event.target.nextElementSibling.innerHTML = `${likesCount} like`;
        }
      }
    });

    commentBtn.addEventListener('click', async (e) => {
      const showModal = e.target.parentElement.parentElement.parentElement.lastElementChild;
      //   comment UL tag
      const ulTag = e.target.parentElement.parentElement.parentElement
        .lastElementChild.firstElementChild.lastElementChild.children.item(1).lastElementChild;
      //   Comment count
      const commentCount = e.target.parentElement.parentElement.parentElement.lastElementChild
        .firstElementChild.lastElementChild.children.item(1).firstElementChild;
      //   Remove existing create tags
      while (ulTag.hasChildNodes()) {
        ulTag.removeChild(ulTag.firstChild);
      }

      showModal.classList.remove('hide');
      showModal.classList.add('show');
      // Get comment count
      const recipeComment = await getComment(newUrl);
      commentCount.innerHTML = recipeComment.length > 0 ? `Comments(${recipeComment.length})` : 'Comment(0)';
      //  Display comment for each recipe
      recipeComment.forEach((item) => {
        const liTag = document.createElement('li');
        liTag.innerHTML = `${moment(`${item.creation_date}`).locale('en-gb').format('L')} ${item.username}${':'} ${item.comment}`;
        ulTag.appendChild(liTag);
      });
    });

    closeBtn.addEventListener('click', (e) => {
      const closeModal = e.target.parentElement.parentElement.parentElement;
      closeModal.classList.remove('show');
      closeModal.classList.add('hide');
    });

    submitComment.addEventListener('click', async (e) => {
      const user = e.target.previousElementSibling.previousElementSibling.value;
      const userComment = e.target.previousElementSibling.value;
      if (user && userComment) {
        const payload = {
          item_id: Number(e.target.title),
          username: user,
          comment: userComment,
        };
        e.target.previousElementSibling.previousElementSibling.value = '';
        e.target.previousElementSibling.value = '';
        await addComment(commentUrl, JSON.stringify(payload));
        // Update comment list
        const recipeComment = await getComment(newUrl);
        const totalComment = e.target.parentElement.parentElement
          .parentElement.children.item(1).firstElementChild;
        const ulTagComment = e.target.parentElement.parentElement
          .parentElement.children.item(1).firstElementChild.nextElementSibling;
        // Remove existing li tag
        while (ulTagComment.hasChildNodes()) {
          ulTagComment.removeChild(ulTagComment.firstChild);
        }
        totalComment.innerHTML = recipeComment.length > 0 ? `Comments(${recipeComment.length})` : 'Comment(0)';
        // Display comment for each recipe
        recipeComment.forEach((item) => {
          const liTag = document.createElement('li');
          liTag.innerHTML = `${moment(`${item.creation_date}`).locale('en-gb').format('L')} ${item.username}${':'} ${item.comment}`;
          ulTagComment.appendChild(liTag);
        });
      }
    });
  });
};

export default createNewElement;
