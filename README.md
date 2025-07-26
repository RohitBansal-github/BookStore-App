# Book Store Application

## Project Overview
The Book Store Application is a full-stack web application designed to provide a seamless and user-friendly experience for book enthusiasts. It consists of a **React.js-based frontend** and a **Node.js/Express.js-based backend** with MongoDB for data storage. The application allows users to browse a wide range of books, filter by categories, search for titles, manage wishlists, make purchases via Stripe, and access authenticated features like user account management.

The project is split into two main directories: `Frontend` and `Backend`. This README provides an overview of the entire application, combining details from both the frontend and backend READMEs.

## Project Structure
```
bookStoreApp/
├───Backend/                # Backend source code (Node.js, Express.js, MongoDB)
│   ├───controllers/        # Request handlers for API endpoints
│   ├───models/             # Mongoose schemas (e.g., User, Book)
│   ├───routes/             # API route definitions
│   ├───middleware/         # Custom middleware (e.g., authentication)
│   ├───.env                # Backend environment variables
│   ├───package.json        # Backend dependencies and scripts
│   └───server.js           # Backend entry point
├───Frontend/               # Frontend source code (React.js, Vite, Tailwind CSS)
│   ├───public/             # Static assets
│   ├───src/                # Main frontend source code
│   │   ├───components/     # Reusable UI components (e.g., Navbar, Footer)
│   │   ├───context/        # React Context for state management
│   │   ├───data/           # Static data (e.g., booksData.js)
│   │   ├───pages/          # Top-level page components
│   │   ├───App.jsx         # Main application component
│   │   ├───main.jsx        # Frontend entry point
│   │   └───index.css       # Global styles
│   ├───.env                # Frontend environment variables
│   ├───package.json        # Frontend dependencies and scripts
│   └───vite.config.js      # Vite configuration
├───README.md               # This file
└───...
```

## Features
### Frontend
- **User Authentication:** Secure signup, login, and logout functionalities.
- **Book Browsing:** View a comprehensive list of available books, including free and paid options.
- **Category Filtering:** Filter books by various categories.
- **Book Search:** Search for books by title.
- **Book Details:** View detailed information about individual books.
- **Wishlist Management:** Add and remove books from a personal wishlist.
- **Protected Routes:** Restrict access to certain pages for authenticated users.
- **Payment Integration:** Seamless checkout process for purchasing books via Stripe.
- **Responsive Design:** Adapts to various screen sizes.
- **Theming:** (If implemented) Switch between different themes.

### Backend
- **Authentication & User Management:** Register, login, and manage user wishlists and purchased books using JWT-based authentication.
- **Book Management:** Retrieve, add, delete, and search books; filter by category or free/paid status.
- **Payment Processing:** Create Stripe checkout sessions for book purchases.
- **Like/Unlike Functionality:** Allow users to like or unlike books.
- **Admin Features:** Delete books and clear all books (admin-only endpoints).

## Technologies Used
### Frontend
- **React.js:** For building the user interface.
- **Vite:** For fast development and production builds.
- **Tailwind CSS:** For styling the application.
- **React Router DOM:** For client-side routing.
- **Axios:** For making HTTP requests to the backend API.
- **Context API:** For state management (authentication, theming).

### Backend
- **Node.js:** JavaScript runtime for the server.
- **Express.js:** Web framework for building the API.
- **MongoDB (Mongoose):** Database for storing user and book data.
- **JWT:** For secure user authentication.
- **Stripe:** For payment processing.

## Setup and Installation
### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance, e.g., MongoDB Atlas)
- **Stripe Account** (for payment processing)
- **Git** (for cloning the repository)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd bookStoreApp
   ```

2. **Backend Setup:**
   - Navigate to the Backend directory:
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Backend` directory with the following:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     FRONTEND_URL=http://localhost:5173
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
   - The backend will run on `http://localhost:5000` (or the specified `PORT`).

3. **Frontend Setup:**
   - Navigate to the Frontend directory:
     ```bash
     cd ../Frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Frontend` directory with:
     ```
     VITE_BACKEND_URL=http://localhost:5000/api
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
   - The frontend will run on `http://localhost:5173` (or another port if 5173 is in use).

4. **Access the Application:**
   - Open `http://localhost:5173` in your browser to interact with the frontend.
   - The frontend communicates with the backend at `http://localhost:5000/api`.



## API Endpoints
For detailed API documentation, refer to the backend README. Key endpoints include:
- **User Management:** `/api/user/signup`, `/api/user/login`, `/api/user/wishlist`, etc.
- **Book Management:** `/api/book`, `/api/book/free`, `/api/book/search`, `/api/book/create-checkout-session`, etc.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make changes in either the `Frontend` or `Backend` directory (or both).
4. Commit changes with clear messages (`git commit -m 'feat: Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request, describing your changes and their purpose.

Ensure your code adheres to the existing style, passes linting checks (run `npm run lint` in the `Frontend` directory), and includes tests where applicable.

## Future Enhancements
- **Frontend:**
  - Enhance UI/UX with animations and improved accessibility.
  - Add offline support using service workers.
  - Implement advanced search and filtering options.
- **Backend:**
  - Implement role-based access control (RBAC).
  - Add pagination and advanced filtering for book endpoints.
  - Introduce full-text search with MongoDB Atlas Search.
  - Add user profile management, order history, and book reviews.
  - Implement rate limiting and robust logging.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details (if applicable).