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
      <p className="text-red-600 text-center mt-8 text-lg font-semibold">
        Error loading recipe details.
      </p>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl shadow-xl"
      style={{ backgroundColor: "#FFF9DB", color: "#5C3A00" }}
    >
      <h1 className="text-5xl font-extrabold mb-6" style={{ color: "#D97706" }}>
        {recipe.title}
      </h1>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={600}
        height={400}
        className="rounded-3xl mb-8 shadow-md"
      />
      <h2
        className="text-3xl font-semibold mb-4 border-b-2 pb-2"
        style={{ borderColor: "#F59E0B" }}
      >
        Ingredients
      </h2>
      <ul
        className="list-disc pl-8 mb-8 space-y-2 text-lg"
        style={{ color: "#7C4A00" }}
      >
        {recipe.extendedIngredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="hover:text-yellow-600 transition-colors duration-200"
          >
            {ingredient.original}
          </li>
        ))}
      </ul>
      <div
        className="text-lg space-y-2 font-medium"
        style={{ color: "#5C3A00" }}
      >
        <p>
          <strong>Preparation time:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
      </div>
    </div>
  );
}
