import { Injectable } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).findById(id);
  }

  public async insert(order: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(order);
  }
}
