import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Pet {
  id: string;
  name: string;
  planet: string;
  image: string;
  price: number;
}

interface CartItem extends Pet {
  quantity: number;
}

interface PetStore {
  pets: Pet[];
  cartItems: CartItem[];
  adoptedPets: Pet[];
  
  addToCart: (pet: Pet, quantity: number) => void;
  removeFromCart: (petId: string) => void;
  updateCartQuantity: (petId: string, quantity: number) => void;
  adoptPets: () => void;
  
  getCartTotal: () => number;
}

const samplePets: Pet[] = [
  {
    id: '1',
    name: 'Zorblax',
    planet: 'Neptune',
    image: 'https://picsum.photos/seed/zorblax/400/300',
    price: 299.99
  },
  {
    id: '2',
    name: 'Fluffy Nebula',
    planet: 'Venus',
    image: 'https://picsum.photos/seed/nebula/400/300',
    price: 199.99
  },
  {
    id: '3',
    name: 'Quantum Whiskers',
    planet: 'Mars',
    image: 'https://picsum.photos/seed/quantum/400/300',
    price: 399.99
  },
  {
    id: '4',
    name: 'Stellar Paws',
    planet: 'Jupiter',
    image: 'https://picsum.photos/seed/stellar/400/300',
    price: 249.99
  },
  {
    id: '5',
    name: 'Cosmic Cuddles',
    planet: 'Saturn',
    image: 'https://picsum.photos/seed/cosmic/400/300',
    price: 349.99
  },
  {
    id: '6',
    name: 'Nova Nuzzles',
    planet: 'Mercury',
    image: 'https://picsum.photos/seed/nova/400/300',
    price: 279.99
  }
];

// Helper function to generate unique IDs
const generateUniqueId = () => {
  return 'adopted-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pets: samplePets,
      cartItems: [],
      adoptedPets: [],

      addToCart: (pet, quantity) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === pet.id);
        
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === pet.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          cartItems: [...state.cartItems, { ...pet, quantity }]
        };
      }),

      removeFromCart: (petId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== petId)
      })),

      updateCartQuantity: (petId, quantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === petId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      })),

      adoptPets: () => set((state) => ({
        // Generate new IDs for adopted pets
        adoptedPets: [
          ...state.adoptedPets,
          ...state.cartItems.map(item => ({
            ...item,
            id: generateUniqueId(),
          }))
        ],
        cartItems: []
      })),

      getCartTotal: () => {
        const state = get();
        return state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    }),
    {
      name: 'pet-store-storage'
    }
  )
);