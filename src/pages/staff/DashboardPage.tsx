
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ShoppingBag, Clock, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import StaffLayout from '@/components/layout/StaffLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllOrders } from '@/services/api';
import { Order, OrderStatus } from '@/types/order';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const { staffUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderData = await getAllOrders();
        setOrders(orderData);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
    
    // Refresh orders every minute
    const intervalId = setInterval(fetchOrders, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Calculate dashboard metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => 
    order.status === 'PENDING' || order.status === 'CONFIRMED' || order.status === 'PREPARING'
  ).length;
  const completedOrders = orders.filter(order => order.status === 'COMPLETED').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Calculate orders by status for chart
  const ordersByStatus = {
    'PENDING': orders.filter(order => order.status === 'PENDING').length,
    'CONFIRMED': orders.filter(order => order.status === 'CONFIRMED').length,
    'PREPARING': orders.filter(order => order.status === 'PREPARING').length,
    'READY': orders.filter(order => order.status === 'READY').length,
    'COMPLETED': orders.filter(order => order.status === 'COMPLETED').length,
    'CANCELLED': orders.filter(order => order.status === 'CANCELLED').length,
  };
  
  // Prepare chart data
  const chartData = [
    { name: 'Pending', value: ordersByStatus.PENDING },
    { name: 'Confirmed', value: ordersByStatus.CONFIRMED },
    { name: 'Preparing', value: ordersByStatus.PREPARING },
    { name: 'Ready', value: ordersByStatus.READY },
    { name: 'Completed', value: ordersByStatus.COMPLETED },
    { name: 'Cancelled', value: ordersByStatus.CANCELLED },
  ];
  
  // Recent orders (last 5)
  const recentOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
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
  
  return (
    <StaffLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {staffUser?.username}!</p>
        
        {error && (
          <div className="bg-red-50 p-4 rounded-md text-red-800 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : totalOrders}</div>
              <p className="text-xs text-gray-500">All orders placed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : pendingOrders}</div>
              <p className="text-xs text-gray-500">Awaiting processing</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : completedOrders}</div>
              <p className="text-xs text-gray-500">Successfully delivered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{loading ? '...' : totalRevenue}</div>
              <p className="text-xs text-gray-500">All time earnings</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders by Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Orders by Status</CardTitle>
              <CardDescription>Distribution of orders by their current status</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {!loading && (
                <ChartContainer config={{}} className="w-full h-full">
                  <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest 5 orders received</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8 text-gray-500">Loading orders...</p>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></div>
                        <div>
                          <p className="font-medium">Order #{order.id.substring(0, 8).toUpperCase()}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.totalAmount}</p>
                        <p className="text-xs text-gray-500">{order.customerName}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center mt-4">
                    <Link to="/staff/orders">
                      <button className="text-restaurant-primary text-sm hover:underline">
                        View all orders →
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">No orders found</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </StaffLayout>
  );
};

export default DashboardPage;
