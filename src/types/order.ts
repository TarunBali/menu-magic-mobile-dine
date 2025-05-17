
import { MenuItem } from './menu';

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

export type PaymentMethod = 'CASH' | 'UPI' | 'CARD';

export interface Order {
  id: string;
  items: OrderItem[];
  customerId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  tableNumber?: string;
  specialInstructions?: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
