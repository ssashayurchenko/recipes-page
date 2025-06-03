const API_KEY = process.env.NEXT_PUBLIC_CUISINES_API_KEY;

export async function fetchRecipes(params) {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append("query", params.query);
  if (params.cuisine) searchParams.append("cuisine", params.cuisine);
  if (params.maxReadyTime)
    searchParams.append("maxReadyTime", params.maxReadyTime);
  searchParams.append("apiKey", API_KEY);

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${searchParams.toString()}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch recipes");

  return res.json();
}
