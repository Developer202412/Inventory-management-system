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

type Props = { products: Product[]; };

export default function StockChart({ products }: Props) {
  const data = products.map(p => ({ name: p.name, stock: p.stock }));

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Stock Levels</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}