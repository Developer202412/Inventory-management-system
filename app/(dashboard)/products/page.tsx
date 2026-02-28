"use client";

import { useProducts } from "@/hooks/useProduct";
import ProductForm from "@/components/forms/ProductForm";
import ProductTable from "@/components/tables/ProductTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Category = { id: number; name: string };

export default function ProductsPage() {
  const categories: Category[] = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Accessories" },
  ];

  const { products, addProduct, deleteProduct } = useProducts([
    { id: 1, name: "Laptop HP", categoryId: 1, stock: 12, price: 850000 },
    { id: 2, name: "Mouse", categoryId: 2, stock: 50, price: 15000 },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground mt-1">Manage your products</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Add Product</CardTitle></CardHeader>
        <CardContent><ProductForm categories={categories} onAddProduct={addProduct} /></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Product List</CardTitle></CardHeader>
        <CardContent><ProductTable products={products} categories={categories} onDelete={deleteProduct} /></CardContent>
      </Card>
    </div>
  );
}
