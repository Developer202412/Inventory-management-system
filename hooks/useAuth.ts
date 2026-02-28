"use client";

import { useState, useEffect } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Run asynchronously to avoid cascading render warning
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setLoading(false);
    };

    // Schedule asynchronously
    const id = setTimeout(loadUser, 0);
    return () => clearTimeout(id);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, loading, login, logout };
}