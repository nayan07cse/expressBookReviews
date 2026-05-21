# Express Book Reviews API

Express Book Reviews is a Node.js and Express REST API for browsing books, registering users, logging in, and managing authenticated book reviews.

## Scope

This package implements a server-side online book review API with session-level JWT authentication. It includes public catalog lookup routes, authenticated review management routes, and Axios-based async/await workflows for retrieving book data.

## Quick Start

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The API runs at:

```text
http://localhost:5000
```

## Scripts

```bash
npm start
```

Run the API server.

```bash
npm run dev
```

Run the API server with Nodemon.

```bash
npm test
```

Run syntax checks for the application files.

## Main Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Retrieve all books. |
| `GET` | `/isbn/:isbn` | Retrieve a book by ISBN. |
| `GET` | `/author/:author` | Retrieve books by author. |
| `GET` | `/title/:title` | Retrieve a book by title. |
| `GET` | `/review/:isbn` | Retrieve reviews for a book. |
| `POST` | `/register` | Register a new user. |
| `POST` | `/customer/login` | Log in as a registered user. |
| `PUT` | `/customer/auth/review/:isbn` | Add or update a review. |
| `DELETE` | `/customer/auth/review/:isbn` | Delete a review. |

## GitHub Packages

This package is configured to publish to GitHub Packages as:

```text
@nayan07cse/express-book-reviews
```

Publishing is handled from the repository root by `.github/workflows/publish-package.yml`.

## Notes

This project uses in-memory storage. Registered users and reviews are reset when the server restarts.

This API is designed for coursework and local development, not production deployment.
