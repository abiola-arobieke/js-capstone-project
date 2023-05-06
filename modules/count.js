import { apiUrl } from './endpoint.js';

export const getAllRecipe = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res;
};

export const countItem = async () => {
  const data = await getAllRecipe(apiUrl);
  return data.length;
};
