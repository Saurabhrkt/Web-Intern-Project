import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { usePetStore } from '@/store/usePetStore';

interface PetCardProps {
  id: string;
  name: string;
  planet: string;
  image: string;
  price: number;
  showQuantityControls?: boolean;
  initialQuantity?: number;
}

export function PetCard({
  id,
  name,
  planet,
  image,
  price,
  showQuantityControls = true,
  initialQuantity = 0,
}: PetCardProps) {
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const { addToCart, updateCartQuantity } = usePetStore();

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    if (showQuantityControls) {
      updateCartQuantity(id, newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ id, name, planet, image, price }, quantity);
      setQuantity(0);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            unoptimized // Add this for external images
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">From {planet}</p>
        <p className="text-lg font-bold mt-2">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {showQuantityControls && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(Math.max(0, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="w-full"
              onClick={handleAddToCart}
              disabled={quantity === 0}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}