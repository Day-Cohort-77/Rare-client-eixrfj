export const createCategory = (c) => {
  return fetch("http://localhost:5000/Categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(c),
  }).then((res) => res.json());
};
