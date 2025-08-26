import { useState } from "react";
import { createNewCategoryService } from "../../managers/CreateNewCategoryManager";
import { useNavigate } from "react-router-dom";

export const CreateCategory = () => {
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();
  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newCategory) return;
          createNewCategoryService({ label: newCategory }).then(() => {
            setNewCategory("");
            navigate("/CategoryList");
          });
        }}
      >
        <div>Create a Category:</div>
        <input
          className="category-name"
          type="text"
          placeholder="Enter Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      <button
        type="button"
        onClick={() => navigate("/CategoryList")}
        style={{ marginTop: "1em" }}
      >
        Go Back
      </button>
    </section>
  );
};
