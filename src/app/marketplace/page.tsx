"use client";

import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MarketplaceContent } from "@/components/sections/MarketplaceContent";

export default function MarketplacePage() {
  return (
    <CartProvider>
      <ProtectedRoute>
        <MarketplaceContent />
      </ProtectedRoute>
    </CartProvider>
  );
}
