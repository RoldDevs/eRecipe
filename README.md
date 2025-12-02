# eRecipe

## Tech Stack

- **Framework:** SvelteKit
- **Styling:** Tailwind CSS
- **Backend** FastAPI (Python), Drizzle localdb for development
- **Language:** TypeScript
- **Database:** Drizzle ORM (SQLite for dev, PostgreSQL/Neon/PlanetScale for production)
- **Deployment:** Vercel (recommended)

## Setup

1. Install dependencies:
```bash
cd eRecipe
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Initialize the database:
```bash
npm run db:generate
npm run db:migrate
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Database Management

- **Generate migrations:** `npm run db:generate`
- **Run migrations:** `npm run db:migrate`
- **Open Drizzle Studio:** `npm run db:studio`

See `src/lib/db/README.md` for detailed database setup instructions.

## Building for Production

```bash
npm run build
npm run preview
```
