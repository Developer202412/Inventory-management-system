"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Product = { id: number; name: string; categoryId: number; stock: number; price: number };
type Category = { id: number; name: string };

type ProductTableProps = {
  products: Product[];
  categories: Category[];
  onDelete?: (id: number) => void;
};

export default function ProductTable({ products, categories, onDelete }: ProductTableProps) {
  const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.name || "-";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price (TZS)</TableHead>
          <TableHead>Total Value (TZS)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.id}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{getCategoryName(p.categoryId)}</TableCell>
            <TableCell>{p.stock}</TableCell>
            <TableCell>{p.price.toLocaleString()}</TableCell>
            <TableCell>{(p.stock * p.price).toLocaleString()}</TableCell>
            <TableCell>
              {onDelete && <Button variant="destructive" size="sm" onClick={() => onDelete(p.id)}>Delete</Button>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}