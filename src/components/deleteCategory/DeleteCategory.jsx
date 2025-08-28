import { useState, useEffect } from "react";
import { getCategories } from "../../managers/GeneralManager";
import { DeleteCategoryById } from "../../managers/UpdateCategoryManager";
import { useNavigate } from "react-router-dom";
export const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <section>
      <label htmlFor="category-select">Select a category to delete:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Select a category --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          if (!selectedCategory) return;
          DeleteCategoryById(selectedCategory).then(() => {
            setSelectedCategory("");
            getCategories().then(setCategories);
          });
        }}
      >
        Delete Category
      </button>
      <button
        onClick={() => {
          navigate("/CategoryList");
        }}
      >
        Go Back
      </button>
    </section>
  );
};
