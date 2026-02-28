"use client";

import { useState } from "react";

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  stock: number;
  price: number;
};

export default function useProducts(initialProducts: Product[] = []) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: products.length ? products[products.length - 1].id + 1 : 1 };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return { products, addProduct, updateProduct, deleteProduct };
}