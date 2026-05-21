# Express Book Reviews

![Node.js CI](https://github.com/nayan07cse/expressBookReviews/actions/workflows/node-ci.yml/badge.svg)

Express Book Reviews is a Node.js and Express REST API for browsing a small in-memory book catalog, registering users, logging in with session-backed JWT authentication, and managing book reviews.

This project was built as part of the IBM/Coursera back-end development coursework and has been organized as a runnable npm package under `express-book-reviews/`.

## Project Scope

The application demonstrates a server-side online book review system integrated with a REST API built on Express. It uses session-level authentication with JSON Web Tokens to protect review management routes while keeping catalog lookup routes publicly accessible.

The project also demonstrates asynchronous Node.js workflows by retrieving book data with async/await and Axios, then validating the API behavior with cURL commands and automated smoke tests.

## Objectives

- Create REST API endpoints on an Express server.
- Perform CRUD-style operations for book review workflows.
- Protect authenticated routes with Express Session and JWT.
- Use async/await or Promise-based workflows with Axios in Node.js.
- Test REST API endpoints using cURL, Postman, or automated smoke tests.

## Features

- Retrieve all books in the shop.
- Retrieve book details by ISBN, author, or title.
- Retrieve reviews for a selected book.
- Register and log in users.
- Add, update, and delete authenticated user reviews.
- Use async/await with Axios for public book retrieval workflows.
- Run automated checks and smoke tests with GitHub Actions.

## Tech Stack

- Node.js
- Express
- Axios
- Express Session
- JSON Web Token
- GitHub Actions

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── node-ci.yml
│       └── publish-package.yml
├── express-book-reviews/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── router/
│       ├── auth_users.js
│       ├── booksdb.js
│       └── general.js
├── LICENSE
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm

Check your versions:

```bash
node --version
npm --version
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/nayan07cse/expressBookReviews.git
cd expressBookReviews/express-book-reviews
```

Install dependencies:

```bash
npm install
```

Start the API server:

```bash
npm start
```

The server runs on:

```text
http://localhost:5000
```

## Available Scripts

Run from the `express-book-reviews/` directory.

```bash
npm start
```

Starts the Express server with Node.

```bash
npm run dev
```

Starts the server with Nodemon for local development.

```bash
npm test
```

Runs JavaScript syntax checks for the app entry point and router files.

## API Reference

### Public Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Retrieve all books. |
| `GET` | `/isbn/:isbn` | Retrieve a book by ISBN. |
| `GET` | `/author/:author` | Retrieve books by author. |
| `GET` | `/title/:title` | Retrieve a book by title. |
| `GET` | `/review/:isbn` | Retrieve reviews for a book. |
| `POST` | `/register` | Register a new user. |

### Authenticated Routes

These routes require a valid login session cookie.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/customer/login` | Log in as a registered user. |
| `PUT` | `/customer/auth/review/:isbn` | Add or update a review. |
| `DELETE` | `/customer/auth/review/:isbn` | Delete the logged-in user's review. |

## Example cURL Commands

Retrieve all books:

```bash
curl http://localhost:5000/
```

Retrieve a book by ISBN:

```bash
curl http://localhost:5000/isbn/4
```

Retrieve books by author:

```bash
curl "http://localhost:5000/author/Jane%20Austen"
```

Retrieve a book by title:

```bash
curl "http://localhost:5000/title/Pride%20and%20Prejudice"
```

Retrieve reviews for a book:

```bash
curl http://localhost:5000/review/4
```

Register a user:

```bash
curl -X POST "http://localhost:5000/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"nayan","password":"pass12345"}'
```

Log in and save the session cookie:

```bash
curl -c cookies.txt -X POST "http://localhost:5000/customer/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"nayan","password":"pass12345"}'
```

Add or update a review:

```bash
curl -b cookies.txt -X PUT "http://localhost:5000/customer/auth/review/4" \
  -H "Content-Type: application/json" \
  -d '{"review":"Great book"}'
```

Delete a review:

```bash
curl -b cookies.txt -X DELETE "http://localhost:5000/customer/auth/review/4"
```

## GitHub Actions

The repository includes a GitHub Actions workflow at `.github/workflows/node-ci.yml`.

The workflow runs on:

- Pushes to `main`
- Pull requests targeting `main`
- Manual runs from the GitHub Actions tab

The workflow installs dependencies, runs syntax checks, starts the API server, and smoke tests the main public endpoints.

## GitHub Packages

This repository is configured to publish the API as a GitHub Packages npm package:

```text
@nayan07cse/express-book-reviews
```

Package publishing is handled by `.github/workflows/publish-package.yml`.

The publish workflow runs on:

- Published GitHub releases
- Manual runs from the GitHub Actions tab

The workflow installs dependencies, runs checks, and publishes the package to:

```text
https://npm.pkg.github.com
```

Each package version can only be published once. To publish a new version, update the `version` field in `express-book-reviews/package.json`, commit the change, and run the publish workflow again.

After the first successful publish, the package appears in the GitHub repository sidebar under **Packages**.

## Data Storage

This project uses in-memory data:

- Books are loaded from `router/booksdb.js`.
- Registered users are stored in memory.
- Reviews are stored in memory.

Data added at runtime is reset whenever the server restarts.

## Security Notes

This project is intended for coursework and local development. It is not production hardened.

- Passwords are stored in plain text in memory.
- JWT and session secrets are hard-coded.
- There is no persistent database.
- There is no rate limiting or request validation layer.

For production use, add password hashing, environment-based secrets, persistent storage, validation, and stronger error handling.

## Package Information

The npm package configuration lives in `express-book-reviews/package.json`.

The package can be installed and run locally with:

```bash
cd express-book-reviews
npm install
npm start
```

The package is configured for GitHub Packages, not the public npm registry.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
