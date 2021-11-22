import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from './../interfaces/order';
import { Model } from 'objection';
import { OrderStatusEnum } from 'modules/app/validators/order/create.dto';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'number' })
  public id?: number;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'number' })
  public quantity: number;

  @ApiProperty({ type: 'string' })
  public amount: number;

  @ApiProperty({ type: 'string' })
  public currency: string;

  @ApiProperty({ type: 'number' })
  public productID?: number;

  @ApiProperty({ type: 'number' })
  public customerID?: number;

  @ApiProperty({ enum: OrderStatusEnum })
  public status: OrderStatusEnum;

  @ApiProperty({ type: 'string' })
  public unitPrice: number;

  @ApiProperty({ type: 'number' })
  public discount: number;

  @ApiProperty({ type: 'string' })
  public source: string;

  @ApiProperty({ type: 'boolean' })
  public isCompleted?: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate?: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate?: Date;

  public static get tableName(): string {
    return 'Order';
  }
  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
