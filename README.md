# ShopTop Backend

ShopTop Backend is a robust, scalable, and secure RESTful API server for an e-commerce platform. Built with Node.js, Express, TypeScript, and MongoDB, it provides user authentication, product management, and user management features, following best practices for maintainability and extensibility.

#### LIVE DEMO: https://shoptop-backend.jakariya.eu.org/

## Features

- **User Authentication**: Secure login with JWT-based authentication and password hashing.
- **User Management**: Register, update, and delete users with role-based access control (admin, merchant, customer).
- **Product Management**: Create, update, delete, and list products, including bulk operations and validation.
- **Validation**: Strong input validation using Zod schemas.
- **Error Handling**: Centralized error handling and logging middleware.
- **MongoDB Integration**: Uses Mongoose for schema modeling and database operations.
- **Environment Configuration**: Supports environment variables for configuration.

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jakariyaa/ShopTop-Backend.git
   cd ShopTop-Backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/shoptop
   JWT_SECRET=your_jwt_secret
   ```

### Running the Server

- **Development mode (with hot reload):**
  ```sh
  npm run dev
  ```
- **Production build:**
  ```sh
  npm run build
  npm start
  ```

## API Endpoints

### Users

- `POST   /api/users` - Register a new user
- `GET    /api/users` - List all users
- `PUT    /api/users/:id` - Update user info (self or admin)
- `DELETE /api/users/:id` - Delete a user (admin only)
- `GET    /api/users/whoami` - Get current user info (self, for testing)

### Login

- `POST   /api/login` - Authenticate user and get JWT

### Products

- `GET    /api/products` - List all products
- `POST   /api/products` - Create a new product (merchant/admin)
- `POST   /api/products/bulk` - Bulk create products
- `PUT    /api/products/:id` - Update a product
- `DELETE /api/products/drop` - Drop all products (testing only)

## Project Structure

```
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server bootstrap
│   └── app/
│       ├── controllers/      # Route controllers
│       ├── interfaces/       # TypeScript interfaces
│       ├── middlewares/      # Express middlewares
│       ├── models/           # Mongoose models
│       ├── utils/            # Utility modules
│       └── validators/       # Zod validation schemas
├── package.json
├── tsconfig.json
└── vercel.json
```

## Deployment

This project is ready for deployment on Vercel or any Node.js hosting platform. See `vercel.json` for configuration.

## License

MIT License © 2025 Jakariya Abbas
