
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  // If there's an orderId in search params, redirect to order confirmation
  useEffect(() => {
    if (orderId) {
      navigate(`/order-confirmation/${orderId}`, { replace: true });
    }
  }, [orderId, navigate]);

  // If there's no orderId, show a generic success page
  return (
    <CustomerLayout>
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Your payment has been processed successfully. Thank you for your order!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/order-history')}
            >
              View Order History
            </Button>
            <Button 
              className="bg-restaurant-primary hover:bg-restaurant-secondary"
              onClick={() => navigate('/menu')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default PaymentSuccessPage;
