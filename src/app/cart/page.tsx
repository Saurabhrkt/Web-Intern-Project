'use client';

import { usePetStore } from '@/store/usePetStore';
import { PetCard } from '@/components/PetCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, adoptPets } = usePetStore();

  const handleAdopt = () => {
    adoptPets();
    router.push('/adopted');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12 mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <p className="mt-4 text-gray-600">
          Explore our galactic pets and find your perfect companion!
        </p>
        <Button 
          className="mt-6"
          onClick={() => router.push('/')}
        >
          Browse Pets
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
        <p className="mt-4 text-lg text-gray-600">
          Review your selected companions
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((pet) => (
          <PetCard
            key={pet.id}
            {...pet}
            initialQuantity={pet.quantity}
            isCartPage = {true}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-lg">
              Total: <span className="font-bold">₹{Number(getCartTotal().toFixed(2)).toLocaleString('en-IN')}</span>
            </div>
            <Button
              size="lg"
              onClick={handleAdopt}
              disabled={cartItems.length === 0}
            >
            Adopt Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}