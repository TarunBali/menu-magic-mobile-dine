
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Search, Filter, Eye } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrdersByCustomer } from '@/services/api';
import { Order, OrderStatus } from '@/types/order';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.phone) {
          throw new Error('User information is missing');
        }

        const orderData = await getOrdersByCustomer(user.phone);
        setOrders(orderData);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load order history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CONFIRMED':
        return 'bg-blue-500';
      case 'PREPARING':
        return 'bg-orange-500';
      case 'READY':
        return 'bg-purple-500';
      case 'COMPLETED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    // Apply search filter on order ID
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <CustomerLayout>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Order History</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>

        {error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800 mb-6">
            {error}
          </div>
        ) : null}

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY">Ready</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center pb-3">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.id.substring(0, 8).toUpperCase()}
                    </CardTitle>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDate(order.createdAt)} at {formatTime(order.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)} mr-2`}></div>
                      <span className="text-sm font-medium">
                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
                      <span>Total Items:</span>
                      <span className="font-medium">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                      <span className="mx-2">•</span>
                      <span>Total:</span>
                      <span className="font-medium">₹{order.totalAmount}</span>
                      <span className="mx-2">•</span>
                      <span>Payment:</span>
                      <span className="font-medium">
                        {order.paymentMethod === 'CASH' ? 'Cash' : 
                         order.paymentMethod === 'UPI' ? 'UPI' : 'Card'}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {order.tableNumber ? (
                        <span>Table #{order.tableNumber}</span>
                      ) : (
                        <span>Takeaway Order</span>
                      )}
                    </div>
                    <Link to={`/order-confirmation/${order.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              {searchTerm || statusFilter ? (
                <>
                  <h3 className="text-lg font-semibold mb-2">No matching orders found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2">No order history found</h3>
                  <p className="text-gray-600 mb-6">You haven't placed any orders with us yet.</p>
                  <Link to="/menu">
                    <Button className="bg-restaurant-primary hover:bg-restaurant-secondary">
                      Browse Our Menu
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
};

export default OrderHistoryPage;
