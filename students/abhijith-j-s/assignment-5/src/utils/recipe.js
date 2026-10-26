// Pull the numbered strIngredient1..20 / strMeasure1..20 fields into one clean list.
export function getIngredients(meal) {
  if (!meal) return [];
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = (meal[`strIngredient${i}`] || "").trim();
    const measure = (meal[`strMeasure${i}`] || "").trim();
    if (name) list.push({ name, measure });
  }
  return list;
}

// Keep only what a card needs, so favourites can render without another API call.
export function toSummary(meal) {
  return {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory || "",
    strArea: meal.strArea || "",
  };
}
