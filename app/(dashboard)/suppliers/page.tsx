"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SupplierForm from "@/components/forms/SupplierForm";
import SupplierTable from "@/components/tables/SupplierTable";

type Supplier = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "Tech Distributors Ltd", phone: "0650000000", email: "tech@suppliers.com", address: "Dar es Salaam" },
    { id: 2, name: "Accessory World", phone: "0651111111", email: "accessory@suppliers.com", address: "Dodoma" },
  ]);

  // Add supplier
  const addSupplier = (supplier: Omit<Supplier, "id">) => {
    const newSupplier = { id: suppliers.length ? suppliers[suppliers.length - 1].id + 1 : 1, ...supplier };
    setSuppliers([...suppliers, newSupplier]);
  };

  // Delete supplier
  const deleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
        <p className="text-muted-foreground mt-1">Manage your suppliers</p>
      </div>

      {/* Add Supplier Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierForm onAddSupplier={addSupplier} />
        </CardContent>
      </Card>

      {/* Supplier List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier List</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierTable suppliers={suppliers} onDelete={deleteSupplier} />
        </CardContent>
      </Card>
    </div>
  );
}
