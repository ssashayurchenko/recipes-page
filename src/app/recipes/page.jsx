import Link from "next/link";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_CUISINES_API_KEY;

async function fetchRecipes({ query, cuisine, maxReadyTime }) {
  const params = new URLSearchParams();

  if (query) params.append("query", query);
  if (cuisine) params.append("cuisine", cuisine);
  if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);
  params.append("apiKey", API_KEY);

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

export default async function RecipesPage({ searchParams }) {
  let recipesData;

  try {
    const params = await searchParams;
    recipesData = await fetchRecipes(params);
  } catch (error) {
    return (
      <p className="text-red-500 text-center mt-8 text-lg font-semibold">
        Error loading recipes.
      </p>
    );
  }

  if (!recipesData.results.length) {
    return (
      <p className="text-center mt-8 text-gray-600 text-lg italic">
        No recipes found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8" style={{ color: "#5C3A00" }}>
      <h1 className="text-4xl font-extrabold mb-8" style={{ color: "#D97706" }}>
        Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipesData.results.map((recipe, index) => (
          <Link
            key={`${recipe.id}-${index}`}
            href={`/recipes/${recipe.id}`}
            className="block border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
            style={{ borderColor: "#FCD34D", backgroundColor: "#FFF9DB" }}
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={300}
              height={200}
              className="object-cover w-full h-48 transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <h2
              className="text-xl font-semibold p-4"
              style={{ backgroundColor: "#FFFBEB", color: "#92400E" }}
            >
              {recipe.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
