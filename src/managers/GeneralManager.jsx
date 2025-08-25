export const getCategories = () => {
  return fetch("http://localhost:5000/Categories").then((res) => res.json());
};
