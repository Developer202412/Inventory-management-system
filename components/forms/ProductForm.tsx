"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Category = { id: number; name: string };
type ProductFormProps = {
  categories: Category[];
  onAddProduct: (product: { name: string; categoryId: number; stock: number; price: number }) => void;
};

export default function ProductForm({ categories, onAddProduct }: ProductFormProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || categoryId === "") return;
    onAddProduct({ name, categoryId: Number(categoryId), stock, price });
    setName("");
    setCategoryId("");
    setStock(0);
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Select value={categoryId.toString()} onValueChange={(val) => setCategoryId(Number(val))} required>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
      <Input type="number" placeholder="Price (TZS)" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
      <Button type="submit" className="col-span-full mt-2">Add Product</Button>
    </form>
  );
}