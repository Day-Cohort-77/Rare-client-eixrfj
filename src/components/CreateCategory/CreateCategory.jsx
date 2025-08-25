import { useState } from "react";
import { createNewCategoryService } from "../../managers/CreateNewCategoryManager";

export const CreateCategory = () => {
  const [newCategory, setNewCategory] = useState("");

  return (
    <section>
      {" "}
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
          createNewCategoryService({ label: newCategory }).then(() => {
            setNewCategory("");
          });
        }}
      >
        Create
      </button>
    </section>
  );
};
