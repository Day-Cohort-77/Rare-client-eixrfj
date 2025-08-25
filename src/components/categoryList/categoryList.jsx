import "./CategoryList.css";
import { useState, useEffect } from "react";
import { getCategories } from "../../managers/GeneralManager";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

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
    </section>
  );
};
