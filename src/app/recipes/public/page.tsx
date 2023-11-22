import {api} from "~/trpc/server";
import {Input, Link} from "@nextui-org/react";
import RecipeCard from "~/app/_components/RecipeCard";

export default async function RecipesPublic() {
    const featuredRecipes = await api.recipe.getAll.query() //TODO: implement proper search query
    return (
        <main className="flex flex-col items-center">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {featuredRecipes ? (
                    featuredRecipes.map((recipe) => (
                        <RecipeCard recipeId={recipe.id} key={recipe.id} />
                    ))
                ) : (
                    <h2>No recipes found...</h2>
                )}
            </div>
        </main>
    );
}

