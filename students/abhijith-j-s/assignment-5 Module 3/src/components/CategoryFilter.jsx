import { CATEGORIES } from "../config.js";

const OPTIONS = ["All", ...CATEGORIES];

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="category-filters d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter products by category">
      {OPTIONS.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            className={`btn btn-sm category-filter${isActive ? " active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onChange(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
