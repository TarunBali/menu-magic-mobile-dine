
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Clock, Home, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface CustomerLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, hideNav = false }) => {
  const { isCustomerAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-restaurant-primary">FoodieSpot</span>
          </Link>

          <div className="flex items-center gap-4">
            {isCustomerAuthenticated ? (
              <>
                <Link to="/order-history">
                  <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Orders</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => logout()} className="hidden sm:block">
                  Logout
                </Button>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-restaurant-dark" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-restaurant-primary text-white">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-restaurant-primary hover:bg-restaurant-secondary">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile navigation bar - only shown on small screens */}
      {!hideNav && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
          <div className="flex justify-around items-center">
            <Link to="/" className="flex flex-col items-center text-sm text-gray-600">
              <Home className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <Link to="/menu" className="flex flex-col items-center text-sm text-gray-600">
              <Menu className="h-6 w-6" />
              <span>Menu</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-sm text-gray-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-restaurant-primary text-white">
                  {totalItems}
                </Badge>
              )}
              <span>Cart</span>
            </Link>
            {isCustomerAuthenticated ? (
              <Link to="/order-history" className="flex flex-col items-center text-sm text-gray-600">
                <Clock className="h-6 w-6" />
                <span>Orders</span>
              </Link>
            ) : (
              <Link to="/login" className="flex flex-col items-center text-sm text-gray-600">
                <User className="h-6 w-6" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Footer */}
      <footer className="bg-restaurant-dark text-white py-8 md:py-12 md:mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FoodieSpot</h3>
              <p className="text-gray-300">
                Delicious food delivered to your doorstep. Order online or visit us!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/menu" className="text-gray-300 hover:text-white">Menu</Link></li>
                <li><Link to="/order-history" className="text-gray-300 hover:text-white">Order History</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <address className="text-gray-300 not-italic">
                123 Food Street<br />
                Foodie City, FC 12345<br />
                Phone: (123) 456-7890<br />
                Email: info@foodiespot.com
              </address>
            </div>
          </div>
          <Separator className="my-6 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FoodieSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Add padding at the bottom on mobile to account for the nav bar */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default CustomerLayout;
