
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Banknote, Info } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  createOrder,
  processPayment 
} from '@/services/api';
import { PaymentMethod } from '@/types/order';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');

  const deliveryFee = 40; // Could be dynamic based on order size, location, etc.
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = async () => {
    if (!customerName) {
      // Show error
      return;
    }

    setIsLoading(true);
    try {
      // Update user profile with name if needed
      if (!user?.name && customerName) {
        updateUserProfile(customerName);
      }
      
      // Create order in database
      const orderItems = items.map(item => ({
        itemId: item.item.id,
        quantity: item.quantity
      }));

      const orderId = await createOrder(
        customerName,
        user?.phone || '',
        orderItems,
        total,
        paymentMethod,
        tableNumber || undefined,
        specialInstructions || undefined
      );
      
      // Process payment based on selected method
      const paymentResult = await processPayment(orderId, total, paymentMethod);
      
      if (paymentResult.success) {
        // Clear cart
        clearCart();
        
        // Redirect to confirmation page
        navigate(`/order-confirmation/${orderId}`);
      }
    } catch (error) {
      console.error('Failed to place order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            {/* Customer Information */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      value={customerName} 
                      onChange={(e) => setCustomerName(e.target.value)} 
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={user?.phone || ''} 
                      disabled={true}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Options */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Order Options</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="tableNumber">Table Number (optional)</Label>
                    <Input 
                      id="tableNumber" 
                      type="text" 
                      value={tableNumber} 
                      onChange={(e) => setTableNumber(e.target.value)} 
                      placeholder="e.g., T12"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions (optional)</Label>
                    <Textarea 
                      id="specialInstructions" 
                      value={specialInstructions} 
                      onChange={(e) => setSpecialInstructions(e.target.value)} 
                      placeholder="Any dietary requirements or preferences?"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <RadioGroup defaultValue="CASH" onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem value="CASH" id="cash" className="mt-1" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Cash</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">Pay when your order is delivered</p>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem value="UPI" id="upi" className="mt-1" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <QrCode className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">UPI / QR Code</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">Pay using UPI apps like Google Pay, PhonePe, Paytm</p>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="CARD" id="card" className="mt-1" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">Pay securely using your card</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.item.id} className="flex justify-between">
                    <span className="text-gray-600">{item.quantity}x {item.item.name}</span>
                    <span>₹{item.item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-restaurant-primary hover:bg-restaurant-secondary"
                disabled={isLoading}
                onClick={handleSubmitOrder}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
              
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CheckoutPage;
