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
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-amber-700 text-lg font-semibold text-center">
          Error loading recipes.
        </p>
      </div>
    );
  }

  if (!recipesData.results.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-600 italic text-lg text-center">
          No recipes found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full max-h-[90vh] p-6 md:p-10 my-8">
        <p className="text-4xl font-extrabold text-amber-900 mb-16 text-centertext-amber-900 ">
          Recipes
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipesData.results.map((recipe, index) => (
            <Link
              key={`${recipe.id}-${index}`}
              href={`/recipes/${recipe.id}`}
              className="group border rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-4 flex flex-col items-center">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={250}
                  height={180}
                  className="rounded-2xl shadow-md object-cover mb-4"
                />
                <p className="text-lg font-bold text-amber-900 group-hover:text-yellow-600 transition-colors duration-300 break-words text-center">
                  {recipe.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
