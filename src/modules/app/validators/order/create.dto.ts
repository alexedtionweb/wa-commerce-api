import { IOrder } from './../../../database/interfaces/order';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum OrderStatusEnum {
  placed = 'placed',
  approved = 'approved',
  shipped = 'shipped',
  delivered = 'delivered',
  cancelled = 'cancelled'
}

export class OrderValidator implements IOrder {
  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 50 })
  public description: string;

  @IsInt()
  @ApiProperty({ required: false, type: 'number' })
  public quantity: number;

  @IsInt()
  @ApiProperty({ required: false, type: 'number' })
  public amount: number;

  @IsNotEmpty()
  @Length(3, 3)
  @ApiProperty({ required: true, type: 'string', maxLength: 3, minLength: 3 })
  public currency: string;

  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  @ApiProperty({ required: true, enum: OrderStatusEnum })
  public status: OrderStatusEnum;

  @IsNumber()
  @ApiProperty({ required: false, type: 'number' })
  public unitPrice: number;

  @IsInt()
  @ApiProperty({ required: false, type: 'number' })
  public discount: number;

  @IsNotEmpty()
  @IsOptional()
  @Length(3, 30)
  @ApiProperty({ required: false, type: 'string', maxLength: 150 })
  public source?: string;
}
