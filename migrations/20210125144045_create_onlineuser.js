
exports.up = function(knex) {
    return knex.schema.createTable('onlineusers', table => {
        table.increments('id')
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('user.id').onDelete('CASCADE')
        table.unique('id')
        table.boolean('active')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('onlineusers')
};
