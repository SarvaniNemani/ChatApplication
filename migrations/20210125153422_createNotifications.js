
exports.up = function(knex) {
    return knex.schema.createTable('notifications', table => {
        table.increments('id')
        table.integer('from_id').unsigned()
        table.foreign('from_id').references('user_login.id').onDelete('CASCADE')
        table.integer('to_id').unsigned()
        table.foreign('to_id').references('user_login.id').onDelete('CASCADE')
        table.integer('chat_id').unsigned()
        table.foreign('chat_id').references('chats.id').onDelete('CASCADE')
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('notifications')
};
