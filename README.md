## Frontend/README.md

# React Frontend for Real-time Feed App

This is the React + TypeScript frontend application that displays a real-time feed with infinite scroll using Socket.IO and REST API integration.

---

## Features

- Responsive grid timeline showing feed items (messages with timestamps).
- Infinite scroll loads older feed items from backend paginated API.
- Real-time live feed updates via Socket.IO.
- Written in TypeScript for type safety.
- Modular components with clean CSS styling.

---

## Setup Instructions

### Prerequisites

- Node.js v14+
- npm or yarn

### Installation

1. Open terminal and navigate to the frontend directory

```

cd frontend

```

2. Install dependencies

```

npm install

```

### Running the App

Start the development server:

```

npm start

```

This launches the app at http://localhost:3000.

Make sure the backend server is running at `http://localhost:3001` for API and Socket.IO connection.

---

## Project Structure

- `src/components/FeedGrid.tsx` — main feed component managing infinite scroll and Socket.IO updates.
- `src/components/FeedItemCard.tsx` — renders individual feed cards.
- `src/types.ts` — TypeScript interfaces like `FeedItem`.
- `src/styles.css` — responsive and styled CSS for grid and cards.
- `src/socketClient.ts` (optional) — Socket.IO client wrapper utility.
- `src/App.tsx` — root component rendering `FeedGrid`.
- `src/index.tsx` — React DOM render entry point.

---

## Configuration

- The REST API base URL and Socket.IO URL can be configured in code if needed (usually `http://localhost:3001`).
- Request page size is adjustable in `FeedGrid.tsx` (`PAGE_LIMIT` constant).
- CSS styles are fully customizable via `styles.css`.

---

## Building for Production

To create an optimized production build:

```

npm run build

```

Serve the `build` folder contents via any static HTTP server.

---

## Troubleshooting

- If Socket.IO updates don't appear, check websocket connection URL and server CORS setup.
- For CORS issues, ensure backend allows requests from `http://localhost:3000`.
- Console errors usually show API or socket connection problems.

---

## License

MIT License