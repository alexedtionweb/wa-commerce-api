import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export enum OrderListOrderByEnum {
  status = 'status',
  source = 'source',
  isCompleted = 'source'
}

export class ListOrderDto extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(OrderListOrderByEnum))
  @ApiProperty({ required: false, enum: OrderListOrderByEnum })
  public orderBy: string;
}
