"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Product = { id: number; name: string; stock: number; price: number; };
type Sale = { id: number; productId: number; quantity: number; price: number; date: string; };

type Props = {
  sales: Sale[];
  products: Product[];
};

export default function SalesChart({ sales, products }: Props) {
  // Aggregate sales per product
  const data = products.map(product => {
    const totalQuantity = sales
      .filter(s => s.productId === product.id)
      .reduce((sum, s) => sum + s.quantity, 0);
    return { name: product.name, value: totalQuantity };
  });

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Sales per Product</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}