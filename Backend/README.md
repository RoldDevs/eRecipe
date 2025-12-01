# eRecipe Backend

## Architecture

- **FastAPI** (Port 8000): Main API gateway, can proxy to Drizzle API or handle Python-specific logic
- **Drizzle API** (Port 3000): Node.js/Express server with Drizzle ORM for database operations
- **Shared Database**: Both services use the same SQLite/PostgreSQL database

## Setup

### 1. Install Node.js Dependencies

```bash
cd Backend
npm install
```

### 2. Set up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Initialize Database

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Open Drizzle Studio
npm run db:studio
```

### 4. Start the Servers

**Terminal 1 - Drizzle API (Node.js):**
```bash
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - FastAPI (Python):**
```bash
# Activate virtual environment
.\env\Scripts\activate  # Windows
source env/bin/activate  # Linux/Mac

# Run FastAPI
uvicorn main:app --reload
# Runs on http://localhost:8000
```

## API Endpoints

### Drizzle API (Direct - Port 3000)
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create recipe
- `GET /api/restaurants` - Get all restaurants
- `GET /api/users` - Get all users
- `GET /api/posts` - Get all posts
- `GET /api/orders` - Get all orders

### FastAPI (Proxy - Port 8000)
- `GET /` - API info
- `GET /health` - Health check
- `GET /api/recipes` - Proxy to Drizzle API
- `GET /api/restaurants` - Proxy to Drizzle API
- `GET /api/users` - Proxy to Drizzle API

## Frontend Configuration

The frontend can connect to either:
- **Drizzle API directly** (faster, recommended): `http://localhost:3000`
- **FastAPI proxy**: `http://localhost:8000`

Set in `eRecipe/.env`:
```
VITE_API_URL=http://localhost:8000
VITE_DRIZZLE_API_URL=http://localhost:3000
```

## Database

- **Development**: SQLite (`./local.db`)
- **Production**: PostgreSQL (Neon/PlanetScale)

Update `drizzle.config.ts` and `src/db/index.ts` for production PostgreSQL setup.

## Development Workflow

1. Make schema changes in `src/db/schema/index.ts`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`
4. Restart servers to see changes