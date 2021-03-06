
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').unsigned().primary()
        table.string('first_name')
        table.string('last_name')
        table.string('email')
        table.string('phone')
        table.string('username')
        table.string('full_name')
        table.string('password')

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
