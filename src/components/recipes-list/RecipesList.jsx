"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecipesList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-600 italic text-lg text-center">
          No recipes found.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
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
  );
}
