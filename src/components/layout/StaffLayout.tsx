
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, ClipboardList, BarChart, LogOut, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface StaffLayoutProps {
  children: React.ReactNode;
}

const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const { staffUser, staffLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    staffLogout();
    navigate('/staff');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/staff/dashboard', icon: <LayoutGrid className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/staff/orders', icon: <ClipboardList className="h-5 w-5" />, label: 'Orders' },
    { path: '/staff/reports', icon: <BarChart className="h-5 w-5" />, label: 'Reports' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-restaurant-primary">FoodieSpot</h1>
          <p className="text-sm text-gray-400 mt-2">Staff Portal</p>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-restaurant-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4">
          {staffUser && (
            <div className="mb-4">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-medium">{staffUser.username}</p>
              <p className="text-xs text-gray-400">{staffUser.role}</p>
            </div>
          )}
          <Button onClick={handleLogout} variant="outline" className="w-full flex items-center justify-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-restaurant-primary">FoodieSpot Staff</h1>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white border-r border-gray-800 w-64 p-0">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-restaurant-primary">FoodieSpot</h1>
              <p className="text-sm text-gray-400 mt-2">Staff Portal</p>
            </div>
            
            <Separator className="bg-gray-700" />
            
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'bg-restaurant-primary text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 mt-auto">
              {staffUser && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400">Logged in as</p>
                  <p className="font-medium">{staffUser.username}</p>
                  <p className="text-xs text-gray-400">{staffUser.role}</p>
                </div>
              )}
              <Button onClick={handleLogout} variant="outline" className="w-full flex items-center justify-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-100">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;
