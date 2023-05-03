import  { commentUrl } from "../modules/endpoint.js";

const createPopup = (recipeId) => {
  // Create popup window
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const popupContent = `
    <h2>Add Comment</h2>
    <form id="comment-form">
      <div>
        <label for="user-input">User:</label>
        <input type="text" id="user-input" name="user" required>
      </div>
      <div>
        <label for="comment-input">Comment:</label>
        <textarea id="comment-input" name="comment" required></textarea>
      </div>
      <button type="submit">Submit</button>
      <button type="button" class="close-btn">Close</button>
    </form>
  `;
  popup.innerHTML = popupContent;
  document.body.appendChild(popup);

  // Close popup when close button is clicked
  const closeBtn = popup.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    popup.remove();
  });

  // Add event listener to form submit
  const form = popup.querySelector('#comment-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = event.target.elements.user.value;
    const comment = event.target.elements.comment.value;
    const data = {
      item_id: recipeId,
      user,
      comment,
    };
    // Call API to add comment
    const response = await fetch(commentUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      // Display success message and remove popup after 2 seconds
      const successMsg = document.createElement('p');
      successMsg.textContent = 'Comment added successfully!';
      successMsg.classList.add('success-msg');
      form.insertAdjacentElement('beforebegin', successMsg);
      setTimeout(() => {
        popup.remove();
      }, 2000);
    } else {
      // Display error message
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Failed to add comment. Please try again later.';
      errorMsg.classList.add('error-msg');
      form.insertAdjacentElement('beforebegin', errorMsg);
    }
  });
};

// Add event listeners to comment buttons
const commentBtns = document.querySelectorAll('.comment-btn');
commentBtns.forEach((recipe) => {
  btn.addEventListener('click', () => {
    const recipeId = recipe.id;
    createPopup(recipeId);
  });
});


