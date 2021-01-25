
exports.up = function(knex) {
    return knex.schema.createTable('user_login', table => {
        table.increments('id')
        table.string('username')
        table.string('password')

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_login')
};
