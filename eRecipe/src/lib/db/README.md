# Database Setup

This project uses Drizzle ORM for database management, supporting both SQLite (development) and PostgreSQL (production with Neon/PlanetScale).

## Development Setup (SQLite)

1. Install dependencies:
```bash
npm install
```

2. Generate migrations:
```bash
npm run db:generate
```

3. Run migrations:
```bash
npm run db:migrate
```

4. (Optional) Open Drizzle Studio to view your database:
```bash
npm run db:studio
```

## Production Setup (PostgreSQL)

1. Update `src/lib/db/index.ts` to use PostgreSQL:
   - Uncomment the PostgreSQL import and connection code
   - Comment out the SQLite code

2. Update `drizzle.config.ts`:
   - Change `driver` to `'pg'` or `'postgres-js'`
   - Update `dbCredentials` with your PostgreSQL connection string

3. Set `DATABASE_URL` environment variable with your PostgreSQL connection string

4. Run migrations:
```bash
npm run db:migrate
```

## Database Schema

The schema includes:
- Users
- Recipes
- Ingredients
- Restaurants
- Posts (social media)
- Likes & Comments
- Orders & Order Items

All tables include proper relationships and indexes for optimal performance.

