import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 225)
      table.string('email', 225).notNullable().unique()
      table.string('password', 180)
      table.string('remember_me_token', 225)
      table.enum('type', ['admin'])
      table.string('first_name', 225)
      table.string('last_name', 225)
      table.string('gender', 225)
      table.string('contact_number', 225)
      table.string('address', 225)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
