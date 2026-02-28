"use client";
import { useState } from "react";

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  stock: number;
  price: number;
};

export function useProducts(initial: Product[] = []) {
  const [products, setProducts] = useState<Product[]>(initial);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      ...product,
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id: number, key: keyof Product, value: number | string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
  };

  return { products, addProduct, deleteProduct, updateProduct };
}