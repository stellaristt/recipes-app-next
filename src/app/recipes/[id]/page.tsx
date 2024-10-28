import Image from "next/image";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChefHat, Clock, Star } from "lucide-react";
export default async function Recipe({ params }: { params: { id: string } }) {
  const data = await fetch(`https://dummyjson.com/recipes/${params.id}`);
  const recipe = await data.json();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-10 w-full dark:bg-dark-background dark:text-dark-foreground">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold py-6">{recipe.name}</h1>
        <div className="flex items-center space-x-4 my-4">
          <span className="flex items-center">
            <Clock className="w-5 h-5 mr-1" />
            {recipe.cookTimeMinutes} min
          </span>
          <span className="flex items-center">
            <Star name="star" className="w-5 h-5 mr-1" />
            {recipe.rating}
          </span>
          <span className="flex items-center">
            <ChefHat name="chef-hat" className="w-5 h-5 mr-1" />
            {recipe.difficulty}
          </span>
        </div>
        <Image src={recipe.image} alt={recipe.name} width={300} height={300} />
        <p className="mt-4">{recipe.description}</p>
        <h2 className="mt-8 text-2xl font-semibold">Ingredients:</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-2xl font-semibold">Instructions:</h2>
        <ul className="list-disc list-inside">
          {recipe.instructions.map((instruction: string, index: number) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </main>
    </SidebarProvider>
  );
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  //     <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
  //       <h1 className="text-3xl font-bold">{recipe.name}</h1>
  //
  //       <Button>Add to cart</Button>
  //
  //     </main>
  //   </div>
  // );
}
