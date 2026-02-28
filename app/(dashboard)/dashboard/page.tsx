"use client";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import StockChart from "@/components/dashboard/StockChart";
import InventoryTable from "@/components/dashboard/InventoryTable";

type Product = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

type Sale = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  date: string;
};

export default function DashboardPage() {
  // Products data
  const products: Product[] = [
    { id: 1, name: "Laptop HP", stock: 12, price: 850000 },
    { id: 2, name: "Mouse", stock: 50, price: 15000 },
    { id: 3, name: "Keyboard", stock: 25, price: 35000 },
    { id: 4, name: "Monitor", stock: 8, price: 250000 },
    { id: 5, name: "USB Cable", stock: 100, price: 5000 },
  ];

  // Sales data
  const sales: Sale[] = [
    { id: 1, productId: 1, quantity: 2, price: 850000, date: "2026-01-23" },
    { id: 2, productId: 2, quantity: 5, price: 15000, date: "2026-01-22" },
    { id: 3, productId: 3, quantity: 3, price: 35000, date: "2026-01-21" },
    { id: 4, productId: 1, quantity: 1, price: 850000, date: "2026-01-20" },
  ];

  //  Calculated metrics
  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your inventory & sales performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard title="In Stock" value={inStock} />
        <StatCard title="Low Stock" value={lowStock} />
        <StatCard title="Out of Stock" value={outOfStock} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesChart sales={sales} products={products} />
        <StockChart products={products} />
      </div>

      {/* Inventory Table */}
      <InventoryTable products={products} />
    </div>
  );
}