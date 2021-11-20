import { OrderService } from './../services/order';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderValidator } from '../validators/order/create.dto';
import { Order } from 'modules/database/models/order';

@ApiTags('Order')
@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: 201 })
  public async saveOrder(@Body() order: OrderValidator) {
    return this.orderService.createOrder(order);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: [Order] })
  public async getOrderByID(@Param('id') id: number) {
    return this.orderService.findOrderByID(id);
  }
}
