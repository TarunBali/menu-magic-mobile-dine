
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Calendar, MapPin } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrderById } from '@/services/api';
import { Order } from '@/types/order';
import { menuItems } from '@/data/menuData';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          throw new Error('Order ID is missing');
        }

        const orderData = await getOrderById(orderId);
        if (!orderData) {
          throw new Error('Order not found');
        }

        // Enhance order items with full menu item details
        const enhancedOrder = {
          ...orderData,
          items: orderData.items.map(item => {
            const menuItem = menuItems.find(mi => mi.id === item.item.id);
            return {
              ...item,
              item: menuItem || item.item
            };
          })
        };

        setOrder(enhancedOrder);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <CustomerLayout>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-64 mb-8" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </CustomerLayout>
    );
  }

  if (error || !order) {
    return (
      <CustomerLayout>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error || 'Unable to load order details'}</p>
            <Link to="/order-history">
              <Button>View All Orders</Button>
            </Link>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">Thank you for your order. Your order has been received.</p>
              <div className="bg-gray-100 px-4 py-2 rounded-full mt-4">
                <p className="font-medium">Order ID: {order.id.substring(0, 8).toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 border rounded-md">
                <Calendar className="h-6 w-6 text-gray-500 mb-2" />
                <h3 className="text-sm text-gray-500">Order Date</h3>
                <p className="font-medium">{formattedDate}</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-md">
                <Clock className="h-6 w-6 text-gray-500 mb-2" />
                <h3 className="text-sm text-gray-500">Order Time</h3>
                <p className="font-medium">{formattedTime}</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-md">
                <MapPin className="h-6 w-6 text-gray-500 mb-2" />
                <h3 className="text-sm text-gray-500">Pickup Location</h3>
                <p className="font-medium">FoodieSpot Restaurant</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.item.image}
                          alt={item.item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{item.item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{order.totalAmount - 40}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>₹40</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span>{
                  order.paymentMethod === 'CASH' ? 'Cash on Delivery' :
                  order.paymentMethod === 'UPI' ? 'UPI Payment' :
                  'Credit/Debit Card'
                }</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <Link to="/menu">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link to="/order-history">
              <Button className="bg-restaurant-primary hover:bg-restaurant-secondary">View Order History</Button>
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderConfirmationPage;
