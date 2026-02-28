"use client";

import { useState } from "react";
import CategoryForm from "@/components/forms/CategoryForm";
import  CategoryTable from "@/components/tables/CategoryTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Accessories" },
  ]);

  const addCategory = (name: string) => {
    const newCategory = { id: categories.length + 1, name };
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">
          Manage your product categories
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm onAddCategory={addCategory} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryTable categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
