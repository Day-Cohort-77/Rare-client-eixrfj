import "categoryList.css";
import { useState, useEffect } from "react";
import { createCategory } from "../../managers/CreateNewCategoryManager";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = () => {
    fetch("http://localhost:5000/Categories")
      .then((res) => res.json())
      .then(setCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section>
      <div>Categories:</div>
      <table>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <div>Create a Category:</div>
        <input
          className="category-name"
          type="text"
          placeholder="Enter Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          createCategory({ label: newCategory }).then(() => {
            setNewCategory("");
            fetchCategories();
          });
        }}
      >
        Create
      </button>
    </section>
  );
};
