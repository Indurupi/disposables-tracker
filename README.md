# Disposables Tracker

A mobile-optimized web application for tracking single-use disposable items through photo uploads and maintaining usage checklists.

## Features

- Track single-use disposable items through photo uploads
- Maintain usage checklists for different categories of disposables
- View statistics on your disposable item usage
- Get suggestions for sustainable alternatives

## Technology Stack

- Frontend: React (with TypeScript)
- Backend: Express.js
- Database: PostgreSQL
- Styling: Tailwind CSS & Shadcn UI
- Image Capture: react-webcam
- State Management: React Query

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/Indurupi/disposables-tracker.git
   cd disposables-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the PostgreSQL database and create a `.env` file with:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/disposables
   ```

4. For running on Replit:
   ```
   npm run dev
   ```

5. For running locally (due to Replit-specific configuration):
   ```
   # Use the local configuration files provided
   node run-local.js
   ```

## Running Locally

This project was initially built on Replit, which uses some Replit-specific features. There are different options for running it locally:

### Option 1: Run Full Stack (Client + Server)

This runs both the client and server components on your local machine:

1. Use `vite.config.local.ts` instead of `vite.config.ts`
2. Use `server/vite.local.ts` instead of `server/vite.ts`
3. Use `server/index.local.ts` instead of `server/index.ts`

The easiest way to run the full stack locally is to use the provided script:
```
node run-local.js
```

### Option 2: Run Client-Only (Frontend Development)

This runs only the client side locally and connects to the deployed Replit server for API requests. This is useful for frontend development:

```
node run-client-only.js
```

When using client-only mode:
- The frontend will run on http://localhost:3000
- API requests will be proxied to the deployed Replit app
- You don't need to set up a local database
- Changes to frontend code will be instantly reflected

## License

MIT