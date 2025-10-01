import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useCartStore } from "@/lib/cartStore";
import type { User } from "@supabase/supabase-js";

const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={getTotalItems()} isAuthenticated={!!user} />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-8 mt-20">
        <div className="container px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
