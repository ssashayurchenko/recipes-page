import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_CUISINES_API_KEY;

async function fetchRecipeDetails(id) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipe details");
  }

  return res.json();
}

export default async function RecipeDetailsPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  let recipe;

  try {
    recipe = await fetchRecipeDetails(id);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-amber-700 text-lg font-semibold text-center">
          Error loading recipe details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full rounded-3xl shadow-2xl text-amber-900 p-6 md:p-10 max-h-[90vh] overflow-auto">
        <p className="text-lg md:text-2xl font-semibold mb-10 text-center break-words px-4">
          {recipe.title}
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-10 px-4">
          <div className="flex-shrink-0 mx-auto md:mx-0 p-4rounded-xl shadow-sm">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={300}
              height={220}
              className="rounded-2xl shadow-md object-cover"
            />
          </div>

          <div className="max-w-md flex flex-col justify-center space-y-6 p-4">
            <p className="text-lg font-semibold text-center">Ingredients</p>
            <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed break-words max-h-[300px] overflow-auto text-left">
              {recipe.extendedIngredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="hover:text-amber-700 transition-colors duration-200"
                >
                  {ingredient.original}
                </li>
              ))}
            </ul>

            <div className="text-lg space-y-2 font-medium text-amber-800 text-left">
              <p>
                <span className="font-semibold">Preparation time:</span>{" "}
                {recipe.readyInMinutes} minutes
              </p>
              <p>
                <span className="font-semibold">Servings:</span>{" "}
                {recipe.servings}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
