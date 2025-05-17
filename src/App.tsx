
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer pages
import LandingPage from "./pages/customer/LandingPage";
import LoginPage from "./pages/customer/LoginPage";
import MenuPage from "./pages/customer/MenuPage";
import CartPage from "./pages/customer/CartPage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderHistoryPage from "./pages/customer/OrderHistoryPage";
import OrderConfirmationPage from "./pages/customer/OrderConfirmationPage";
import PaymentSuccessPage from "./pages/customer/PaymentSuccessPage";

// Staff pages
import StaffLoginPage from "./pages/staff/LoginPage";
import StaffDashboardPage from "./pages/staff/DashboardPage";
import StaffOrdersPage from "./pages/staff/OrdersPage";
import StaffReportsPage from "./pages/staff/ReportsPage";

// Config page
import ConfigPage from "./pages/ConfigPage";

// Auth components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import StaffProtectedRoute from "./components/auth/StaffProtectedRoute";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Not found page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/order-history" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
              <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />

              {/* Staff Routes */}
              <Route path="/staff" element={<StaffLoginPage />} />
              <Route path="/staff/dashboard" element={<StaffProtectedRoute><StaffDashboardPage /></StaffProtectedRoute>} />
              <Route path="/staff/orders" element={<StaffProtectedRoute><StaffOrdersPage /></StaffProtectedRoute>} />
              <Route path="/staff/reports" element={<StaffProtectedRoute><StaffReportsPage /></StaffProtectedRoute>} />

              {/* Config Route */}
              <Route path="/config" element={<ConfigPage />} />

              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
