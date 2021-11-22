import { IOrder } from 'modules/database/interfaces/order';
import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  for (let x = 0; x < 100; x++) {
    const value = Math.round(parseFloat(faker.commerce.price(10, 30000)) * 100);
    const quantity = faker.datatype.number({ min: 1, max: 10000 });

    const order: IOrder = {
      amount: value,
      unitPrice: Math.round(value / quantity),
      discount: 0,
      currency: faker.finance.currencyCode(),
      description: faker.commerce.productName(),
      source: faker.internet.domainName(),
      quantity,
      status: faker.random.arrayElement(['placed', 'approved', 'shipped', 'delivered', 'cancelled']) as any,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Order');
  }
}
