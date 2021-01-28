
exports.up = function(knex) {
    return knex.schema.alterTable('chats', table => {
        table.string('path')
        table.string('filename')
        table.boolean('deliver').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('chats', table => {
        table.dropColumn('path')
        table.dropColumn('filename')
        // table.dropColumn('deliver')

    });
};