"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SupplierFormProps = {
  onAddSupplier: (supplier: { name: string; phone: string; email: string; address: string }) => void;
};

export default function SupplierForm({ onAddSupplier }: SupplierFormProps) {
  const [supplier, setSupplier] = useState({ name: "", phone: "", email: "", address: "" });

  const handleSubmit = () => {
    if (!supplier.name || !supplier.phone) return;
    onAddSupplier(supplier);
    setSupplier({ name: "", phone: "", email: "", address: "" });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <Input
        placeholder="Name"
        value={supplier.name}
        onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
      />
      <Input
        placeholder="Phone"
        value={supplier.phone}
        onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={supplier.email}
        onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
      />
      <Input
        placeholder="Address"
        value={supplier.address}
        onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
      />
      <Button className="mt-2" onClick={handleSubmit}>
        Add Supplier
      </Button>
    </div>
  );
}
