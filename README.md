# E-commerce Web Application

## Project Description
This is a Node.js-based E-commerce web application following the MVC (Model-View-Controller) architecture. It provides essential features for an online store, including user authentication, product management, shopping cart, and checkout functionality. The backend is built with Express.js, and the frontend consists of static HTML, CSS, and JavaScript files.

## Features
- **User Authentication:** Sign up, log in, and secure access to user-specific features.
- **Product Management:** Browse, view, and manage products.
- **Shopping Cart:** Add, remove, and view items in the cart.
- **Checkout Process:** Place orders and manage the checkout flow.
- **User Management:** Manage user profiles and related operations.
- **Static Frontend:** Responsive UI with HTML, CSS, and JavaScript.

## Folder Structure
```
E-commerce/
  config/           # Database and environment configuration
  controllers/      # Route controllers for business logic
  middleware/       # Custom middleware (auth, validation)
  models/           # Mongoose models for MongoDB
  public/           # Static frontend files (HTML, CSS, JS, images)
  routes/           # Express route definitions
  server.js         # Main server entry point
  package.json      # Project metadata and dependencies
```

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd E-commerce
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI and any other required environment variables.
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Access the app:**
   - Open your browser and go to `http://localhost:3000` (or the port specified in your environment variables).

## Usage
- Register a new user or log in with existing credentials.
- Browse products, add them to your cart, and proceed to checkout.
- Manage your user profile and view order history.

## Dependencies
- Node.js
- Express.js
- Mongoose (MongoDB)
- dotenv

## License
This project is licensed under the MIT License. 