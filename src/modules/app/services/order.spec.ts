import { OrderStatusEnum } from 'modules/app/validators/order/create.dto';
import { IOrder } from './../../database/interfaces/order';
import { NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

describe('App/OrderService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

  const order: IOrder = {
    amount: 1099,
    currency: 'EUR',
    description: 'test',
    quantity: 1,
    discount: 0,
    source: 'web',
    unitPrice: 1099,
    status: 'placed' as OrderStatusEnum
  };

  beforeEach(async () => {
    orderRepository = new OrderRepository();

    service = new OrderService(orderRepository);
  });

  it('should return a order for a valid id', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce({ id: 1 } as any);

    const result = await service.findOrderByID(1);

    expect(result).not.toBeFalsy();
  });

  it('should throw an NotFoundException if the order is not found', async () => {
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce(null);
    try {
      await service.findOrderByID(2);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message.message).toBe('order-not-found');
    }
  });

  it('should create a order', async () => {
    jest.spyOn(orderRepository, 'insert').mockResolvedValueOnce(order as any);
    const result = await service.upsertOrder(order as any);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should update order', async () => {
    jest.spyOn(orderRepository, 'update').mockImplementationOnce(order => Promise.resolve({ ...order } as any));

    const result = await service.upsertOrder({ id: 1, ...order } as any);

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...order });
  });
});
