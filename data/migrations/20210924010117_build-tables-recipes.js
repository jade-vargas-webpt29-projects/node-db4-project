exports.up = function (knex) {
  return knex.schema
    .createTable('recipes', (table) => {
      table.increments('recipe_id');
      table.string('recipe', 128).unique().notNullable();
      table.timestamps(false, true);
    })
    .createTable('ingredients', (table) => {
      table.increments('ingredient_id');
      table.string('ingredient', 128).unique().notNullable();
    })
    .createTable('steps', (table) => {
      table.increments('step_id');
      table.int('step_number').unsigned().notNullable();
      table.string('step_instructions', 128).notNullable();
      table
        .int('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('step_ingredients', (table) => {
      table.increments('step_ingredients_id');
      table.decimal('quantity').notNullable();
      table
        .int('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .int('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
