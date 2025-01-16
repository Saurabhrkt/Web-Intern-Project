// app/payment/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePetContext } from '@/context/PetContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/Label';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentPage() {
    const router = useRouter();
    const { cart, adoptPets } = usePetContext();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const cartItems = Object.values(cart);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        email: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.cardName.trim()) {
            newErrors.cardName = 'Cardholder name is required';
        }

        if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Invalid card number';
        }

        if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/([2-9]\d)$/)) {
            newErrors.expiry = 'Invalid expiry date (MM/YY)';
        }

        if (!formData.cvv.match(/^\d{3,4}$/)) {
            newErrors.cvv = 'Invalid CVV';
        }

        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Invalid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setIsSuccess(true);
        adoptPets(); // Clear cart and move items to adopted

        // Redirect to success page after a delay
        setTimeout(() => {
            router.push('/adopted');
        }, 2000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value
                .replace(/\s/g, '')
                .match(/.{1,4}/g)
                ?.join(' ') || '';
        }

        // Format expiry date
        if (name === 'expiry') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2');
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (cartItems.length === 0) {
        router.push('/cart');
        return null;
    }

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Card className="w-full max-w-md text-center p-6">
                    <CardContent className="space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-green-700">Payment Successful!</h2>
                        <p className="text-gray-600">Your galactic pets are ready for adoption.</p>
                        <p className="text-sm text-gray-500">Redirecting to your adopted pets...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Adoption</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Summary */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Order Summary</h3>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="pt-4 border-t">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cardName">Cardholder Name</Label>
                                <Input
                                    id="cardName"
                                    name="cardName"
                                    placeholder="John Doe"
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                />
                                {errors.cardName && (
                                    <p className="text-sm text-red-500">{errors.cardName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.cardNumber && (
                                    <p className="text-sm text-red-500">{errors.cardNumber}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input
                                        id="expiry"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        value={formData.expiry}
                                        onChange={handleInputChange}
                                    />
                                    {errors.expiry && (
                                        <p className="text-sm text-red-500">{errors.expiry}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input
                                        id="cvv"
                                        name="cvv"
                                        type="text"
                                        placeholder="123"
                                        maxLength={4}
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                    />
                                    {errors.cvv && (
                                        <p className="text-sm text-red-500">{errors.cvv}</p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}