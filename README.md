# masterji-bookbazaar

## Description

    To build a backend API for an online bookstore that allows users to browse, purchase, and review books. The project simulates a lightweight e-commerce system with real-world backend design challenges.

## End Goal

- Working backend with full CRUD for books, reviews, orders
- JWT-based user authentication
- API key generation to access product and order routes
- Middleware for authentication and key verification
- Full Postman collection with testable endpoints and examples
- Bonus: Razorpay payment integration

## Tables to be Created

- users
- api_keys
- books
- reviews
- orders
- cart_items (bonus enhancement)
- payments (bonus, for mock gateway)

## API Routes (/api/v1)

### Auth & API Key

- POST /auth/register → Register user
- POST /auth/login → Login user
- POST /auth/api-key → Generate new API key
- GET /auth/me → Get user profile

### Book Routes

- POST /books → Add a book (Admin only)
- GET /books → List all books (public, supports filters)
- GET /books/:id → Get book details
- PUT /books/:id → Update book (Admin only)
- DELETE /books/:id → Delete book (Admin only)

### Review Routes

- POST /books/:bookId/reviews → Add review to a book
- GET /books/:bookId/reviews → List reviews for a book
- DELETE /reviews/:id → Delete review (owner only)

### Order Routes

- POST /orders → Place an order
- GET /orders → List user’s orders
- GET /orders/:id → Order details

### Payment Mock API (Bonus)

- POST /payments/create → Create a fake Razorpay payment ID
- POST /payments/verify → Verify mock payment

### Cart Routes

- POST /cart → Create cart for user
- GET /cart → Get cart for user
- PUT /add-item → Add Item to Cart
- PUT /remove-item → remove Item from Cart

## Security

- JWT Auth required for reviews and orders
- Admin check middleware for book creation/deletion
- API Key middleware for accessing /books, /orders, /payments

## Extras

- POSTMAN Collection: [Click Here](https://www.postman.com/manjeetsingh-02-masterji-projects/workspace/masterji-projects/collection/40778073-68a21b12-ac7c-4d67-8a63-c084bbfaf0c3?action=share&creator=40778073)
