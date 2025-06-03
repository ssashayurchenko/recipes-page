import React from 'react';
import RecipesList from '@/components/recipes-list/RecipesList';
import { fetchRecipes } from '@/lib/fetchRecipes';

export default async function RecipesPage({ searchParams }) {
  const params = await searchParams;
  const { query, cuisine, maxReadyTime } = params;

  let recipesData;
  try {
    recipesData = await fetchRecipes({ query, cuisine, maxReadyTime });
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-amber-700 text-lg font-semibold text-center">
          Error loading recipes.
        </p>
      </div>
    );
  }

  if (!recipesData.results || recipesData.results.length === 0) {
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
        <p className="text-4xl font-extrabold text-amber-900 mb-16 text-center">
          Recipes
        </p>
        <RecipesList recipes={recipesData.results} />
      </div>
    </div>
  );
}
