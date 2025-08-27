export const DeleteCategoryById = (categoryId) => {
  return fetch(`http://localhost:5000/categories/${categoryId}`, {
    method: "DELETE",
  });
};
