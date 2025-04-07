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

This project was initially built on Replit, which uses some Replit-specific features. To run it locally, use the provided local configuration files:

1. Use `vite.config.local.ts` instead of `vite.config.ts`
2. Use `server/vite.local.ts` instead of `server/vite.ts`
3. Use `server/index.local.ts` instead of `server/index.ts`

The easiest way to run it locally is to use the provided script:
```
node run-local.js
```

## License

MIT