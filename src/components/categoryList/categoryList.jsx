import "./categoryList.css";
import { useState, useEffect } from "react";
import { getCategories } from "../../managers/GeneralManager";
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getCategories().then(setCategories);
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
      <button onClick={() => navigate("/CreateNewCategory")}>
        Create Category
      </button>
      <button onClick={() => navigate("/DeleteCategory")}>
        Delete Category
      </button>
    </section>
  );
};
