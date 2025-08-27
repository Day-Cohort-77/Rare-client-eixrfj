export const DeleteCategoryById = (categoryId) => {
  return fetch(`http://localhost:5000/categories/${categoryId}`, {
    method: "DELETE",
  });
};

export const UpdateCategoryLabel = (categoryId, updatedCategory) => {
  return fetch(`http://localhost:5000/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(updatedCategory),
  }).then((res) => res.json());
};
