"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryFormProps {
  onAddCategory: (name: string) => void;
}

export default function CategoryForm({ onAddCategory }: CategoryFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
