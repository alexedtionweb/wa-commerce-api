import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'modules/database/models/order';
import { OrderRepository } from '../repositories/order';
import { CreateOrderDto } from '../validators/order/create.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async findOrderByID(id: number): Promise<Order> {
    const order = this.orderRepository.findById(id);

    if (!order) throw new NotFoundException('order-not-found');

    return order;
  }

  public async upsertOrder(order: CreateOrderDto): Promise<Order> {
    if (order.id) return this.orderRepository.update(order);
    return this.orderRepository.insert(order);
  }
  public async remove(orderId: number): Promise<void> {
    return this.orderRepository.remove(orderId);
  }
}
