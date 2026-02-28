"use client";

import { useState } from "react";

type Product = { id: number; name: string; price: number; stock: number };
type SaleFormProps = {
  products: Product[];
  onAddSale: (sale: { productId: number; quantity: number; price: number; date: string }) => void;
};

export default function SaleForm({ products, onAddSale }: SaleFormProps) {
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !quantity || !price || !date) return;
    onAddSale({ productId: Number(productId), quantity, price, date });
    setProductId("");
    setQuantity(1);
    setPrice(0);
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <select
        value={productId}
        onChange={(e) => {
          const selectedId = Number(e.target.value);
          setProductId(selectedId);
          const product = products.find((p) => p.id === selectedId);
          setPrice(product?.price || 0);
        }}
        required
        className="border rounded p-2"
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        className="border rounded p-2"
      />

      <input
        type="number"
        placeholder="Price (TZS)"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
        className="border rounded p-2"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border rounded p-2"
      />

      <button type="submit" className="col-span-full bg-blue-500 text-white p-2 rounded mt-2">
        Add Sale
      </button>
    </form>
  );
}