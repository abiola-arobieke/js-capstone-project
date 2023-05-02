import './style.css';
import './index.html';
import createNewElement from '../modules/render.js';

const apiUrl = 'https://api.sampleapis.com/recipes/recipes';

const getAllRecipe = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res;
};

createNewElement(apiUrl, getAllRecipe);
