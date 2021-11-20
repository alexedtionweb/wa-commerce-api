export interface IOrder {
  id?: number;
  description: string;
  quantity: number;
  amount: number;
  currency: string;
  productID?: number;
  customerID?: number;
  status?: string;
  unitPrice?: number;
  discount?: number;
  source?: string;
  isCompleted?: boolean;

  createdDate?: Date;
  updatedDate?: Date;
}
