# CookNest – Local Home-Cooked Food Ordering App

CookNest is a full-stack food ordering application designed to connect users with local home-cooked meals. The system demonstrates a modern layered architecture using React with React Router, Node.js with Express, and PostgreSQL.

---

## Tech Stack

### Frontend
- **React** 19.2.4 (Create React App)
- **React Router DOM** 7.13.0 for client-side routing
- **Font Awesome** 6.4.0 for icons
- **Vanilla CSS** with responsive design

### Backend
- **Node.js** with Express 5.2.1
- **PostgreSQL** 17.2 as database
- **CORS** 2.8.6 for cross-origin requests
- **pg** 8.18.0 (PostgreSQL client)

### Architecture
- Layered Architecture (Presentation, Business Logic, Data Access)
- Repository Pattern for data access
- Service Layer for business logic
- RESTful API design

---

## Features

### User Management
- User registration with comprehensive validation (name, email, password)
- Password strength requirements (uppercase, lowercase, number, min 6 chars)
- User login with authentication
- Password visibility toggle
- Real-time form validation with error messages

### Food Ordering
- Interactive food dashboard with search functionality
- List and grid view toggle for food items
- Carousel image slider on all pages
- Real-time cart management
- Selected items persist across navigation
- Item quantity and price calculation

### Payment & Orders
- Multiple payment methods (Credit Card, Debit Card, UPI, Net Banking, Cash on Delivery)
- Order confirmation and history
- Detailed order views with payment method tracking
- Order items breakdown with individual prices
- Timestamp for each order

### UI/UX Features
- Sticky header with user info and logout
- Quick access to order history via header icon
- Responsive design for large screens (1920px, 2560px+)
- Loading states for async operations
- Error handling with user-friendly messages
- Success notifications
- Breadcrumb navigation
- Back to menu/cart navigation

---

## Project Structure

```
CookNest/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── server.js              # Server entry point (Port 5000)
│   │   ├── config/
│   │   │   └── db.js              # PostgreSQL connection pool
│   │   ├── controllers/           # Route handlers
│   │   │   ├── userController.js
│   │   │   ├── foodController.js
│   │   │   └── orderController.js
│   │   ├── services/              # Business logic layer
│   │   │   ├── userService.js
│   │   │   └── foodService.js
│   │   ├── repositories/          # Data access layer
│   │   │   ├── userRepository.js
│   │   │   └── foodRepository.js
│   │   └── routes/                # API route definitions
│   │       ├── userRoutes.js
│   │       ├── foodRoutes.js
│   │       └── orderRoutes.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── banner.png
│   │   └── [carousel images 4-9.png]
│   ├── src/
│   │   ├── index.js               # App entry point
│   │   ├── App.js                 # Main app with routing
│   │   ├── api.js                 # API service functions
│   │   ├── routes/
│   │   │   └── routes.js          # Route configuration
│   │   ├── layouts/
│   │   │   └── MainLayout.js      # Layout with header
│   │   └── components/
│   │       ├── Login/
│   │       │   ├── Login.js
│   │       │   └── Login.css
│   │       ├── Register/
│   │       │   ├── Register.js
│   │       │   └── Register.css
│   │       ├── Homepage/
│   │       │   ├── FoodList.js
│   │       │   └── FoodList.css
│   │       ├── Cart/
│   │       │   ├── Cart.js
│   │       │   └── Cart.css
│   │       ├── Payment/
│   │       │   ├── Payment.js
│   │       │   └── Payment.css
│   │       ├── Orders/
│   │       │   ├── Orders.js
│   │       │   └── Orders.css
│   │       ├── Header/
│   │       │   ├── Header.js
│   │       │   └── Header.css
│   │       ├── Banner/
│   │       │   ├── Banner.js
│   │       │   └── Banner.css
│   │       └── Carousel/
│   │           ├── Carousel.js
│   │           └── Carousel.css
│   └── package.json
├── database/
│   └── schema.sql                 # Database schema
├── README.md
└── SYSTEM_ARCHITECTURE.md
```

---

## API Endpoints

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Food Routes
- `GET /api/foods` - Get all food items

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (with items)

---

## How to Run the Application

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL 17.2
- npm or yarn

### 1. Database Setup

Start PostgreSQL and create the database:

```sql
CREATE DATABASE foodapp;
```

Connect to the database and run the schema located in `database/schema.sql`:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);

-- Food items table
CREATE TABLE food_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price NUMERIC(10,2)
);

-- Orders table with payment method
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total_amount NUMERIC(10,2),
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items junction table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  food_item_id INT REFERENCES food_items(id),
  quantity INT DEFAULT 1,
  food_name VARCHAR(100),
  food_price NUMERIC(10,2)
);

-- Sample food items (optional)
INSERT INTO food_items (name, description, price) VALUES
  ('Biryani', 'Delicious chicken biryani', 250),
  ('Paneer Butter Masala', 'Creamy paneer curry', 180),
  ('Dal Tadka', 'Yellow lentils with tempering', 120),
  ('Roti (5 pcs)', 'Whole wheat flatbread', 50),
  ('Gulab Jamun', 'Sweet dessert balls', 80);
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Configure database connection in `backend/src/config/db.js`:

```javascript
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "foodapp",
  password: "YOUR_PASSWORD", // Update with your PostgreSQL password
  port: 5432
});
```

Start the backend server:

```bash
node src/server.js
```

Server will run on **http://localhost:5000**

### 3. Frontend Setup

Navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install
```

Start the React development server:

```bash
npm start
```

Frontend will run on **http://localhost:3000**

---

## Usage

1. **Register**: Create a new account with name, email, and strong password
2. **Login**: Sign in with your credentials
3. **Browse Foods**: View available meals in list or grid view, use search to filter
4. **Add to Cart**: Select items you want to order
5. **Review Cart**: Check your selected items and total amount
6. **Payment**: Choose payment method and confirm order
7. **Order History**: View your past orders with details

---

## Key Features Implementation

### React Router v6
- Declarative routing with `BrowserRouter`
- Protected routes with authentication guards
- Layout components with `Outlet`
- Programmatic navigation with `useNavigate`

### State Management
- React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`)
- Lifted state in App.js for cart persistence
- Form validation with error state management

### Performance Optimizations
- `useCallback` for memoized functions
- `useMemo` for computed values
- Loading states for async operations
- Proper dependency arrays in hooks

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and large displays (1920px, 2560px)
- Viewport units for scaling
- Flexbox and CSS Grid layouts

---

## Development Notes

### Code Quality
- PropTypes validation for all components
- Consistent naming conventions
- Component-scoped CSS to avoid conflicts
- Separation of concerns (Repository → Service → Controller)

### Security Considerations
- Password validation on client and server
- SQL injection prevention via parameterized queries
- CORS configuration
- Input sanitization
- Email uniqueness constraint

### Future Enhancements
- [ ] JWT token-based authentication
- [ ] Password hashing (bcrypt)
- [ ] Image upload for food items
- [ ] Real payment gateway integration
- [ ] User profile management
- [ ] Admin panel for food management
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Rating and review system
- [ ] Address management
- [ ] Multiple user roles (Customer, Cook, Admin)

---

## Troubleshooting

### Backend Issues
- **Port 5000 in use**: Change port in `src/server.js` or kill the process using port 5000
- **Database connection error**: Verify PostgreSQL is running and credentials in `config/db.js` are correct
- **CORS errors**: Check CORS configuration in `src/app.js`

### Frontend Issues
- **npm start fails**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **API calls fail**: Ensure backend is running on port 5000
- **Routing issues**: Clear browser cache and restart dev server
- **react-router-dom not found**: Run `npm install react-router-dom` in frontend directory

### Database Issues
- **Tables already exist**: Drop existing tables or use different database name
- **Foreign key violations**: Ensure orders reference valid user_id
- **Connection timeout**: Check if PostgreSQL service is running

---

## Scripts

### Backend
```bash
node src/server.js    # Start backend server
```

### Frontend
```bash
npm start             # Start development server
npm build             # Build for production
npm test              # Run tests
```

---

## License

MIT License

---

## Author

Built as a demonstration of full-stack development with modern web technologies, featuring clean architecture, React best practices, and responsive design.
