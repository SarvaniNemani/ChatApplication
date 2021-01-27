
exports.up = function(knex) {
    return knex.schema.table('notifications', table => {
        table.boolean('read').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('notifications', table => {
        table.boolean('read').defaultTo(false);
    });
};