# Frontend

## Project Overview
This is the frontend application for the Book Store, built with React.js. It provides a user-friendly interface for browsing a wide range of books, managing user accounts, adding books to a wishlist, and facilitating the purchase of books. The application aims to deliver a seamless and intuitive experience for book enthusiasts.

## Project Structure
```
Frontend/
├───public/                 # Static assets
├───src/                    # Main application source code
│   ├───App.jsx             # Main application component
│   ├───index.css           # Global styles
│   ├───main.jsx            # Entry point of the React application
│   ├───assets/             # Images and other assets
│   ├───components/         # Reusable UI components
│   │   ├───Banner.jsx
│   │   ├───BookList.jsx
│   │   ├───Cards.jsx
│   │   ├───CategoryFilter.jsx
│   │   ├───Course.jsx
│   │   ├───CourseDetails.jsx
│   │   ├───Dashboard.jsx
│   │   ├───Footer.jsx
│   │   ├───Freebook.jsx
│   │   ├───Login.jsx
│   │   ├───Logout.jsx
│   │   ├───Navbar.jsx
│   │   ├───ProtectedRoute.jsx
│   │   ├───Signup.jsx
│   │   └───Wishlist.jsx
│   ├───context/            # React Context providers
│   │   ├───AuthProvider.jsx
│   │   └───ThemeProvider.jsx
│   ├───courses/            # Components related to courses (if applicable)
│   │   └───Courses.jsx
│   ├───data/               # Static data (e.g., booksData.js)
│   │   └───booksData.js
│   ├───home/               # Home page components
│   │   └───Home.jsx
│   └───pages/              # Top-level page components
│       ├───About.jsx
│       ├───AllBooks.jsx
│       ├───BookList.jsx
│       ├───BookSummary.jsx
│       ├───Cancel.jsx
│       ├───Contact.jsx
│       ├───FreeBookSummary.jsx
│       ├───LoginRequired.jsx
│       ├───NotFound.jsx
│       ├───SearchBooks.jsx
│       ├───Success.jsx
│       └───books/
│           └───Books.jsx
├───.env                    # Environment variables
├───package.json            # Project dependencies and scripts
└───...
```

## Features
-   **User Authentication:** Secure signup, login, and logout functionalities.
-   **Book Browsing:** View a comprehensive list of available books, including free and paid options.
-   **Category Filtering:** Filter books by various categories to easily find desired content.
-   **Book Search:** Search for books by title.
-   **Book Details:** View detailed information about individual books.
-   **Wishlist Management:** Add and remove books from a personal wishlist.
-   **Protected Routes:** Restrict access to certain pages for authenticated users.
-   **Payment Integration:** Seamless checkout process for purchasing books (via Stripe integration on the backend).
-   **Responsive Design:** User interface adapts to various screen sizes.
-   **Theming:** (If implemented) Ability to switch between different themes.

## Technologies Used
-   **React.js:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool that provides a lightning-fast development experience.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
-   **React Router DOM:** For declarative routing in React applications.
-   **Axios:** For making HTTP requests to the backend API.
-   **Context API:** For state management (e.g., authentication, theming).

## Setup and Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd bookStoreApp/Frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables (Optional):**
    If your frontend needs to communicate with a specific backend URL or other external services, create a `.env` file in the `Frontend` directory. For example:
    ```
    VITE_BACKEND_URL=http://localhost:5000/api
    ```
    *   `VITE_BACKEND_URL`: The base URL of your backend API.

4.  **Run the Application in Development Mode:**
    ```bash
    npm run dev
    ```
    This will start the development server, usually accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts
In the project directory, you can run:

### `npm run dev`
Runs the app in development mode.

### `npm run build`
Builds the app for production to the `dist` folder.

### `npm run lint`
Lints the project files.

### `npm run preview`
Serves the `dist` folder locally for previewing the production build.

## Contributing
We welcome contributions to improve the Book Store Frontend! To contribute, please follow these steps:
1.  **Fork the repository.**
2.  **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make your changes:** Implement your feature or bug fix.
4.  **Commit your changes:** Write clear and concise commit messages.
    ```bash
    git commit -m 'feat: Add new feature' # or 'fix: Resolve bug in X'
    ```
5.  **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
6.  **Open a Pull Request:** Describe your changes and their purpose.

Please ensure your code adheres to the existing coding style, passes linting checks (`npm run lint`), and is thoroughly tested if applicable.
