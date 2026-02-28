"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Supplier = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

type SupplierTableProps = {
  suppliers: Supplier[];
  onDelete?: (id: number) => void;
};

export default function SupplierTable({ suppliers, onDelete }: SupplierTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((s) => (
          <TableRow key={s.id}>
            <TableCell>{s.id}</TableCell>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.phone}</TableCell>
            <TableCell>{s.email}</TableCell>
            <TableCell>{s.address}</TableCell>
            <TableCell>
              {onDelete && (
                <Button variant="destructive" size="sm" onClick={() => onDelete(s.id)}>
                  Delete
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
