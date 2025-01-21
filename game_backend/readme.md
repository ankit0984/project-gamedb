# GameDB Backend

This repository contains the backend services for the GameDB platform, a robust application for managing and browsing a database of games. Built with **Node.js**, **Express**, and **MongoDB**, the backend ensures high performance, secure authentication, and seamless integration with the frontend.

## Features

- **Authentication:**

  - JWT-based authentication (access & refresh tokens).
  - Secure cookie storage for session management.

- **Database:**

  - MongoDB for data persistence.

- **Caching:**

  - Redis for caching frequently accessed data.

- **Email Notifications:**

  - Nodemailer for sending account-related emails.

- **Security and Monitoring:**
  - Rate limiting to prevent abuse.
  - Logging for debugging and tracking user activity.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Caching:** Redis
- **Authentication:** JWT and secure cookies
- **Email Notifications:** Nodemailer

---

## Installation

### Prerequisites

- Node.js >= 14
- MongoDB installed and running locally or on the cloud
- Redis installed and running locally

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ankit0984/project-gamedb.git
   cd /project-gamedb/game_backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and provide the following variables:

   ```env
    MONGO_URI=mongodb://<DB_USER>:<DB_PASSWORD>@localhost:27017/<DB_NAME>?retryWrites=true&w=majority&authSource=admin
    CORS_ORIGIN=http://localhost:3000
    SERVER_PORT=3636
    NODE_ENV=development
    ACCESS_TOKEN=<ACCESS_TOKEN>
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN=<REFRESH_TOKEN>
    REFRESH_TOKEN_EXPIRY=30d
    FRONTEND_URL=http://localhost:3000

    # nodemailer config
    EMAIL_USER=<EMAIL_USER>
    EMAIL_PASSWORD=<EMAIL_PASSWORD>

    # Redis Configuration
    REDIS_URL=redis://localhost:6379

    # API Configuration
    API_HOST=localhost:3000

    # Rate Limiting
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX_REQUESTS=100

    # Logging
    LOG_LEVEL=info

   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The backend will be accessible at `http://localhost:5000`.

---

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token

### Game Management

- `GET /api/games` - Fetch all games
- `POST /api/games` - Add a new game
- `GET /api/games/:id` - Fetch game details by ID
- `PUT /api/games/:id` - Update game details
- `DELETE /api/games/:id` - Delete a game

---

## Features in Detail

### Authentication

- Implements JWT for secure user authentication.
- Uses refresh tokens for seamless token renewal.
- Stores tokens in HTTP-only cookies for added security.

### Database Integration

- MongoDB is used for persisting game and user data.
- Mongoose ODM simplifies data modeling and querying.

### Caching with Redis

- Frequently accessed data is cached in Redis to improve performance.
- Reduces database load by serving cached responses.

### Rate Limiting

- Configured to limit API requests per user per window.
- Protects the application from abuse and DoS attacks.

### Email Notifications

- Nodemailer is used to send account-related emails such as password resets and welcome messages.

---

## Future Enhancements

- Implement WebSocket for real-time updates.
- Add unit and integration tests with Jest.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---
