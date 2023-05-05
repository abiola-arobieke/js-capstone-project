import { commentUrl } from './endpoint';

const getCommenturl = `${commentUrl}?item_id=`;
const id = 1;

export const getComment = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res;
};

export const countComment = async () => {
  const commentCount = await getComment(`${getCommenturl}${id}`);
  return commentCount.length;
};