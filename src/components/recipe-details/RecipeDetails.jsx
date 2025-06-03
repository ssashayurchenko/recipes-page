"use client";

import React, { useEffect, useState } from "react";
import { fetchRecipeDetails } from "@/lib/fetchRecipeDetails";
import RecipesCard from "../recipes-card/RecipesCard";

export default function RecipeDetails({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchRecipeDetails(id)
      .then((data) => {
        if (isMounted) setRecipe(data);
      })
      .catch(() => {
        if (isMounted) setError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-amber-700 text-lg font-semibold text-center">
          Error loading recipe details.
        </p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-amber-700 text-lg font-semibold text-center">
          Loading recipe details...
        </p>
      </div>
    );
  }

  return <RecipesCard recipe={recipe} />;
}
