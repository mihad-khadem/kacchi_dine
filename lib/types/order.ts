// Order type definition
export interface Order {
  id: string;
  userId: string;
  items: Array<{
    foodId: string;
    quantity: number;
  }>;
  totalAmount: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
