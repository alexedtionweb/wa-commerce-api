import { OrderRepository } from './../repositories/order';
import { OrderService } from './../services/order';
import { Body, Controller, Get, Post, Param, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../validators/order/create.dto';
import { Order } from 'modules/database/models/order';
import { ListOrderDto } from '../validators/order/list.dto';
import { AuthRequired } from 'modules/common/guards/token';

@ApiTags('Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly orderRepository: OrderRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListOrderDto) {
    return this.orderRepository.list(model);
  }

  @Post()
  @ApiResponse({ status: 201 })
  public async upsertOrder(@Body() order: CreateOrderDto) {
    return this.orderService.upsertOrder(order);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: [Order] })
  public async getOrderByID(@Param('id') id: number) {
    return this.orderService.findOrderByID(id);
  }

  @Delete(':orderId')
  @ApiResponse({ status: 204 })
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderRepository.remove(orderId);
  }
}
