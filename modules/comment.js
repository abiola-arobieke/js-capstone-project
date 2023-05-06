export const addComment = async (url, userData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: userData,
  });
  const res = await response;
  if (res.status === 201) {
    return true;
  }
  return false;
};

export const getComment = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();

  if (response.status === 400) {
    return [];
  }
  return res;
};
