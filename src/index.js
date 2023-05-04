import './style.css';
import './index.html';
import { apiUrl, likeUrl } from '../modules/endpoint.js';
import createNewElement from '../modules/render.js';
import { getAllLikes } from '../modules/likes.js';
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
createNewElement(apiUrl, likeUrl, getAllRecipe, getAllLikes);