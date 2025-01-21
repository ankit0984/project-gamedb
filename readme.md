# GameDB Platform

A robust and scalable platform to manage and browse a database of games, built using **Next.js** for the frontend and **Node.js** for the backend. The platform provides a seamless user experience with secure authentication, game management, and data persistence.

## Features

- **Frontend:**

  - Built with **Next.js**, enabling server-side rendering for faster load times and improved SEO.
  - Responsive design for a smooth experience across devices.
  - Integration with RESTful APIs for real-time data.

- **Backend:**

  - Powered by **Node.js** and **Express.js**.
  - **MongoDB** for database storage.
  - Implements JWT-based authentication (access & refresh tokens).
  - Rate-limiting and logging for enhanced security and monitoring.

- **Additional Functionalities:**
  - Redis caching for performance optimization.
  - Nodemailer integration for email notifications.
  - Environment-based configuration for flexibility.

---

## Tech Stack

### Frontend

- **Framework:** Next.js
- **Styling:** Tailwind CSS / CSS Modules
- **State Management:** React Context / Redux (optional)

### Backend

- **Framework:** Node.js with Express
- **Database:** MongoDB
- **Caching:** Redis
- **Authentication:** JSON Web Tokens (JWT)

### DevOps

- **Environment Management:** dotenv
- **Logging:** Winston or Bunyan
- **Rate Limiting:** Express-rate-limit

---

## Three-Tier Architecture in AWS

The application follows a three-tier architecture for scalability, security, and modularity, leveraging AWS services:

### 1. **Presentation Tier**

- **Service Used:** AWS CloudFront + S3
  - Static files from the frontend are hosted on S3 and served through CloudFront for high availability and fast delivery.

### 2. **Application Tier**

- **Service Used:** AWS Elastic Beanstalk or ECS (Fargate)
  - The backend Node.js application is deployed in a managed environment, ensuring scalability and ease of management.
  - Implements security groups to restrict access to only the presentation tier.

### 3. **Database Tier**

- **Service Used:** AWS RDS (MongoDB through DocumentDB)
  - MongoDB-compatible database managed by AWS DocumentDB for data storage.
  - Security group restricts access to only the application tier.

### Architecture Diagram

<!-- ![Three-Tier Architecture](https://via.placeholder.com/800x400.png?text=Three-Tier+Architecture+Diagram) -->

1. **Frontend:** Requests are routed through CloudFront to the S3 bucket hosting the static files.
2. **Backend:** API calls are routed to Elastic Beanstalk or ECS, running the Node.js server.
3. **Database:** The backend communicates with DocumentDB for data persistence. All tiers are secured with private subnets and security groups.

---

## Installation

### Prerequisites

- Node.js >= 14
- MongoDB installed and running locally or on the cloud
- Redis installed and running locally

### Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gamedb-platform.git
cd gamedb-platform
```

#### 2. Install Dependencies

- For the backend:

  ```bash
  cd game_backend
  npm install
  ```

- For the frontend:
  ```bash
  cd gamedb_frontend
  yarn install
  ```

#### 3. Configure Environment Variables

- Create `.env` files for both `game_backend` and `gamedb_frontend`.
- Refer to `sample.env` for required variables.

#### 4. Start the Application

- Backend:

  ```bash
  npm start
  ```

- Frontend:
  ```bash
  yarn dev
  ```

The platform will be accessible at `http://localhost:3000`.

---

## Future Enhancements

- Add user roles and permissions.
- Implement GraphQL for the backend.
- Add a testing suite with Jest and Cypress.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE.md) file for details.

---
