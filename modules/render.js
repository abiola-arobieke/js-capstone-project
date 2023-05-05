const createNewElement = async (url, recipeArray) => {
  const divElement = document.getElementById('grid');
  const getData = await recipeArray(url);

  while (divElement.hasChildNodes()) {
    divElement.removeChild(divElement.firstChild);
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
                    <button class="b-none bg-white" type="button">
                        <i class="fa fa-heart-o ft-28" aria-hidden="true"></i> 
                    </button>
                    <div class="d-flex justify-end pt-5">5 likes</div>
                </div>
              </div>   
              <div>
                  <button class="comment-btn py-10 bg-white capitalize" type="button">Comments</button>
              </div>
          </div>
        `;
    const section = document.createElement('div');
    section.classList.add('card');
    section.innerHTML = cardChild;
    divElement.appendChild(section);
  });
};

export default createNewElement;
