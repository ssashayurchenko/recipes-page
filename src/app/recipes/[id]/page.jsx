import React, { Suspense } from "react";
import RecipeDetails from "@/components/recipe-details/RecipeDetails";

export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center px-4">
            <p className="text-amber-700 text-lg font-semibold text-center">
              Loading recipe details...
            </p>
          </div>
        }
      >
        <RecipeDetails id={id} />
      </Suspense>
    </div>
  );
}
