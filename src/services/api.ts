
import { Order, OrderStatus, PaymentMethod } from '@/types/order';
import { v4 as uuidv4 } from 'uuid';

// This would be a real API in production
// For demo purposes, we'll use localStorage as our "database"

// Initialize local storage with sample orders if it doesn't exist
const initializeOrdersStorage = () => {
  if (!localStorage.getItem('restaurantOrders')) {
    localStorage.setItem('restaurantOrders', JSON.stringify([]));
  }
};

// Order APIs
export const createOrder = async (
  customerName: string,
  customerPhone: string,
  items: { itemId: number; quantity: number }[],
  totalAmount: number,
  paymentMethod: PaymentMethod,
  tableNumber?: string,
  specialInstructions?: string
): Promise<string> => {
  initializeOrdersStorage();
  
  // In a real app, this would call a backend API
  const orderId = uuidv4();
  const now = new Date().toISOString();
  
  const order: Order = {
    id: orderId,
    customerId: customerPhone, // Using phone as customer ID for demo
    customerName,
    customerPhone,
    items: items.map(i => ({
      item: { 
        // This is just for demo. In a real app, you'd fetch actual menu item details
        id: i.itemId,
        name: 'Item',
        description: '',
        price: 0,
        image: '',
        category: '',
        isVegetarian: false,
        isSpicy: false
      },
      quantity: i.quantity
    })),
    totalAmount,
    paymentMethod,
    status: 'PENDING',
    createdAt: now,
    updatedAt: now,
    tableNumber,
    specialInstructions
  };
  
  const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
  orders.push(order);
  localStorage.setItem('restaurantOrders', JSON.stringify(orders));
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(orderId);
    }, 500);
  });
};

export const getOrdersByCustomer = async (customerPhone: string): Promise<Order[]> => {
  initializeOrdersStorage();
  
  // In a real app, this would call a backend API
  const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
  const customerOrders = orders.filter((order: Order) => order.customerPhone === customerPhone);
  
  // Sort by creation date (newest first)
  customerOrders.sort((a: Order, b: Order) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(customerOrders);
    }, 500);
  });
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  initializeOrdersStorage();
  
  // In a real app, this would call a backend API
  const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
  const order = orders.find((o: Order) => o.id === orderId);
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(order || null);
    }, 500);
  });
};

// Staff APIs
export const getAllOrders = async (): Promise<Order[]> => {
  initializeOrdersStorage();
  
  // In a real app, this would call a backend API
  const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
  
  // Sort by creation date (newest first)
  orders.sort((a: Order, b: Order) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(orders);
    }, 500);
  });
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<boolean> => {
  initializeOrdersStorage();
  
  // In a real app, this would call a backend API
  const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
  const orderIndex = orders.findIndex((o: Order) => o.id === orderId);
  
  if (orderIndex === -1) {
    return Promise.resolve(false);
  }
  
  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();
  
  localStorage.setItem('restaurantOrders', JSON.stringify(orders));
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Payment APIs (mock implementation)
export const processPayment = async (
  orderId: string, 
  amount: number, 
  method: PaymentMethod
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
  // In a real app, this would call a payment gateway API
  
  // Simulate payment processing
  return new Promise(resolve => {
    setTimeout(() => {
      // For demo purposes, all payments succeed
      resolve({
        success: true,
        transactionId: `TXN_${uuidv4().substring(0, 8).toUpperCase()}`
      });
    }, 1000);
  });
};

// Google Sheets integration mock
export const exportOrdersToSheet = async (date?: string): Promise<{ success: boolean; url?: string; error?: string }> => {
  // In a real app, this would call a Google Sheets API
  
  // Simulate export
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        url: 'https://docs.google.com/spreadsheets/d/example-sheet-id'
      });
    }, 1000);
  });
};
