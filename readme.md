# SOEN

SOEN is a collaborative project workspace built with React, Express, MongoDB, Redis, Socket.IO, and Google Gemini. Users can register, create projects, invite collaborators, edit project files, and use `@ai` in project chat for AI-assisted responses.

## Requirements

- Node.js 18 or newer
- npm
- MongoDB (local or hosted, such as MongoDB Atlas)
- Redis (local or hosted)
- Google Gemini API key

## Setup

1. Clone the repository and enter it:

   ```bash
   git clone <repository-url>
   cd soen-main
   ```

2. Install dependencies:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. Configure the backend:

   ```bash
   cd ../backend
   copy .env.example .env
   ```

   On macOS/Linux, use `cp .env.example .env` instead. Fill in the values in `.env`:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/soen
   JWT_SECRET=replace-with-a-long-random-secret
   GOOGLE_AI_KEY=your-google-gemini-api-key
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

4. Configure the frontend:

   ```bash
   cd ../frontend
   copy .env.example .env
   ```

   On macOS/Linux, use `cp .env.example .env` instead. The default value targets the local backend:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

## Run Locally

Start the backend in one terminal:

```bash
cd backend
npm start
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Production Build

Build the frontend with:

```bash
cd frontend
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Useful Commands

| Directory  | Command           | Purpose                            |
| ---------- | ----------------- | ---------------------------------- |
| `backend`  | `npm start`       | Start the API and Socket.IO server |
| `frontend` | `npm run dev`     | Start the Vite development server  |
| `frontend` | `npm run build`   | Create a production build          |
| `frontend` | `npm run lint`    | Run ESLint                         |
| `frontend` | `npm run preview` | Preview the production build       |

## API Entry Point

The backend health endpoint is available at `GET http://localhost:3000/` and returns `Hello World!` when the server is running.

## Environment Files

- `backend/.env.example` documents server, database, Redis, authentication, and AI configuration.
- `frontend/.env.example` documents the API and Socket.IO URL.
- Never commit `.env` files or API keys.

## Project Structure

```text
backend/     Express API, authentication, MongoDB models, Redis, and Socket.IO
frontend/    React/Vite client application
```
