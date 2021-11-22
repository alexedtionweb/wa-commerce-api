import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export enum OrderListOrderByEnum {
  source = 'source',
  description = 'description',
  quantity = 'quantity',
  amount = 'amount',
  currency = 'currency',
  status = 'status',
  unitPrice = 'unitPrice',
  discount = 'discount',
  isCompleted = 'isCompleted'
}

export class ListOrderDto extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(OrderListOrderByEnum))
  @ApiProperty({ required: false, enum: OrderListOrderByEnum })
  public orderBy: string;
}
