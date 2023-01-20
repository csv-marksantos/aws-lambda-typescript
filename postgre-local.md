# HOW TO CONNECT TO YOUR LOCAL PG ADMIN INSTANCE?

### Steps

- Replace content of DataSource class from `data-source.ts` with the code snippet below and your done

# How to SYNC, DROP, and POPULATE tables via handler with seeders?

- Run `npm run start:offline`
- Invoke `http://localhost:3000/local/create-seeders?dropSchema=true` [POST] to trigger @databaseSeeder method
- And you're done. Trigger the lambda function "ONLY WHEN YOU NEED" to prevent losing all your local data

######

<!------------------------------ DO NOT PUSH IT !!!!! ------------------------------>

#####

# For CODE replacement
new DataSource({
  engine: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'csv',
  username: 'postgres',
  password: <dbPassword>,
  logger: ['local', 'sbx'].includes(env.name) ? 'debug' : null,
  entities: [...fromEntities.entities],
  migrations: [migrationsDir],
  entitySkipConstructor: true,
  synchronize: dropSchema,
  dropSchema,
});
