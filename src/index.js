import './style.css';
import './index.html';
import { apiUrl } from '../modules/endpoint.js';
import createNewElement from '../modules/render.js';

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
