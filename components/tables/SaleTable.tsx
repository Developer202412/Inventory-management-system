"use client";

import { useMemo, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Product = { id: number; name: string; price: number; stock: number };
export type Sale = { id: number; productId: number; quantity: number; price: number; date: string };

type SaleTableProps = {
  sales: Sale[];
  products: Product[];
  onDelete?: (id: number) => void;
  onUpdate: React.Dispatch<React.SetStateAction<Sale[]>>;
};

export default function SaleTable({ sales, products, onDelete, onUpdate }: SaleTableProps) {
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const getProductName = (id: number) => products.find((p) => p.id === id)?.name || "Unknown";

  const filteredSales = useMemo(() => {
    return sales.filter((s) => (!productFilter || s.productId === Number(productFilter)) &&
      (!dateFilter || s.date === dateFilter));
  }, [sales, productFilter, dateFilter]);

  const updateSale = (id: number, key: keyof Sale, value: number | string) => {
    onUpdate((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="border rounded p-2">
          <option value="">Filter by Product</option>
          {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="border rounded p-2" />

        <Button variant="outline" onClick={() => { setProductFilter(""); setDateFilter(""); }}>Reset</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSales.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{getProductName(s.productId)}</TableCell>
              <TableCell>
                <Input type="number" value={s.quantity} className="w-20"
                  onChange={(e) => updateSale(s.id, "quantity", Number(e.target.value))} />
              </TableCell>
              <TableCell>
                <Input type="number" value={s.price} className="w-28"
                  onChange={(e) => updateSale(s.id, "price", Number(e.target.value))} />
              </TableCell>
              <TableCell>{(s.quantity * s.price).toLocaleString()} TZS</TableCell>
              <TableCell>{s.date}</TableCell>
              <TableCell>
                {onDelete && <Button variant="destructive" size="sm" onClick={() => onDelete(s.id)}>Delete</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredSales.length === 0 && <p className="text-sm text-muted-foreground">No sales found for selected filters.</p>}
    </div>
  );
}