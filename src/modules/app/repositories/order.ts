import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page, Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).findById(id);
  }

  public async insert(order: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(order);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select()
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      const orderDirection = params.orderDirection ? params.orderDirection : 'desc';

      query = query.orderBy(params.orderBy, orderDirection);
    }

    if (params.term) {
      if (params.orderBy === 'isCompleted') {
        query = query.where(query => {
          return query.where('isCompleted', '=', params.term);
        });
      } else {
        query = query.where(query => {
          return query.where(params.orderBy, 'ilike', `%${params.term}%`);
        });
      }
    }
    return query;
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, <Order>model);
  }
  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Order.query(transaction)
      .del()
      .where({ id });
  }
}
