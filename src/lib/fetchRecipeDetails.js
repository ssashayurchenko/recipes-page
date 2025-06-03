const API_KEY = process.env.NEXT_PUBLIC_CUISINES_API_KEY;

export async function fetchRecipeDetails(id) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch recipe details");

  return res.json();
}
