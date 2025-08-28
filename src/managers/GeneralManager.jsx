export const getCategories = () => {
  return fetch("http://localhost:5000/Categories").then((res) => res.json());
};

export const getPostDetailsById = (postId) => {
  return fetch(`http://localhost:5000/posts/${postId}`).then((res) => res.json());
};
