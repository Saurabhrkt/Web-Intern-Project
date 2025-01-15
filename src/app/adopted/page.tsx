'use client';

import { usePetStore } from '@/store/usePetStore';
import { PetCard } from '@/components/PetCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdoptedPage() {
  const router = useRouter();
  const adoptedPets = usePetStore(state => state.adoptedPets);

  if (adoptedPets.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">No Adopted Pets Yet</h2>
        <p className="mt-4 text-gray-600">
          Start your journey of pet adoption today!
        </p>
        <Button 
          className="mt-6"
          onClick={() => router.push('/')}
        >
          Find a Pet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Your Adopted Pets</h1>
        <p className="mt-4 text-lg text-gray-600">
          Your wonderful galactic family
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {adoptedPets.map((pet) => (
          <PetCard
            key={pet.id}
            {...pet}
            showQuantityControls={false}
          />
        ))}
      </div>
    </div>
  );
}