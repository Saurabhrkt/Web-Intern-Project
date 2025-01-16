'use client';

import { PetCard } from '@/components/PetCard';
import { usePetStore } from '@/store/usePetStore';

export default function Home() {
  const pets = usePetStore(state => state.pets);
  

  return (
    <div className="space-y-8 ">
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Galactic Pet Adoption
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Find your perfect companion from across the galaxy
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            {...pet}
          />
        ))}
      </div>
    </div>
  );
}