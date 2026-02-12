# Routing Structure

## Overview
This application uses **React Router v6** for navigation and routing.

## File Structure
```
src/
├── routes/
│   └── routes.js          # Route configuration
├── layouts/
│   └── MainLayout.js      # Layout with Header for authenticated pages
├── App.js                 # Main app with BrowserRouter setup
└── components/            # Page components
```

## Routes

### Public Routes (No Authentication Required)
- `/login` - Login page
- `/register` - Registration page
- `/` - Redirects to `/foods` if authenticated, otherwise `/login`

### Protected Routes (Requires Authentication)
- `/foods` - Food listing page (Homepage)
- `/cart` - Shopping cart/order summary
- `/payment` - Payment gateway
- `/orders` - Order history

## Key Concepts

### 1. Route Configuration (`routes/routes.js`)
- Centralized route definitions
- Uses `ProtectedRoute` wrapper for authentication
- Returns array of route objects with path and element

### 2. Protected Routes
- Checks if user is authenticated
- Redirects to `/login` if not authenticated
- Implemented in `ProtectedRoute` component

### 3. Layout Component (`layouts/MainLayout.js`)
- Uses `<Outlet />` from React Router
- Shows Header on all authenticated pages
- Login/Register pages don't show Header

### 4. Navigation
- Uses `useNavigate()` hook for programmatic navigation
- Replaces previous `setScreen()` state-based routing
- Provides proper browser back/forward button support

## Benefits of This Approach

1. **Browser Integration**: Back/forward buttons work correctly
2. **URL Management**: Each page has a unique URL
3. **Code Organization**: Routes defined separately from business logic
4. **SEO Friendly**: URLs are bookmarkable and shareable
5. **Lazy Loading**: Easy to add code splitting later
6. **Type Safety**: Can add TypeScript route types easily

## Usage Examples

### Navigating Programmatically
```javascript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const goToCart = () => {
    navigate('/cart');
  };
  
  return <button onClick={goToCart}>Go to Cart</button>;
}
```

### Using Link Component
```javascript
import { Link } from 'react-router-dom';

<Link to="/foods">View Foods</Link>
```

### Accessing Route Parameters
```javascript
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const { orderId } = useParams();
  return <div>Order {orderId}</div>;
}
```

## Future Enhancements

1. Add route parameters (e.g., `/order/:id`)
2. Implement lazy loading with `React.lazy()`
3. Add route-based code splitting
4. Add 404 Not Found page
5. Implement nested routes if needed
6. Add route guards/permissions
