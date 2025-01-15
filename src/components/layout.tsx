'use client'; 
import Link from 'next/link';
import { ShoppingCart, Heart, Home } from 'lucide-react';
import { usePetStore } from '@/store/usePetStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cartItems = usePetStore(state => state.cartItems);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">
                  Galactic Pets
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="nav-link">
                <Home className="h-6 w-6" />
              </Link>
              
              <Link href="/cart" className="nav-link relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              <Link href="/adopted" className="nav-link">
                <Heart className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}