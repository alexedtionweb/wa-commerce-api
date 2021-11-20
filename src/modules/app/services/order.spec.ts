import { NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

describe('App/OrderService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

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
      await service.findOrderByID(1);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('should create a order', async () => {
    const order = { id: 1, name: 'test' };

    jest.spyOn(orderRepository, 'insert').mockResolvedValueOnce(order as any);
    const result = await service.createOrder(order as any);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });
});
