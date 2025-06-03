"use client";

import Image from "next/image";

export default function RecipesCard({ recipe }) {
  return (
    <div className="max-w-5xl w-full rounded-3xl shadow-2xl text-amber-900 p-6 md:p-10 max-h-[90vh] overflow-auto">
      <p className="text-lg md:text-2xl font-semibold mb-10 text-center break-words px-4">
        {recipe.title}
      </p>

      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-10 px-4">
        <div className="flex justify-center items-center flex-shrink-0 p-4 rounded-xl shadow-sm md:mx-0">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={300}
            height={220}
            className="rounded-2xl shadow-md object-cover"
          />
        </div>

        <div className="max-w-md flex flex-col items-center md:items-start justify-center space-y-6 p-4 text-center md:text-left">
          <p className="text-lg font-semibold">Ingredients</p>
          <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed break-words max-h-[300px] overflow-auto text-center md:text-left">
            {recipe.extendedIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="hover:text-amber-700 transition-colors duration-200"
              >
                {ingredient.original}
              </li>
            ))}
          </ul>

          <div className="text-lg space-y-2 font-medium text-amber-800 text-center md:text-left">
            <p>
              <span className="font-semibold">Preparation time:</span>{" "}
              {recipe.readyInMinutes} minutes
            </p>
            <p>
              <span className="font-semibold">Servings:</span> {recipe.servings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
