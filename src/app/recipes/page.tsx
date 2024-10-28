/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Recipe() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetch(
        `https://dummyjson.com/recipes?limit=12&skip=${(page - 1) * 10}`
      );
      const result = await data.json();
      setRecipes(result.recipes);
      setFilteredRecipes(result.recipes);
      setTotalPages(Math.ceil(result.total / 10));
    };
    fetchRecipes();
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery, recipes]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-10 dark:bg-dark-background dark:text-dark-foreground">
        <SidebarTrigger />
        <h1 className="text-3xl font-bold py-6">Recipes</h1>
          <Input
            type="text"
            placeholder="Search recipes"
            className="w-full mb-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredRecipes.map((recipe: any) => (
              <Card
                key={recipe.id}
                className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  width="300"
                  height="200"
                  className="w-full h-[200px] object-cover"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
                <CardContent className="p-6 bg-background">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{recipe.name}</h3>
                  </div>
                  <Link href={`/recipes/${recipe.id}`}>
                    <Button className="mt-4">View Recipe</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="mx-4">{`Page ${page} of ${totalPages}`}</span>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
      </main>
    </SidebarProvider>
  );
}
