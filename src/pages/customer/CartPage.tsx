
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { isCustomerAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isCustomerAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const deliveryFee = subtotal > 0 ? 40 : 0; // Free delivery for orders above a certain amount
  const total = subtotal + deliveryFee;

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  {items.map((cartItem) => (
                    <div key={cartItem.item.id} className="flex flex-col sm:flex-row items-center gap-4 py-4">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img 
                          src={cartItem.item.image} 
                          alt={cartItem.item.name} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium">{cartItem.item.name}</h3>
                        <p className="text-gray-600 text-sm">{cartItem.item.description}</p>
                        <p className="font-semibold text-restaurant-primary mt-1">₹{cartItem.item.price}</p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-3 w-6 text-center">{cartItem.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(cartItem.item.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => clearCart()}
                    className="text-gray-600"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
                  onClick={handleCheckout}
                >
                  {isCustomerAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>

                <div className="mt-4">
                  <Link to="/menu" className="text-restaurant-primary hover:underline flex items-center justify-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/menu">
              <Button className="bg-restaurant-primary hover:bg-restaurant-secondary">
                Browse Menu
              </Button>
            </Link>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CartPage;
