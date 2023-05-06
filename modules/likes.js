export const addLike = async (url, itemObj) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: itemObj,
  });
  const res = await response;
  if (res.status === 201) {
    return true;
  }
  return false;
};

export const getLikes = async (url, id) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();

  // Find number of likes for item_id
  const itemLikes = res.find((item) => item.item_id === id);
  return itemLikes ? itemLikes.likes : 0;
};

export const getAllLikes = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res;
};
