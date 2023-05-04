import './style.css';
import './index.html';
import { apiUrl, likeUrl, commentUrl } from '../modules/endpoint.js';
import createNewElement from '../modules/render.js';
import { getAllLikes } from '../modules/likes.js';
import {createPopup} from '../modules/popUp';


createPopup();


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

createNewElement(apiUrl, likeUrl, getAllRecipe, getAllLikes );


