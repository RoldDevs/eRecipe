# eRecipe Backend

Backend API for the eRecipe e-commerce application built with FastAPI.

## Tech Stack

- **Framework:** FastAPI
- **Database ORMs:** Prisma, Drizzle (to be configured)
- **Database:** Neon/PlanetScale (to be configured)
- **Deployment:** Railway, Fly.io

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Copy `.env.example` to `.env` and configure your environment variables:
```bash
copy .env.example .env
```

5. Run the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

