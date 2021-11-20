import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table.string('description', 500).nullable();
    table
      .integer('quantity')
      .notNullable()
      .defaultTo(0);
    table.integer('amount').notNullable();
    table.string('currency', 3);
    table.integer('productID').nullable();
    table
      .integer('customerID')
      .nullable()
      .index();
    table
      .string('status', 30)
      .notNullable()
      .index();
    table.integer('unitPrice').notNullable();
    table.integer('discount').notNullable();
    table.string('source', 50).notNullable();
    table
      .boolean('isCompleted')
      .nullable()
      .defaultTo(false)
      .index();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Order');
}
