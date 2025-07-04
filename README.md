# Library Management System 📚

## Project Overview

The **Library Management System** is a full-stack web application designed to manage books and borrowing operations in a library. It provides a minimalist, user-friendly interface for performing CRUD operations on books, borrowing books, and viewing borrow summaries. The application is built with a modern technology stack, ensuring type safety, scalability, and responsiveness. The backend follows a modular MVC pattern, and the frontend leverages React with Redux Toolkit Query for state management and API integration.

This project adheres to the provided requirements, implementing all core features, including book management, borrow functionality, and a responsive UI with bonus features like optimistic updates, toast notifications, and type-safe forms.

---

## Features

### Public Routes 🚀

- All pages are accessible without authentication, focusing on essential book and borrowing functionalities.

### Book Management 🛠️

- **Book List Table**:
  - Displays all books in a table format with columns: Title, Author, Genre, ISBN, Copies, Availability, and Actions.
  - Supports filtering by genre and sorting by creation date.
  - Action buttons/icons for:
    - **Edit Book**: Opens a form pre-filled with book data for updates. Updates are reflected instantly in the UI.
      - Business logic: If copies are set to 0, the book is marked unavailable.
    - **Delete Book**: Opens a confirmation dialog before deletion.
    - **Borrow Book**: Opens a form to borrow a book.
    - **Increment Copies**: Increases the number of available copies.
- **Add New Book**:
  - Form with fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional, defaults to true).
  - Redirects to the book list upon successful creation with immediate UI update.
- **Book Details**:
  - Detailed view of a single book’s information.

### Borrow Book 📖

- Accessible via the “Borrow” button in the book list.
- Form fields: Quantity (number), Due Date (date).
- Business logic:
  - Quantity cannot exceed available copies.
  - If copies reach 0, the book is marked unavailable.
- Shows a success message and redirects to the borrow summary page upon submission.

### Borrow Summary 📊

- Displays a list of borrowed books with total quantity borrowed per book.
- Retrieved using MongoDB aggregation pipeline.
- Columns: Book Title, ISBN, Total Quantity Borrowed.

### My Borrows

- Displays a list of books borrowed by the user, with filtering by `isReturned` status.
- Shows due date with a red warning for overdue books.
- Allows returning a book, updating the book’s copies and availability.

### Bonus Features

- **Optimistic UI Updates** (+2): Updates UI immediately after API calls, reverting on failure.
- **Toast Notifications** (+2): Displays success/error messages using the `sonner` library.
- **Responsive Layout** (+4): Fully responsive design for mobile, tablet, and desktop devices.
- **Type-Safe Forms** (+2): Uses `react-hook-form` with `zod` for form validation.

---

## Page List

- **/books**: Lists all books with options to view, edit, delete, borrow, and increment copies.
- **/create-book**: Form to add a new book.
- **/books/:id**: Detailed view of a single book.
- **/edit-book/:id**: Form to update an existing book’s details.
- **/borrow/:bookId**: Form to borrow a selected book.
- **/borrow-summary**: Aggregated summary of all borrowed books.
- **/my-borrows**: List of user’s borrowed books with return functionality.

---

## UI/UX

- **Minimalist UI**: Built with Tailwind CSS for a clean and modern look.
- **User Experience**: Intuitive navigation, clearly labeled buttons, and simple forms with validation feedback.
- **Responsive Design**: Adapts seamlessly to mobile, tablet, and desktop devices.

---

## Technology Stack

### Frontend

- **React + TypeScript**: For building a type-safe, component-based UI.
- **Redux Toolkit + RTK Query**: For state management and API integration.
- **Tailwind CSS**: For styling with utility-first classes.
- **React Hook Form + Zod**: For type-safe form handling and validation.
- **Sonner**: For toast notifications.
- **Lucide React**: For icons.
- **Radix UI**: For accessible UI components (dialogs, dropdowns, etc.).
- **React Router**: For client-side routing.
- **Next Themes**: For dark mode support.

### Backend

- **Node.js + Express.js**: For building RESTful APIs.
- **MongoDB + Mongoose**: For database management with schema validation.
- **TypeScript**: For type safety in the backend.

---

## Backend API Endpoints

### User Routes

- **POST /api/users/signup**: Create a new user.
- **POST /api/users/signin**: Sign in an existing user.
- **GET /api/users/:email**: Get user details by email.

### Book Routes

- **POST /api/books**: Create a new book.
- **GET /api/books**: Get all books with optional filtering and sorting.
  - Query parameters: `filter` (genre), `sortBy` (e.g., `createdAt`), `sort` (`asc`/`desc`), `limit` (default: 10).
- **GET /api/books/:bookId**: Get a book by ID.
- **PATCH /api/books/:bookId**: Update a book’s details.
- **PATCH /api/books/copies/:bookId**: Increment book copies.
- **DELETE /api/books/:bookId**: Delete a book.

### Borrow Routes

- **POST /api/borrow**: Borrow a book.
- **GET /api/borrow**: Get all borrow records with optional `isReturned` filter.
- **GET /api/borrow/summary**: Get aggregated borrow summary.
- **PATCH /api/borrow/:borrowId**: Update a borrow record (e.g., mark as returned).

### Mongoose Middleware

- **Book Schema**:
  - **Instance Method**: `updateAvailability()` sets `available` based on `copies`.
  - **Post Middleware**: Updates `available` after `findOneAndUpdate`.
- **Borrow Schema**:
  - **Pre Middleware**: Validates book existence and available copies before saving a borrow record, deducts copies, and updates availability.
  - **Post Middleware**: Increments book copies when a borrow is marked as returned.

### Error Handling

- Consistent error responses with `success: false`, `message`, and `error` details.
- Validation errors for invalid inputs (e.g., negative copies, insufficient copies).

---

## Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **MongoDB**: Running locally or via MongoDB Atlas
- **npm**: For dependency management

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/pxgacademy/Full-Stack-Minimal-Library-Management-System
   cd Full-Stack-Minimal-Library-Management-System/backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the backend root directory with the following:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/library
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   The backend will run at `http://localhost:5000`.

### Frontend Setup

1. **Navigate to Frontend Directory**:

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the frontend root directory with the following:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

### Dependencies

#### Frontend

```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.1.1",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@reduxjs/toolkit": "^2.8.2",
    "@tailwindcss/vite": "^4.1.11",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.525.0",
    "next-themes": "^0.4.6",
    "react": "^19.1.0",
    "react-day-picker": "^9.7.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.59.0",
    "react-redux": "^9.2.0",
    "react-router": "^7.6.3",
    "sonner": "^2.0.5",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.11",
    "zod": "^3.25.68"
  }
}
```

#### Backend

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.4.0",
    "typescript": "^5.1.6",
    "ts-node-dev": "^2.0.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.4.5"
  }
}
```

---

## Project Structure

### Backend

```
backend/
├── src/
│   ├── controllers/
│   │   ├── bookController.ts
│   │   ├── borrowController.ts
│   │   ├── userController.ts
│   ├── models/
│   │   ├── Book.ts
│   │   ├── Borrow.ts
│   │   ├── User.ts
│   ├── routes/
│   │   ├── bookRoutes.ts
│   │   ├── borrowRoutes.ts
│   │   ├── userRoutes.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── package.json
├── tsconfig.json
```

---

## API Documentation

### User Endpoints

- **POST /api/users/signup**:
  - Request: `{ email: string, password: string }`
  - Response: `{ success: boolean, message: string, data: User }`
- **POST /api/users/signin**:
  - Request: `{ email: string, password: string }`
  - Response: `{ success: boolean, message: string, data: { token: string } }`
- **GET /api/users/:email**:
  - Response: `{ success: boolean, message: string, data: User }`

### Book Endpoints

- **POST /api/books**:
  - Request: `{ title: string, author: string, genre: string, isbn: string, description?: string, copies: number, available?: boolean }`
  - Response: `{ success: boolean, message: string, data: Book }`
- **GET /api/books**:
  - Query: `?filter=GENRE&sortBy=createdAt&sort=asc|desc&limit=number`
  - Response: `{ success: boolean, message: string, data: Book[] }`
- **GET /api/books/:bookId**:
  - Response: `{ success: boolean, message: string, data: Book }`
- **PATCH /api/books/:bookId**:
  - Request: Partial book data
  - Response: `{ success: boolean, message: string, data: Book }`
- **PATCH /api/books/copies/:bookId**:
  - Request: `{ copies: number }`
  - Response: `{ success: boolean, message: string, data: Book }`
- **DELETE /api/books/:bookId**:
  - Response: `{ success: boolean, message: string, data: null }`

### Borrow Endpoints

- **POST /api/borrow**:
  - Request: `{ book: string, quantity: number, dueDate: string }`
  - Response: `{ success: boolean, message: string, data: Borrow }`
- **GET /api/borrow**:
  - Query: `?isReturned=true|false`
  - Response: `{ success: boolean, message: string, data: Borrow[] }`
- **GET /api/borrow/summary**:
  - Response: `{ success: boolean, message: string, data: [{ book: { title: string, isbn: string }, totalQuantity: number }] }`
- **PATCH /api/borrow/:borrowId**:
  - Request: `{ isReturned: boolean }`
  - Response: `{ success: boolean, message: string, data: Borrow }`

---

## Bonus Features Implementation

- **Optimistic UI Updates**: Implemented in book and borrow operations, updating the UI before API confirmation and reverting on failure.
- **Toast Notifications**: Uses `sonner` for success and error messages.
- **Responsive Layout**: Tailwind CSS ensures responsiveness across devices.
- **Type-Safe Forms**: `react-hook-form` with `zod` schemas for validation.

---

## Deployment

- **Frontend**: Deployed on Vercel/Netlify

```bash
https://library-management-a4.netlify.app
```

- **Backend**: Deployed on Render/Heroku

```bash
https://a4-library-management.vercel.app/api
```

- **GitHub Repository**:

```bash
https://github.com/pxgacademy/Full-Stack-Minimal-Library-Management-System
```
