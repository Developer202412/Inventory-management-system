import { useState, useMemo } from "react";

export type Sale = {
  id: number;
  productId: number;
  quantity: number;
  price: number; // unit price
  date: string;
};

export function useSales(initialSales: Sale[] = []) {
  const [sales, setSales] = useState<Sale[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sales");
      return stored ? JSON.parse(stored) : initialSales;
    }
    return initialSales;
  });

  const addSale = (sale: Omit<Sale, "id">) => {
    setSales((prev) => {
      const newSale = {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        ...sale,
      };
      const updated = [...prev, newSale];
      if (typeof window !== "undefined") {
        localStorage.setItem("sales", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const updateSale = (id: number, key: keyof Sale, value: string | number) => {
    setSales((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, [key]: value } : s));
      if (typeof window !== "undefined") {
        localStorage.setItem("sales", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const deleteSale = (id: number) => {
    setSales((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("sales", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const totalSalesValue = useMemo(() => {
    return sales.reduce((sum, s) => sum + s.quantity * s.price, 0);
  }, [sales]);

  return { sales, addSale, updateSale, deleteSale, totalSalesValue, setSales };
}