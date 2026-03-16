# Tradexa - Full Stack Stock Trading Platform

Tradexa is a multi-app full stack trading project inspired by modern brokerage platforms. It includes:

- A marketing/landing website
- A trading dashboard UI
- An Express + MongoDB backend with authentication and portfolio APIs

The repository is organized so each part can be developed and run independently.

## Features

- User signup and login with hashed passwords (`bcryptjs`) and JWT cookie auth
- Landing website with routes for Home, Signup, Login, About, Products, Pricing, and Support
- Trading dashboard with watchlist, holdings, positions, funds, orders, and summary views
- Instrument-level quick action controls in watchlist (UI)
- Holdings table populated from backend API
- Charts built with `chart.js` / `react-chartjs-2`
- MongoDB models for users, holdings, positions, and orders

## Tech Stack

- Frontend (Landing): React 19 + Vite + React Router + Axios + React Toastify
- Frontend (Dashboard): React 19 + Vite + React Router + MUI + Chart.js
- Backend: Node.js + Express + MongoDB + Mongoose + JWT + Cookie Parser + CORS

## Repository Structure

```text
Tradexa(full stack stock trading platform)/
|- Backend/
|  |- Controllers/
|  |- Middlewares/
|  |- Model/
|  |- Routes/
|  |- Schemas/
|  |- util/
|  |- index.js
|  `- package.json
|- Frontend/
|  |- public/
|  |- src/
|  |  `- landing_page/
|  |- vite.config.js
|  `- package.json
|- dashboard-vite/
|  |- public/
|  |- src/
|  |  |- components/
|  |  `- data/
|  |- vite.config.js
|  `- package.json
`- README.md
```

## Architecture (High Level)

```text
Frontend (Landing, React) ----\
                               >  Backend API (Express, port 3001) <--> MongoDB
Dashboard (React) -----------/
```

## Backend API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Log in existing user |
| `POST` | `/` | Verify user session using JWT cookie |
| `GET` | `/allHoldings` | Fetch all holdings from MongoDB |
| `GET` | `/allPosition` | Fetch all positions from MongoDB |
| `GET` | `/addHoldings` | Seed route placeholder (data block currently commented) |
| `GET` | `/addPosition` | Seed route placeholder (responds with status text) |

## Environment Variables

Create `Backend/.env` with:

```env
MONGO_URL=<your_mongodb_connection_string>
TOKEN_KEY=<your_jwt_secret>
```

Optional:

```env
PORT=3001
```

Note: Current backend code uses `process.PORT || 3001`. Without code changes, it will still run on `3001` by default.

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas or local MongoDB instance

## Local Setup

### 1) Install dependencies

```powershell
cd Backend
npm install

cd ..\Frontend
npm install

cd ..\dashboard-vite
npm install
```

### 2) Start apps (3 terminals)

Terminal 1 (Backend):

```powershell
cd Backend
npm start
```

Terminal 2 (Landing frontend):

```powershell
cd Frontend
npm run dev -- --port 5173
```

Terminal 3 (Dashboard frontend):

```powershell
cd dashboard-vite
npm run dev -- --port 3000
```

## Default URLs

- Landing app: `http://localhost:5173`
- Dashboard app: `http://localhost:3000`
- Backend API: `http://localhost:3001`

## Important Notes

- Dashboard holdings currently call `GET /allHoldings` from backend and require DB data.
- Dashboard positions page currently reads local mock data (`src/data/data.js`), not backend API.
- `BuyActionWindow` posts to `http://localhost:3002/newOrder`, but this route is not available in current backend code.
- Seed routes in backend include commented sample data; enable/add data logic before using for DB initialization.

## Available Scripts

### Backend

- `npm start`: run backend with nodemon (`index.js`)

### Frontend

- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run preview`: preview production build
- `npm run lint`: run ESLint

### Dashboard

- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run preview`: preview production build
- `npm run lint`: run ESLint

## Suggested Next Improvements

- Add `.env.example` files for all apps
- Move API base URLs to environment config instead of hardcoded localhost strings
- Complete order placement API integration (`/newOrder`) in backend
- Add seed script/CLI for holdings and positions instead of HTTP seed endpoints
- Add tests for authentication and API routes
