import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { UpdateCategoryLabel } from "../../managers/UpdateCategoryManager";

export const EditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, label } = location.state || {};

  const [newLabel, setNewLabel] = useState(label || "");

  return (
    <section>
      <div>Edit Category</div>
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
        placeholder="Edit category label"
      />
      <button
        onClick={() => {
          if (!categoryId) return;
          UpdateCategoryLabel(categoryId, { label: newLabel }).then(() => {
            navigate("/CategoryList");
          });
        }}
      >
        Save
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
