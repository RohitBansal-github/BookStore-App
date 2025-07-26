# Backend API Documentation

## Description
This document provides detailed API documentation for the Book Store Application backend.


## API Endpoints

### Authentication & User Management (`/api/user`)

| Endpoint | Method | Description | Authentication | Request Body | Success Response (200/201) | Error Response (400/500) |
|---|---|---|---|---|---|---|
| `/api/user/signup` | `POST` | Registers a new user. | None | `{"fullname": "John Doe", "email": "john@example.com", "password": "password123", "role": "user"}` | `{"message": "User created successfully", "user": {"_id": "...", "fullname": "John Doe", "email": "john@example.com"}}` | `{"message": "User already exists"}` (400), `{"message": "Internal server error"}` (500) |
| `/api/user/login` | `POST` | Logs in a user and returns a JWT token. | None | `{"email": "john@example.com", "password": "password123"}` | `{"message": "Login successful", "user": {"_id": "...", "fullname": "John Doe", "email": "john@example.com"}, "token": "eyJ..."}` | `{"message": "Invalid username or password"}` (400), `{"message": "Internal server error"}` (500) |
| `/api/user/purchased-books` | `GET` | Retrieves a list of books purchased by the authenticated user. | `Bearer Token` | None | `[{"_id": "1", "name": "Purchased Book 1", "title": "A great read", "image": "..."}]` | `{"message": "Internal server error"}` (500) |
| `/api/user/wishlist` | `GET` | Retrieves the authenticated user's wishlist. | `Bearer Token` | None | `[{"_id": "bookId1", "name": "Book Title 1", ...}]` | `{"message": "User not found"}` (404), `{"message": "Internal server error"}` (500) |
| `/api/user/wishlist/add` | `POST` | Adds a book to the authenticated user's wishlist. | `Bearer Token` | `{"bookId": "bookId123"}` | `{"message": "Book added to wishlist successfully"}` | `{"message": "User not found"}` (404), `{"message": "Book not found"}` (404), `{"message": "Book already in wishlist"}` (400), `{"message": "Internal server error"}` (500) |
| `/api/user/wishlist/remove` | `DELETE` | Removes a book from the authenticated user's wishlist. | `Bearer Token` | `{"bookId": "bookId123"}` | `{"message": "Book removed from wishlist successfully"}` | `{"message": "User not found"}` (404), `{"message": "Internal server error"}` (500) |

### Book Management (`/api/book`)

| Endpoint | Method | Description | Authentication | Request Body | Success Response (200/201) | Error Response (400/404/500) |
|---|---|---|---|---|---|---|
| `/api/book` | `GET` | Retrieves all books. | None | None | `[{"_id": "...", "name": "Book Name", "price": 10, "category": "Fiction", "image": "...", "title": "Book Title", "free": false}]` | `{"message": "Internal server error"}` (500) |
| `/api/book/all` | `GET` | Retrieves all books (alias for `/api/book`). | None | None | Same as `/api/book` | Same as `/api/book` |
| `/api/book/free` | `GET` | Retrieves all free books. | None | None | `[{"_id": "...", "name": "Free Book", "price": 0, "category": "Education", "image": "...", "title": "Free Book Title", "free": true}]` | `{"message": "Internal server error"}` (500) |
| `/api/book/category/:categoryName` | `GET` | Retrieves books by category. | None | None | `[{"_id": "...", "name": "Category Book", ...}]` | `{"message": "Internal server error"}` (500) |
| `/api/book/search?query=keyword` | `GET` | Searches books by title. | None | None | `[{"_id": "...", "name": "Searched Book", ...}]` | `{"message": "Internal server error"}` (500) |
| `/api/book/categories` | `GET` | Retrieves all unique book categories. | None | None | `["Fiction", "Science", "History"]` | `{"message": "Internal server error"}` (500) |
| `/api/book/:id` | `GET` | Retrieves a single book by ID. | None | None | `{"_id": "...", "name": "Book Name", ...}` | `{"message": "Book not found"}` (404), `{"message": "Internal server error"}` (500) |
| `/api/book/add` | `POST` | Adds a new book. | None | `{"name": "New Book", "price": 25, "category": "Fantasy", "image": "...", "title": "New Book Title", "free": false}` | `{"message": "Book added successfully", "book": {"_id": "...", "name": "New Book", ...}}` | `{"message": "Internal server error"}` (500) |
| `/api/book/delete/:id` | `DELETE` | Deletes a book by ID. | `Bearer Token` (Admin Only) | None | `{"message": "Book deleted successfully"}` | `{"message": "Book not found"}` (404), `{"message": "Internal server error"}` (500) |
| `/api/book/create-checkout-session` | `POST` | Creates a Stripe checkout session for a book. | None | `{"bookId": "bookId123"}` | `{"url": "https://checkout.stripe.com/..."}` | `{"message": "Book not found"}` (404), `{"message": "Internal server error"}` (500) |
| `/api/book/toggle-like` | `POST` | Toggles a like/unlike for a book by the authenticated user. | `Bearer Token` | `{"bookId": "bookId123"}` | `{"message": "Book liked successfully", "likes": 1, "dislikes": 0, "isLiked": true}` or `{"message": "Book unliked successfully", "likes": 0, "dislikes": 0, "isLiked": false}` | `{"message": "Book or User not found"}` (404), `{"message": "Internal server error"}` (500) |
| `/api/book/delete-all` | `DELETE` | Deletes all books. | `Bearer Token` (Admin Only) | None | `{"message": "All books deleted successfully"}` | `{"message": "Internal server error"}` (500) |


## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Stripe for payments

## Setup and Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd bookStoreApp/Backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the `Backend` directory with the following environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    FRONTEND_URL=http://localhost:3000 # Or your frontend's deployed URL
    ```
    *   `PORT`: The port on which the server will run.
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: A strong, random string for JWT token signing.
    *   `STRIPE_SECRET_KEY`: Your secret key from Stripe for payment processing.
    *   `FRONTEND_URL`: The URL of your frontend application, used for Stripe redirects.

4.  **Run the Application:**
    ```bash
    npm start
    ```
    The server will start on the specified `PORT`.



## Contributing
We welcome contributions! If you'd like to contribute, please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the existing style and passes all tests.

## Future Enhancements / To-Do
*   **User Roles and Permissions:** Implement more granular role-based access control (RBAC) for different user types (e.g., publishers, authors).
*   **Pagination and Filtering:** Add pagination, sorting, and more advanced filtering options to book retrieval endpoints for better performance and user experience.
*   **Error Handling:** Implement more specific error handling and custom error classes for different types of API errors.
*   **Input Validation:** Enhance input validation for all API endpoints to ensure data integrity and security.
*   **Testing:** Add comprehensive unit and integration tests for all API endpoints and business logic.
*   **Logging:** Implement a robust logging mechanism for better monitoring and debugging.
*   **Rate Limiting:** Add rate limiting to prevent abuse and protect the API from excessive requests.
*   **Documentation Generation:** Integrate tools like Swagger/OpenAPI for automatic API documentation generation.
*   **Admin Dashboard APIs:** Develop dedicated APIs for admin functionalities (e.g., managing users, orders, content).
*   **Search Enhancements:** Implement full-text search capabilities using MongoDB Atlas Search or a dedicated search engine.
*   **User Profile Management:** Allow users to update their profile information (e.g., fullname, password).
*   **Order History:** Implement a system to track and display user's order history.
*   **Reviews and Ratings:** Add functionality for users to leave reviews and ratings for books.
*   **Notifications:** Implement a notification system for various events (e.g., new book added, order status change).