import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getConfig } from '@/utils/configUtils';

interface User {
  phone: string;
  name?: string;
}

interface StaffUser {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  staffUser: StaffUser | null;
  isCustomerAuthenticated: boolean;
  isStaffAuthenticated: boolean;
  loginWithOTP: (phone: string) => Promise<boolean>;
  verifyOTP: (phone: string, otp: string) => Promise<boolean>;
  staffLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  staffLogout: () => void;
  updateUserProfile: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [staffUser, setStaffUser] = useState<StaffUser | null>(null);
  const { toast } = useToast();

  // Helper to determine if we should use mock data or real API
  const useMockAuth = () => {
    const config = getConfig();
    return config.isDemo;
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('restaurantAppUser');
    const savedStaffUser = localStorage.getItem('restaurantAppStaffUser');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedStaffUser) {
      setStaffUser(JSON.parse(savedStaffUser));
    }
  }, []);

  // In a real app, this would call an API to send OTP
  const loginWithOTP = async (phone: string): Promise<boolean> => {
    try {
      if (useMockAuth()) {
        // Demo mode - simulate API call to send OTP
        console.log(`Sending OTP to phone number: ${phone}`);
        
        // For demo purposes, we'll use a fixed OTP: 123456
        localStorage.setItem(`otp_${phone}`, '123456');
        
        toast({
          title: "OTP Sent!",
          description: `A verification code has been sent to ${phone}. For this demo, the OTP is 123456.`,
        });
      } else {
        // Production mode - would call actual API
        const config = getConfig();
        console.log(`Would call ${config.apiEndpoints.auth}/send-otp with phone: ${phone}`);
        
        // Since we don't have a real backend yet, still use the demo behavior
        localStorage.setItem(`otp_${phone}`, '123456');
        
        toast({
          title: "OTP Sent!",
          description: `A verification code has been sent to ${phone}.`,
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to send OTP:', error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // In a real app, this would verify OTP with a backend API
  const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
    try {
      if (useMockAuth()) {
        // Demo mode - verify locally
        const savedOTP = localStorage.getItem(`otp_${phone}`);
        
        if (savedOTP === otp) {
          const userData: User = { phone };
          setUser(userData);
          localStorage.setItem('restaurantAppUser', JSON.stringify(userData));
          localStorage.removeItem(`otp_${phone}`);
          
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
          });
          
          return true;
        } else {
          toast({
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
            variant: "destructive",
          });
          return false;
        }
      } else {
        // Production mode - would call actual API
        const config = getConfig();
        console.log(`Would call ${config.apiEndpoints.auth}/verify-otp with phone: ${phone} and OTP`);
        
        // Since we don't have a real backend yet, still use the demo behavior
        const savedOTP = localStorage.getItem(`otp_${phone}`);
        
        if (savedOTP === otp) {
          const userData: User = { phone };
          setUser(userData);
          localStorage.setItem('restaurantAppUser', JSON.stringify(userData));
          localStorage.removeItem(`otp_${phone}`);
          
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
          });
          
          return true;
        } else {
          toast({
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
            variant: "destructive",
          });
          return false;
        }
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // In a real app, this would authenticate with a backend API
  const staffLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll use a hardcoded credential: admin/admin123
      if (username === 'admin' && password === 'admin123') {
        const staffData: StaffUser = {
          username,
          role: 'admin'
        };
        
        setStaffUser(staffData);
        localStorage.setItem('restaurantAppStaffUser', JSON.stringify(staffData));
        
        toast({
          title: "Staff Login Successful",
          description: "You have successfully logged in to staff portal.",
        });
        
        return true;
      } else {
        toast({
          title: "Invalid Credentials",
          description: "The username or password you entered is incorrect.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Failed to login:', error);
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUserProfile = (name: string) => {
    if (user) {
      const updatedUser = { ...user, name };
      setUser(updatedUser);
      localStorage.setItem('restaurantAppUser', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurantAppUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const staffLogout = () => {
    setStaffUser(null);
    localStorage.removeItem('restaurantAppStaffUser');
    toast({
      title: "Staff Logged Out",
      description: "You have been successfully logged out of staff portal.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        staffUser,
        isCustomerAuthenticated: !!user,
        isStaffAuthenticated: !!staffUser,
        loginWithOTP,
        verifyOTP,
        staffLogin,
        logout,
        staffLogout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
