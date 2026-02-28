"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SaleForm from "@/components/forms/SaleForm";
import SaleTable, { Sale } from "@/components/tables/SaleTable";
import SalesChart from "@/components/dashboard/SalesChart";

type Product = { id: number; name: string; price: number; stock: number };

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop HP", price: 850000, stock: 12 },
    { id: 2, name: "Mouse", price: 15000, stock: 50 },
    { id: 3, name: "Keyboard", price: 35000, stock: 25 },
  ]);

  const [sales, setSales] = useState<Sale[]>([
    { id: 1, productId: 1, quantity: 2, price: 850000, date: "2026-01-23" },
  ]);

  const addSale = (sale: Omit<Sale, "id">) => {
    const product = products.find((p) => p.id === sale.productId);
    if (!product) return;

    if (sale.quantity > product.stock) {
      alert("Not enough stock available");
      return;
    }

    setSales((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...sale },
    ]);

    setProducts((prev) =>
      prev.map((p) =>
        p.id === sale.productId ? { ...p, stock: p.stock - sale.quantity } : p
      )
    );
  };

  const deleteSale = (id: number) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  const totalSalesValue = useMemo(() => sales.reduce((sum, s) => sum + s.quantity * s.price, 0), [sales]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
        <p className="text-muted-foreground mt-1">Manage your sales and revenue</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{totalSalesValue.toLocaleString()} TZS</p></CardContent>
        </Card>

        <SalesChart sales={sales} products={products} />
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader><CardTitle>Add Sale</CardTitle></CardHeader>
        <CardContent><SaleForm products={products} onAddSale={addSale} /></CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader><CardTitle>Sales History</CardTitle></CardHeader>
        <CardContent>
          <SaleTable sales={sales} products={products} onDelete={deleteSale} onUpdate={setSales} />
        </CardContent>
      </Card>
    </div>
  );
}