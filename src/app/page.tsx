'use client';

import { PetCard } from '@/components/PetCard';
import { usePetStore } from '@/store/usePetStore';
import {TypewriterEffectSmoothDemo1}from '@/components/Header/TypewriterEffectSmoothDemo1';
import { TextHoverEffectDemo } from '@/components/Header/TextHoverEffectDemo';
import Footer from '@/components/Footer/Footer';
export default function Home() {
  const pets = usePetStore(state => state.pets);
  

  return (
    <div>
    <div className="space-y-8 ">
      <header className="text-center ">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  gap-16 font-[family-name:var(--font-geist-sans)]">
    <div className="text-4xl font-bold h-[2rem] text-gray-900 ">

        <TypewriterEffectSmoothDemo1/> 
        </div>
        <TextHoverEffectDemo />
      </div>
        <p className="text-lg text-gray-600">
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
    <div className='w-full'>

      <Footer/>
    </div>
    </div>
  );
}