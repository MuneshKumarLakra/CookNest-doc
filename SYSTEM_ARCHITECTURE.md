# CookNest - System Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture Pattern](#architecture-pattern)
3. [C4 Model Architecture Views](#c4-model-architecture-views)
   - [Level 1: System Context](#level-1-system-context)
   - [Level 2: Container Diagram](#level-2-container-diagram)
   - [Level 3: Component Diagram](#level-3-component-diagram)
4. [Technology Stack](#technology-stack)
5. [System Components](#system-components)
6. [Data Architecture](#data-architecture)
7. [API Architecture](#api-architecture)
8. [Data Flow Diagrams](#data-flow-diagrams)
9. [Architecture Decision Records](#architecture-decision-records)
10. [Security Architecture](#security-architecture)
    - [Security Zones & Network Segmentation](#security-zones--network-segmentation)
    - [Authentication & Authorization](#authentication--authorization)
    - [Data Security & Encryption](#data-security--encryption)
    - [API Security](#api-security)
11. [Infrastructure Architecture](#infrastructure-architecture)
    - [Network Architecture](#network-architecture)
    - [CI/CD Pipeline](#cicd-pipeline)
    - [Infrastructure as Code](#infrastructure-as-code)
12. [Disaster Recovery & Business Continuity](#disaster-recovery--business-continuity)
    - [Backup Strategy](#backup-strategy)
    - [Recovery Procedures](#recovery-procedures)
    - [Business Continuity Plan](#business-continuity-plan)
13. [Compliance & Audit Framework](#compliance--audit-framework)
    - [Audit Logging Architecture](#audit-logging-architecture)
    - [Compliance Requirements](#compliance-requirements)
    - [Data Privacy & GDPR](#data-privacy--gdpr)
14. [Risk Management](#risk-management)
    - [Risk Assessment Matrix](#risk-assessment-matrix)
    - [Threat Modeling](#threat-modeling)
    - [Security Controls](#security-controls)
15. [Access Control & Identity Management](#access-control--identity-management)
16. [Incident Response](#incident-response)
17. [Change Management](#change-management)
18. [Capacity Planning](#capacity-planning)
19. [Non-Functional Requirements](#non-functional-requirements)
20. [Deployment Architecture](#deployment-architecture)
21. [Monitoring and Observability](#monitoring-and-observability)
22. [Scalability Considerations](#scalability-considerations)

---

## Overview

CookNest is a full-stack e-commerce application that connects users with local home-cooked food providers. The system follows a **layered architecture** pattern to ensure separation of concerns, maintainability, and scalability.

### Core Features
- User authentication and authorization
- Food item browsing and search
- Order placement and management
- Payment processing (dummy gateway)
- Order history tracking

---

## Architecture Pattern

CookNest implements a **3-Tier Layered Architecture** with clear separation between presentation, business logic, and data access layers.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                    (React Frontend)                          │
│  • User Interface Components                                │
│  • State Management                                          │
│  • API Client Integration                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│                 (Node.js + Express)                          │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐          │
│  │ Controllers│  │ Controllers│  │ Controllers │          │
│  │   (User)   │  │   (Food)   │  │  (Order)    │          │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘          │
│        │                │                 │                  │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌──────▼──────┐          │
│  │  Services  │  │  Services  │  │  Services   │          │
│  │   (User)   │  │   (Food)   │  │  (Order)    │          │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘          │
│        │                │                 │                  │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌──────▼──────┐          │
│  │Repositories│  │Repositories│  │Repositories │          │
│  │   (User)   │  │   (Food)   │  │  (Order)    │          │
│  └─────┬──────┘  └─────┬──────┘  └──────┬──────┘          │
│        └────────────────┴─────────────────┘                  │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────────────┐
│                     DATA LAYER                               │
│                 (PostgreSQL Database)                        │
│  • users                                                     │
│  • food_items                                                │
│  • orders                                                    │
│  • order_items                                               │
└──────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Presentation Layer (Frontend)
- **Technology**: React
- **Responsibilities**:
  - Rendering UI components
  - Handling user interactions
  - Managing client-side state
  - Making API requests to backend
  - Form validation and error handling

#### 2. Application Layer (Backend)
##### Controllers
- **Responsibilities**:
  - Handle HTTP requests and responses
  - Request validation
  - Invoke appropriate service methods
  - Format responses

##### Services
- **Responsibilities**:
  - Implement business logic
  - Orchestrate data operations
  - Handle transactions
  - Apply business rules

##### Repositories
- **Responsibilities**:
  - Direct database access
  - Execute SQL queries
  - Data mapping
  - Abstract database operations

#### 3. Data Layer
- **Technology**: PostgreSQL
- **Responsibilities**:
  - Persistent data storage
  - Data integrity enforcement
  - Transaction management
  - Query optimization

---

## C4 Model Architecture Views

The C4 model provides a hierarchical way to visualize the CookNest system architecture at different levels of abstraction, from high-level system context down to detailed component interactions.

### Level 1: System Context

The System Context diagram shows how CookNest fits into the world around it - who uses it and what other systems it interacts with.

```
┌─────────────────────────────────────────────────────────────────┐
│                      SYSTEM CONTEXT                              │
│                                                                  │
│                                                                  │
│         ┌──────────────┐                                        │
│         │              │                                        │
│         │   Customer   │                                        │
│         │   (Person)   │                                        │
│         │              │                                        │
│         └───────┬──────┘                                        │
│                 │                                                │
│                 │ Browse food, place orders,                    │
│                 │ view order history                            │
│                 │                                                │
│         ┌───────▼──────────────────────────────────┐           │
│         │                                           │           │
│         │         CookNest Application             │           │
│         │                                           │           │
│         │   Local home-cooked food ordering        │           │
│         │   platform connecting customers with     │           │
│         │   home chefs                              │           │
│         │                                           │           │
│         └───────┬──────────────────────────────────┘           │
│                 │                                                │
│                 │ Read/Write user data,                         │
│                 │ food items, orders                            │
│                 │                                                │
│         ┌───────▼──────┐                                        │
│         │              │                                        │
│         │  PostgreSQL  │                                        │
│         │  Database    │                                        │
│         │  (External   │                                        │
│         │   System)    │                                        │
│         └──────────────┘                                        │
│                                                                  │
│                                                                  │
│   ┌──────────────┐             ┌──────────────┐               │
│   │              │             │              │                │
│   │  Home Chef   │────────────▶│    Admin     │                │
│   │  (Person)    │ Manages     │   (Person)   │                │
│   │              │ food items  │              │                │
│   └──────────────┘             └──────────────┘                │
│         │                               │                       │
│         │ Update food menu,             │ Manage users,         │
│         │ view orders                   │ monitor system        │
│         │                               │                       │
│         └───────────────┬───────────────┘                       │
│                         │                                        │
│                         ▼                                        │
│                 CookNest Application                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

External Systems (Future):
- Email Service (SendGrid/Nodemailer) - Send order confirmations
- Payment Gateway (Stripe/PayPal) - Process payments
- SMS Service (Twilio) - Send notifications
- Cloud Storage (AWS S3) - Store food images
```

#### System Context - Key Actors

| Actor | Type | Description | Interactions |
|-------|------|-------------|--------------|
| Customer | Person | End user who orders food | Browse catalog, search food, place orders, view history |
| Home Chef | Person | Food provider who lists items | Manage food menu, view received orders |
| Admin | Person | System administrator | Manage users, monitor system, configure settings |
| PostgreSQL Database | External System | Data storage | Persist and retrieve application data |
| Email Service | External System (Future) | Notification service | Send order confirmations and updates |
| Payment Gateway | External System (Future) | Payment processor | Handle payment transactions |

---

### Level 2: Container Diagram

The Container diagram zooms into the CookNest system and shows the high-level technology choices and how containers communicate.

```
                              Customer, Home Chef, Admin
                                        │
                                        │ HTTPS
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Web Browser                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │         Single-Page Application                        │    │
│  │         [Container: React/JavaScript]                  │    │
│  │                                                         │    │
│  │  Provides user interface for browsing food,            │    │
│  │  placing orders, and managing account                  │    │
│  │                                                         │    │
│  └─────────────────────┬───────────────────────────────────┘    │
│                        │ Makes API calls to                     │
│                        │ [JSON/HTTPS]                           │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Backend API Server                             │
│           [Container: Node.js + Express]                         │
│                                                                  │
│  Provides REST API for:                                         │
│  • User authentication and registration                         │
│  • Food catalog management                                      │
│  • Order processing                                             │
│  • Business logic and validation                                │
│                                                                  │
│  Technology: Node.js, Express 5.2.1                             │
│  Port: 5000 (typical)                                           │
│                                                                  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ Reads from and writes to
                      │ [SQL/TCP - Port 5432]
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Database                                       │
│           [Container: PostgreSQL]                                │
│                                                                  │
│  Stores:                                                        │
│  • User accounts and credentials                                │
│  • Food items catalog                                           │
│  • Orders and order items                                       │
│  • Transactional data                                           │
│                                                                  │
│  Technology: PostgreSQL (pg driver 8.18.0)                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

Future Containers:
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Cache Layer     │  │  File Storage    │  │  Message Queue   │
│  [Redis]         │  │  [AWS S3/Local]  │  │  [RabbitMQ]      │
│                  │  │                  │  │                  │
│  Session storage │  │  Food images     │  │  Async order     │
│  API cache       │  │  User uploads    │  │  processing      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

#### Container Responsibilities

| Container | Technology | Responsibilities | Communication |
|-----------|-----------|------------------|---------------|
| Single-Page Application | React, JavaScript | User interface, client-side routing, form validation, state management | Makes API calls to Backend API via HTTPS/JSON |
| Backend API Server | Node.js, Express | Business logic, authentication, API endpoints, validation | Queries Database via SQL, responds to SPA via JSON |
| Database | PostgreSQL | Data persistence, transaction management, data integrity | Accepts SQL queries from Backend API |

---

### Level 3: Component Diagram

The Component diagram shows how the Backend API container is broken down into components, their responsibilities, and interactions.

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Backend API Server                              │
│                   [Container: Node.js + Express]                     │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    API Layer                                │    │
│  │                                                             │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │    │
│  │  │ User Routes  │  │ Food Routes  │  │ Order Routes │    │    │
│  │  │              │  │              │  │              │    │    │
│  │  │ /api/users/* │  │ /api/foods/* │  │ /api/orders/*│    │    │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │    │
│  │         │                  │                  │             │    │
│  └─────────┼──────────────────┼──────────────────┼─────────────┘    │
│            │                  │                  │                   │
│            ▼                  ▼                  ▼                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Controller Layer                           │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │    User      │  │    Food      │  │    Order     │     │   │
│  │  │  Controller  │  │  Controller  │  │  Controller  │     │   │
│  │  │              │  │              │  │              │     │   │
│  │  │ • register() │  │ • getFoods() │  │ • create()   │     │   │
│  │  │ • login()    │  │ • search()   │  │ • getById()  │     │   │
│  │  │ • getUser()  │  │ • getById()  │  │ • getByUser()│     │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │   │
│  │         │                  │                  │             │   │
│  └─────────┼──────────────────┼──────────────────┼─────────────┘   │
│            │                  │                  │                   │
│            ▼                  ▼                  ▼                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Service Layer                             │   │
│  │                (Business Logic Components)                   │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │    User      │  │    Food      │  │    Order     │     │   │
│  │  │   Service    │  │   Service    │  │   Service    │     │   │
│  │  │              │  │              │  │              │     │   │
│  │  │ • validate   │  │ • listItems()│  │ • calculate  │     │   │
│  │  │   Credentials│  │ • filterBy() │  │   Total()    │     │   │
│  │  │ • hashPwd()  │  │ • searchBy() │  │ • process    │     │   │
│  │  │ • createUser │  │              │  │   Payment()  │     │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │   │
│  │         │                  │                  │             │   │
│  └─────────┼──────────────────┼──────────────────┼─────────────┘   │
│            │                  │                  │                   │
│            ▼                  ▼                  ▼                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  Repository Layer                            │   │
│  │                (Data Access Components)                      │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │    User      │  │    Food      │  │    Order     │     │   │
│  │  │  Repository  │  │  Repository  │  │  Repository  │     │   │
│  │  │              │  │              │  │              │     │   │
│  │  │ • findByEmail│  │ • getAll()   │  │ • create()   │     │   │
│  │  │ • create()   │  │ • findById() │  │ • findById() │     │   │
│  │  │ • findById() │  │ • search()   │  │ • findByUser│     │   │
│  │  │ • update()   │  │              │  │ • addItems() │     │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │   │
│  │         │                  │                  │             │   │
│  └─────────┼──────────────────┼──────────────────┼─────────────┘   │
│            │                  │                  │                   │
│  ┌─────────▼──────────────────▼──────────────────▼─────────────┐   │
│  │                 Database Configuration                       │   │
│  │               [Component: db.js - pg Pool]                   │   │
│  │                                                              │   │
│  │  • Connection pooling                                       │   │
│  │  • Query execution helper                                   │   │
│  │  • Transaction management                                   │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                             │                                        │
└─────────────────────────────┼────────────────────────────────────────┘
                              │ SQL/TCP
                              ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

#### Component Details

##### API Routes Components
| Component | Responsibility | Dependencies |
|-----------|---------------|--------------|
| userRoutes.js | Define user endpoints, route HTTP methods | userController |
| foodRoutes.js | Define food endpoints, route HTTP methods | foodController |
| orderRoutes.js | Define order endpoints, route HTTP methods | orderController |

##### Controller Components
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| userController.js | register(), login(), getUser() | Handle HTTP request/response for users |
| foodController.js | getFoods(), searchFoods(), getById() | Handle HTTP request/response for food items |
| orderController.js | createOrder(), getOrder(), getUserOrders() | Handle HTTP request/response for orders |

##### Service Components
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| userService.js | validateCredentials(), hashPassword(), createUser() | User business logic, authentication |
| foodService.js | listFoodItems(), filterItems(), searchItems() | Food catalog business logic |
| orderService.js (future) | calculateTotal(), processPayment(), createOrder() | Order processing business logic |

##### Repository Components
| Component | Key Methods | Responsibility |
|-----------|-------------|----------------|
| userRepository.js | findByEmail(), create(), findById(), update() | User data access operations |
| foodRepository.js | getAllFoodItems(), findById(), search() | Food data access operations |
| orderRepository.js (future) | create(), findById(), findByUserId(), addItems() | Order data access operations |

---

### C4 Model - Dynamic Diagrams

#### User Registration Flow

```
User → [Web Browser] → [SPA] → [Backend API] → [Database]
  1. Enter details
  2. Submit form → POST /api/users/register
  3. Receive request → userController.register()
  4. Validate & hash password → userService.createUser()
  5. Insert user → userRepository.create()
  6. INSERT INTO users → PostgreSQL
  7. Return user data ← userRepository
  8. Process result ← userService
  9. Send response (201) ← userController
  10. Display success ← SPA
  11. Redirect to login ← User
```

#### Order Placement Flow

```
User → [Web Browser] → [SPA] → [Backend API] → [Database]
  1. Add items to cart
  2. Submit order → POST /api/orders
  3. Receive request → orderController.createOrder()
  4. Validate & calculate → orderService.processOrder()
  5. Begin transaction
  6. Create order → orderRepository.create()
  7. INSERT INTO orders → PostgreSQL
  8. Add order items → orderRepository.addItems()
  9. INSERT INTO order_items → PostgreSQL
  10. Commit transaction
  11. Return order ← orderRepository
  12. Send confirmation ← orderService
  13. Response (201) ← orderController
  14. Display confirmation ← SPA
  15. View order details ← User
```

---

## Technology Stack

### Frontend
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | React | UI component library |
| Build Tool | Create React App | Development and build setup |
| HTTP Client | Fetch API / Axios | API communication |

### Backend
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Node.js | - | JavaScript runtime |
| Framework | Express | 5.2.1 | Web application framework |
| Database Driver | pg | 8.18.0 | PostgreSQL client |
| CORS | cors | 2.8.6 | Cross-origin resource sharing |

### Database
| Component | Technology | Purpose |
|-----------|-----------|---------|
| RDBMS | PostgreSQL | Relational data storage |

---

## System Components

### Backend Module Structure

```
backend/
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   │
│   ├── config/
│   │   └── db.js               # Database connection pool
│   │
│   ├── controllers/            # HTTP request handlers
│   │   ├── userController.js   # User-related endpoints
│   │   ├── foodController.js   # Food-related endpoints
│   │   └── orderController.js  # Order-related endpoints
│   │
│   ├── services/               # Business logic layer
│   │   ├── userService.js      # User business logic
│   │   ├── foodService.js      # Food business logic
│   │   └── orderService.js     # Order business logic (if exists)
│   │
│   ├── repositories/           # Data access layer
│   │   ├── userRepository.js   # User data operations
│   │   ├── foodRepository.js   # Food data operations
│   │   └── orderRepository.js  # Order data operations (if exists)
│   │
│   └── routes/                 # API route definitions
│       ├── userRoutes.js       # /api/users routes
│       ├── foodRoutes.js       # /api/foods routes
│       └── orderRoutes.js      # /api/orders routes
│
└── package.json                # Dependencies and scripts
```

### Component Flow

```
HTTP Request
    ↓
Routes (Define endpoints)
    ↓
Controllers (Handle request/response)
    ↓
Services (Business logic)
    ↓
Repositories (Data access)
    ↓
Database (PostgreSQL)
    ↓
Repositories (Return results)
    ↓
Services (Process results)
    ↓
Controllers (Format response)
    ↓
HTTP Response
```

---

## Data Architecture

### Database Schema

#### Entity Relationship Diagram

```
┌──────────────────┐
│     users        │
├──────────────────┤
│ id (PK)          │
│ name             │
│ email (UNIQUE)   │
│ password         │
└────────┬─────────┘
         │
         │ 1
         │
         │ *
┌────────▼─────────┐         ┌──────────────────┐
│    orders        │         │   food_items     │
├──────────────────┤         ├──────────────────┤
│ id (PK)          │         │ id (PK)          │
│ user_id (FK)     │         │ name             │
│ total_amount     │    ┌────│ description      │
│ created_at       │    │    │ price            │
└────────┬─────────┘    │    └──────────────────┘
         │              │
         │ 1            │ 1
         │              │
         │ *            │ *
┌────────▼──────────────▼──┐
│     order_items          │
├──────────────────────────┤
│ id (PK)                  │
│ order_id (FK)            │
│ food_item_id (FK)        │
│ quantity                 │
│ food_name                │
│ food_price               │
└──────────────────────────┘
```

#### Table Descriptions

##### users
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique user identifier |
| name | VARCHAR(100) | NOT NULL | User's full name |
| email | VARCHAR(100) | UNIQUE | User's email address |
| password | VARCHAR(100) | NOT NULL | Hashed password |

##### food_items
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique food item identifier |
| name | VARCHAR(100) | NOT NULL | Food item name |
| description | TEXT | - | Detailed description |
| price | NUMERIC(10,2) | NOT NULL | Price in currency |

##### orders
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique order identifier |
| user_id | INT | FOREIGN KEY → users(id) | User who placed order |
| total_amount | NUMERIC(10,2) | NOT NULL | Total order value |
| created_at | TIMESTAMP | DEFAULT NOW() | Order creation timestamp |

##### order_items
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique order item identifier |
| order_id | INT | FOREIGN KEY → orders(id) | Associated order |
| food_item_id | INT | FOREIGN KEY → food_items(id) | Food item ordered |
| quantity | INT | NOT NULL | Quantity ordered |
| food_name | VARCHAR(100) | - | Snapshot of food name |
| food_price | NUMERIC(10,2) | - | Snapshot of food price |

### Data Integrity
- **Referential Integrity**: Foreign key constraints ensure data consistency
- **Unique Constraints**: Email uniqueness prevents duplicate accounts
- **Data Snapshots**: order_items stores food_name and food_price to maintain historical accuracy

---

## API Architecture

### RESTful API Design

#### Base URL
```
http://localhost:<port>/api
```

#### API Endpoints

##### User Management (`/api/users`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/users/register` | Register new user | `{ name, email, password }` | User object |
| POST | `/api/users/login` | Authenticate user | `{ email, password }` | Auth token/User |
| GET | `/api/users/:id` | Get user details | - | User object |

##### Food Management (`/api/foods`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/foods` | Get all food items | - | Array of food items |
| GET | `/api/foods/:id` | Get specific food item | - | Food item object |
| GET | `/api/foods/search?q=` | Search food items | - | Filtered food items |

##### Order Management (`/api/orders`)
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/orders` | Create new order | `{ user_id, items[], total_amount }` | Order object |
| GET | `/api/orders/:id` | Get order details | - | Order with items |
| GET | `/api/orders/user/:userId` | Get user's orders | - | Array of orders |

### Request/Response Flow

```
Client (React)
    │
    │ HTTP Request (JSON)
    ▼
Express Router
    │
    │ Route to Controller
    ▼
Controller
    │
    │ Validate & Extract Data
    ▼
Service Layer
    │
    │ Business Logic
    ▼
Repository Layer
    │
    │ SQL Query
    ▼
PostgreSQL Database
    │
    │ Result Set
    ▼
Repository Layer
    │
    │ Map to Objects
    ▼
Service Layer
    │
    │ Process & Transform
    ▼
Controller
    │
    │ Format Response (JSON)
    ▼
Client (React)
```

### Error Handling Strategy

```javascript
// Standardized error response format
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional context
  }
}
```

---

## Data Flow Diagrams

Data Flow Diagrams (DFD) show how data moves through the CookNest system, including processes, data stores, and external entities.

### Level 0 DFD - Context Diagram

```
                    Customer
                       │
                       │ User credentials,
                       │ Food selections,
                       │ Order data
                       │
                       ▼
            ┌──────────────────────┐
            │                      │────── Order confirmations
            │   CookNest System    │────── Food catalog
            │                      │────── User account info
            └──────────────────────┘
                       │
                       │ Store/Retrieve
                       │ Data
                       ▼
                  PostgreSQL
                  Database
```

### Level 1 DFD - System Processes

```
┌────────────┐
│  Customer  │
└─────┬──────┘
      │
      │ 1. Login credentials
      ▼
┌───────────────────┐         ┌──────────────────┐
│   1.0 User        │────────▶│  D1: users       │
│   Authentication  │  Store  │  (Database)      │
│                   │◀────────│                  │
└─────┬─────────────┘ Verify  └──────────────────┘
      │
      │ 2. Auth token
      ▼
┌───────────────────┐         ┌──────────────────┐
│   2.0 Browse      │────────▶│  D2: food_items  │
│   Food Catalog    │  Query  │  (Database)      │
│                   │◀────────│                  │
└─────┬─────────────┘ Return  └──────────────────┘
      │
      │ 3. Selected items
      ▼
┌───────────────────┐         ┌──────────────────┐
│   3.0 Order       │────────▶│  D3: orders      │
│   Processing      │  Create │  (Database)      │
│                   │◀────────│                  │
└─────┬─────────────┘ OrderID └──────────────────┘
      │                  │
      │                  │
      │                  ▼
      │            ┌──────────────────┐
      │            │  D4: order_items │
      │            │  (Database)      │
      │            └──────────────────┘
      │
      │ 4. Order confirmation
      ▼
┌────────────┐
│  Customer  │
└────────────┘
```

### Level 2 DFD - Detailed Order Processing

```
                    Customer
                       │
                       │ Cart items
                       ▼
            ┌──────────────────────┐
            │  3.1 Validate Cart   │
            │      Items           │
            └──────┬───────────────┘
                   │
                   │ Validated items
                   ▼
            ┌──────────────────────┐         ┌──────────────┐
            │  3.2 Calculate       │────────▶│ D2: food     │
            │      Totals          │  Fetch  │    _items    │
            └──────┬───────────────┘  Prices └──────────────┘
                   │
                   │ Total amount
                   ▼
            ┌──────────────────────┐
            │  3.3 Process         │ (Future)
            │      Payment         │────────▶ Payment Gateway
            └──────┬───────────────┘
                   │
                   │ Payment confirmed
                   ▼
            ┌──────────────────────┐         ┌──────────────┐
            │  3.4 Create Order    │────────▶│ D3: orders   │
            │      Record          │  Store  │              │
            └──────┬───────────────┘         └──────────────┘
                   │
                   │ Order ID
                   ▼
            ┌──────────────────────┐         ┌──────────────┐
            │  3.5 Create Order    │────────▶│ D4: order    │
            │      Items           │  Store  │    _items    │
            └──────┬───────────────┘         └──────────────┘
                   │
                   │ Confirmation
                   ▼
                 Customer
```

### Data Flow Specifications

#### Process: 1.0 User Authentication
| Aspect | Description |
|--------|-------------|
| **Inputs** | Email, password (from Customer) |
| **Processing** | Validate credentials, hash password, verify against database |
| **Outputs** | Authentication token, user profile data |
| **Data Stores** | D1: users (read) |

#### Process: 2.0 Browse Food Catalog
| Aspect | Description |
|--------|-------------|
| **Inputs** | Search query, filters (from Customer) |
| **Processing** | Query food items, apply filters, format results |
| **Outputs** | List of food items with details |
| **Data Stores** | D2: food_items (read) |

#### Process: 3.0 Order Processing
| Aspect | Description |
|--------|-------------|
| **Inputs** | Cart items, user ID, payment info |
| **Processing** | Validate items, calculate total, process payment, create order |
| **Outputs** | Order confirmation, order ID |
| **Data Stores** | D2: food_items (read), D3: orders (write), D4: order_items (write) |

---

## Architecture Decision Records

Architecture Decision Records (ADRs) document important architectural decisions made during the development of CookNest.

### ADR-001: Layered Architecture Pattern

**Status:** Accepted

**Context:**
Need to organize application code for maintainability, testability, and separation of concerns.

**Decision:**
Implement a 3-tier layered architecture with Controllers, Services, and Repositories.

**Rationale:**
- Clear separation of concerns
- Easy to test individual layers
- Standard pattern familiar to most developers
- Enables future migration to microservices if needed

**Consequences:**
- Positive: Better code organization, easier maintenance, clear dependencies
- Negative: Slight performance overhead from multiple layers, more boilerplate code

**Alternatives Considered:**
- Monolithic architecture (rejected - less maintainable)
- Microservices (rejected - overcomplicated for current scale)
- Hexagonal architecture (rejected - overly complex for project size)

---

### ADR-002: PostgreSQL as Primary Database

**Status:** Accepted

**Context:**
Need to choose a database system for persistent data storage.

**Decision:**
Use PostgreSQL as the relational database management system.

**Rationale:**
- ACID compliance for transaction integrity
- Strong relational data model fits the domain (users, orders, food items)
- Excellent support for Node.js via pg library
- Free and open-source
- Strong community and documentation

**Consequences:**
- Positive: Data integrity, referential integrity, strong typing
- Negative: Scaling requires more planning than NoSQL alternatives

**Alternatives Considered:**
- MongoDB (rejected - relational data model is more appropriate)
- MySQL (considered - PostgreSQL chosen for better feature set)
- SQLite (rejected - not suitable for production web applications)

---

### ADR-003: RESTful API Design

**Status:** Accepted

**Context:**
Need to define communication protocol between frontend and backend.

**Decision:**
Implement RESTful API using HTTP methods and JSON payloads.

**Rationale:**
- Industry standard for web APIs
- Stateless communication
- Easy to understand and consume
- Well-supported by Express and React
- Cacheable responses

**Consequences:**
- Positive: Simple, standard, widely understood
- Negative: Can require multiple requests for complex operations

**Alternatives Considered:**
- GraphQL (rejected - overcomplicated for current requirements)
- RPC (rejected - less standard for web applications)
- WebSockets (future consideration for real-time features)

---

### ADR-004: Express.js as Backend Framework

**Status:** Accepted

**Context:**
Need to choose a Node.js framework for building the backend API.

**Decision:**
Use Express.js version 5.2.1 as the web application framework.

**Rationale:**
- Lightweight and unopinionated
- Large ecosystem of middleware
- Excellent documentation and community support
- Minimal learning curve
- Flexible routing system

**Consequences:**
- Positive: Fast development, flexibility, large community
- Negative: Need to make more architectural decisions (not batteries-included)

**Alternatives Considered:**
- NestJS (rejected - too opinionated for current needs)
- Fastify (considered - Express chosen for familiarity)
- Koa (considered - Express chosen for larger ecosystem)

---

### ADR-005: React for Frontend

**Status:** Accepted

**Context:**
Need to choose a frontend framework for building the user interface.

**Decision:**
Use React with Create React App for the frontend application.

**Rationale:**
- Component-based architecture
- Large ecosystem and community
- Virtual DOM for performance
- Excellent developer experience
- Easy to learn and maintain

**Consequences:**
- Positive: Fast development, reusable components, strong ecosystem
- Negative: Requires bundler configuration (mitigated by CRA)

**Alternatives Considered:**
- Vue.js (considered - React chosen for larger job market)
- Angular (rejected - too heavyweight)
- Svelte (considered - React chosen for maturity)

---

### ADR-006: Connection Pooling for Database

**Status:** Accepted

**Context:**
Need to manage database connections efficiently for concurrent requests.

**Decision:**
Use pg connection pooling with a maximum of 20 connections.

**Rationale:**
- Reuses database connections
- Better performance under load
- Prevents connection exhaustion
- Built into pg library

**Consequences:**
- Positive: Better performance, resource management
- Negative: Need to configure pool size appropriately

---

### ADR-007: No ORM - Direct SQL Queries

**Status:** Accepted (For Now)

**Context:**
Need to decide whether to use an ORM or write SQL directly.

**Decision:**
Use direct SQL queries via the pg library without an ORM.

**Rationale:**
- Simple schema doesn't require complex ORM features
- Better performance (no ORM overhead)
- Full control over queries
- Easier to optimize specific queries
- Smaller learning curve for team

**Consequences:**
- Positive: Better performance, full SQL control, simpler stack
- Negative: More boilerplate code, manual SQL writing, less type safety

**Alternatives Considered:**
- Sequelize (considered - rejected for current simplicity needs)
- TypeORM (considered - would require TypeScript migration)
- Prisma (considered - may be adopted in future)

**Future Consideration:**
May adopt Prisma or another modern ORM as application complexity grows.

---

## Security Architecture

A comprehensive security architecture following defense-in-depth principles, industry standards (OWASP, NIST), and compliance requirements.

### Security Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEFENSE IN DEPTH LAYERS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 7: Physical Security                                     │
│  └─> Data center security, physical access controls             │
│                                                                  │
│  Layer 6: Network Security                                      │
│  └─> Firewalls, VPN, Network segmentation, DDoS protection      │
│                                                                  │
│  Layer 5: Host Security                                         │
│  └─> OS hardening, Antivirus, Patch management                  │
│                                                                  │
│  Layer 4: Application Security                                  │
│  └─> Input validation, OWASP Top 10, Secure coding              │
│                                                                  │
│  Layer 3: Data Security                                         │
│  └─> Encryption at rest/transit, Data classification, DLP       │
│                                                                  │
│  Layer 2: Identity & Access                                     │
│  └─> Authentication, Authorization, MFA, SSO                     │
│                                                                  │
│  Layer 1: Policies & Procedures                                 │
│  └─> Security policies, Training, Incident response             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Security Zones & Network Segmentation

Production environment segmented into security zones following the principle of least privilege.

```
┌─────────────────────────────────────────────────────────────────┐
│                          INTERNET                                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTPS (443)
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                    DMZ (Demilitarized Zone)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  WAF (Web Application Firewall)                          │  │
│  │  • OWASP ModSecurity                                     │  │
│  │  • DDoS Protection (Cloudflare/AWS Shield)              │  │
│  │  • Rate Limiting                                         │  │
│  │  • SSL/TLS Termination                                   │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                          │
│  ┌────────────────────▼─────────────────────────────────────┐  │
│  │  Load Balancer (Public)                                  │  │
│  │  • Nginx / AWS ALB                                       │  │
│  │  • Health Checks                                         │  │
│  │  • SSL/TLS Certificates                                  │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                   Firewall Rules
                   (Allow: 443, 80)
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                   APPLICATION ZONE (Private Subnet)              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Server Cluster                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│  │  │ API Node 1  │  │ API Node 2  │  │ API Node 3  │     │  │
│  │  │ (Express)   │  │ (Express)   │  │ (Express)   │     │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │  │
│  │                                                          │  │
│  │  Security Controls:                                     │  │
│  │  • No direct internet access                           │  │
│  │  • Private IP addresses                                │  │
│  │  • Outbound through NAT Gateway                        │  │
│  │  • Security groups: Allow from LB only                 │  │
│  └────────────────────┬─────────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                   Firewall Rules
                   (Allow: 5432 from App Zone only)
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                   DATA ZONE (Private Subnet)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Database Cluster                                        │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │  PostgreSQL Primary (Read/Write)                │    │  │
│  │  │  • Encrypted at rest (AES-256)                  │    │  │
│  │  │  • Encrypted in transit (TLS 1.3)               │    │  │
│  │  │  • Daily automated backups                      │    │  │
│  │  └─────────────────┬───────────────────────────────┘    │  │
│  │                    │ Replication                         │  │
│  │         ┌──────────┴──────────┐                          │  │
│  │         │                     │                          │  │
│  │  ┌──────▼────────┐    ┌──────▼────────┐                │  │
│  │  │ Replica 1     │    │ Replica 2     │                │  │
│  │  │ (Read-only)   │    │ (Read-only)   │                │  │
│  │  └───────────────┘    └───────────────┘                │  │
│  │                                                          │  │
│  │  Security Controls:                                     │  │
│  │  • No internet access (fully isolated)                 │  │
│  │  • Access only from App Zone                           │  │
│  │  • Database-level access controls                      │  │
│  │  • Audit logging enabled                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   MANAGEMENT ZONE (Bastion/Jump Host)            │
│  • SSH access only via VPN                                      │
│  • MFA required                                                 │
│  • All actions logged                                           │
│  • Time-limited sessions                                        │
└─────────────────────────────────────────────────────────────────┘
```

#### Security Zone Rules

| Zone | Inbound | Outbound | Encryption | Monitoring |
|------|---------|----------|------------|------------|
| DMZ | Internet (443, 80) | App Zone | TLS 1.3 | WAF logs, IDS/IPS |
| App Zone | DMZ only | Data Zone, Internet (NAT) | TLS 1.3 | Application logs, APM |
| Data Zone | App Zone (5432) | None | TLS 1.3, AES-256 | Audit logs, query logs |
| Management | VPN only (SSH) | All zones | TLS 1.3 | Session logs, command logs |

---

### Authentication & Authorization

#### Authentication Flow (JWT)

```
┌──────────────┐
│   Client     │
│  (Browser)   │
└──────┬───────┘
       │
       │ 1. POST /api/users/login
       │    { email, password }
       ▼
┌────────────────────────────────────────┐
│        API Server                      │
│  ┌──────────────────────────────────┐ │
│  │  Authentication Controller       │ │
│  └─────────────┬────────────────────┘ │
│                │                       │
│                │ 2. Validate request   │
│                ▼                       │
│  ┌──────────────────────────────────┐ │
│  │  Authentication Service          │ │
│  │  • Fetch user by email           │ │
│  │  • Verify password (bcrypt)      │ │
│  │  • Check account status          │ │
│  │  • Check rate limiting           │ │
│  └─────────────┬────────────────────┘ │
│                │                       │
│                │ 3. Query DB           │
│                ▼                       │
│  ┌──────────────────────────────────┐ │
│  │  User Repository                 │ │
│  └─────────────┬────────────────────┘ │
└────────────────┼────────────────────────┘
                 │
                 ▼
       ┌─────────────────┐
       │   PostgreSQL    │
       │   • users table │
       └─────────┬───────┘
                 │
                 │ 4. Return user record
                 ▼
┌────────────────────────────────────────┐
│        API Server                      │
│  ┌──────────────────────────────────┐ │
│  │  JWT Token Service               │ │
│  │                                  │ │
│  │  Generate JWT:                   │ │
│  │  {                               │ │
│  │    "sub": "user_id",             │ │
│  │    "email": "user@example.com",  │ │
│  │    "role": "customer",            │ │
│  │    "iat": 1707696000,            │ │
│  │    "exp": 1707782400             │ │
│  │  }                               │ │
│  │                                  │ │
│  │  Sign with: JWT_SECRET           │ │
│  │  Algorithm: HS256                │ │
│  └─────────────┬────────────────────┘ │
└────────────────┼────────────────────────┘
                 │
                 │ 5. Return JWT token
                 ▼
       ┌──────────────┐
       │   Client     │
       │  Store token │
       │  (localStorage │
       │   or cookie)  │
       └──────────────┘

Subsequent Requests:
─────────────────────

┌──────────────┐
│   Client     │
└──────┬───────┘
       │ GET /api/orders
       │ Authorization: Bearer <JWT>
       ▼
┌────────────────────────────────────────┐
│  Authentication Middleware             │
│  1. Extract token from header          │
│  2. Verify signature (JWT_SECRET)      │
│  3. Check expiration                   │
│  4. Decode payload                     │
│  5. Attach user to request object      │
└─────────────┬──────────────────────────┘
              │
              │ Token valid
              ▼
┌────────────────────────────────────────┐
│  Authorization Middleware              │
│  1. Check user role/permissions        │
│  2. Verify resource ownership          │
│  3. Apply access control rules         │
└─────────────┬──────────────────────────┘
              │
              │ Authorized
              ▼
┌────────────────────────────────────────┐
│  Order Controller                      │
│  • Process request                     │
│  • Access granted                      │
└────────────────────────────────────────┘
```

#### Role-Based Access Control (RBAC)

```
┌─────────────────────────────────────────────────────────────┐
│                        RBAC Matrix                           │
├─────────────┬───────────┬─────────────┬────────────────────┤
│   Resource  │  Customer │  Home Chef  │  Administrator     │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Users       │           │             │                    │
│  • Create   │     ✓     │      ✓      │         ✓          │
│  • Read Own │     ✓     │      ✓      │         ✓          │
│  • Read All │     ✗     │      ✗      │         ✓          │
│  • Update   │  Own Only │   Own Only  │         ✓          │
│  • Delete   │  Own Only │   Own Only  │         ✓          │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Food Items  │           │             │                    │
│  • Create   │     ✗     │      ✓      │         ✓          │
│  • Read     │     ✓     │      ✓      │         ✓          │
│  • Update   │     ✗     │   Own Only  │         ✓          │
│  • Delete   │     ✗     │   Own Only  │         ✓          │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Orders      │           │             │                    │
│  • Create   │     ✓     │      ✗      │         ✓          │
│  • Read Own │     ✓     │      ✓*     │         ✓          │
│  • Read All │     ✗     │      ✗      │         ✓          │
│  • Update   │     ✗     │  Status Only│         ✓          │
│  • Delete   │     ✗     │      ✗      │         ✓          │
├─────────────┼───────────┼─────────────┼────────────────────┤
│ Reports     │           │             │                    │
│  • View     │     ✗     │   Own Only  │         ✓          │
│  • Export   │     ✗     │   Own Only  │         ✓          │
└─────────────┴───────────┴─────────────┴────────────────────┘

* Home Chef can read orders containing their food items
```

#### Multi-Factor Authentication (Future)

```
Login Process with MFA:

1. Username/Password ────> Verify ────> Success
                                           │
                                           ▼
2. Send OTP via: ──────────────────> Email/SMS/Authenticator App
   │
   ▼
3. User enters OTP ──────> Verify OTP ───> Success
                                              │
                                              ▼
4. Generate JWT Token ──────────────────> Grant Access
                                              │
                                              ▼
5. Session Established (with MFA badge)
```

---

### Data Security & Encryption

#### Encryption Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA ENCRYPTION LAYERS                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Data in Transit                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • TLS 1.3 for all connections                     │    │
│  │  • Client ↔ Load Balancer: HTTPS                   │    │
│  │  │  • Strong cipher suites only                     │    │
│  │  • Load Balancer ↔ API: TLS                        │    │
│  │  • API ↔ Database: TLS/SSL                         │    │
│  │  • Certificate: Let's Encrypt / AWS ACM            │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Layer 2: Data at Rest                                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Database Encryption:                              │    │
│  │  • Algorithm: AES-256-GCM                          │    │
│  │  • Encrypted columns: password (bcrypt hashed)     │    │
│  │  • Full disk encryption (FDE)                      │    │
│  │  • Key Management: AWS KMS / HashiCorp Vault       │    │
│  │                                                     │    │
│  │  Backup Encryption:                                │    │
│  │  • Encrypted backups (AES-256)                     │    │
│  │  • Separate encryption keys                        │    │
│  │  • Stored in encrypted S3 buckets                  │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Layer 3: Application Level                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • Password hashing: bcrypt (cost factor: 12)      │    │
│  │  • JWT secret: 256-bit random key                  │    │
│  │  • API keys: SHA-256 hashed                        │    │
│  │  • Sensitive fields: Field-level encryption        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Data Classification

| Classification | Examples | Encryption | Access Control | Retention |
|----------------|----------|------------|----------------|-----------|
| **Public** | Food item descriptions, prices | Optional | Anyone | Indefinite |
| **Internal** | Order statistics, analytics | TLS in transit | Authenticated users | 7 years |
| **Confidential** | User emails, order details | TLS + DB encryption | Owner + Admin | 7 years |
| **Restricted** | Passwords, payment info | TLS + Hashing/Encryption | System only | Per regulation |

#### Encryption Implementation

```javascript
// Password Hashing (bcrypt)
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// JWT Token Generation
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000)
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256'
  });
}

// Field-level encryption (for sensitive data)
const crypto = require('crypto');

function encryptField(data, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}
```

---

### API Security

#### API Security Controls

```
┌─────────────────────────────────────────────────────────────┐
│                    API SECURITY LAYERS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Rate Limiting                                           │
│     ┌──────────────────────────────────────────────────┐   │
│     │ • Global: 1000 requests/hour per IP             │   │
│     │ • Authenticated: 5000 requests/hour per user    │   │
│     │ • Login endpoint: 5 attempts/15 minutes         │   │
│     │ • Implementation: express-rate-limit + Redis    │   │
│     └──────────────────────────────────────────────────┘   │
│                                                              │
│  2. Request Validation                                      │
│     ┌──────────────────────────────────────────────────┐   │
│     │ • Schema validation: Joi / express-validator    │   │
│     │ • Type checking                                  │   │
│     │ • Size limits: Body 10MB, Upload 5MB            │   │
│     │ • Content-Type validation                        │   │
│     └──────────────────────────────────────────────────┘   │
│                                                              │
│  3. Input Sanitization                                      │
│     ┌──────────────────────────────────────────────────┐   │
│     │ • SQL Injection: Parameterized queries          │   │
│     │ • XSS: DOMPurify, escape HTML                   │   │
│     │ • NoSQL Injection: Input validation             │   │
│     │ • Path Traversal: Whitelist validation          │   │
│     └──────────────────────────────────────────────────┘   │
│                                                              │
│  4. Security Headers (helmet.js)                            │
│     ┌──────────────────────────────────────────────────┐   │
│     │ • X-Frame-Options: DENY                         │   │
│     │ • X-Content-Type-Options: nosniff               │   │
│     │ • Strict-Transport-Security: max-age=31536000   │   │
│     │ • Content-Security-Policy: strict               │   │
│     │ • X-XSS-Protection: 1; mode=block               │   │
│     └──────────────────────────────────────────────────┘   │
│                                                              │
│  5. CORS Configuration                                      │
│     ┌──────────────────────────────────────────────────┐   │
│     │ • Allowed Origins: Whitelist only               │   │
│     │ • Allowed Methods: GET, POST, PUT, DELETE       │   │
│     │ • Credentials: true (for cookies)               │   │
│     │ • Max Age: 86400                                │   │
│     └──────────────────────────────────────────────────┘   │
│                                                              │
│  6. API Versioning                                          │
│     ┌──────────────────────────────────────────────────┐   │
│     │ • URI versioning: /api/v1/, /api/v2/            │   │
│     │ • Deprecation policy: 6 months notice           │   │
│     │ • Version sunset schedule                        │   │
│     └──────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### OWASP Top 10 Mitigation

| Risk | Mitigation Strategy | Implementation Status |
|------|---------------------|----------------------|
| **A01: Broken Access Control** | RBAC, JWT verification, ownership checks | ⏳ Planned |
| **A02: Cryptographic Failures** | TLS 1.3, AES-256, bcrypt, secure key management | ⏳ Planned |
| **A03: Injection** | Parameterized queries, input validation, ORM | ✅ Partial (SQL) |
| **A04: Insecure Design** | Threat modeling, security requirements, code review | 🔄 In Progress |
| **A05: Security Misconfiguration** | Security headers, least privilege, hardening | ⏳ Planned |
| **A06: Vulnerable Components** | Dependency scanning, regular updates, SCA tools | ⏳ Planned |
| **A07: Authentication Failures** | JWT, MFA, password policies, rate limiting | ⏳ Planned |
| **A08: Software & Data Integrity** | Code signing, integrity checks, SRI | ⏳ Planned |
| **A09: Logging Failures** | Comprehensive logging, SIEM integration | ⏳ Planned |
| **A10: SSRF** | URL validation, whitelist, network segmentation | ⏳ Planned |

---

## Infrastructure Architecture

### Network Architecture

Production network architecture with high availability and security.

```
                            Internet
                               │
                               │
                       ┌───────▼────────┐
                       │   DNS (Route53) │
                       │   • Geo-routing  │
                       │   • Failover     │
                       └───────┬────────┘
                               │
                               │
                    ┌──────────▼───────────┐
                    │  CDN (CloudFront)    │
                    │  • Static assets     │
                    │  • Edge caching      │
                    │  • DDoS protection   │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┴──────────────────────┐
        │                                              │
  ┌─────▼─────┐                                 ┌─────▼─────┐
  │  Region 1  │                                 │  Region 2  │
  │  (Primary) │                                 │ (Failover) │
  └─────┬─────┘                                 └─────┬─────┘
        │                                              │
┌───────▼────────────────────────────────┐            │
│       VPC (Virtual Private Cloud)      │            │
│    CIDR: 10.0.0.0/16                  │            │
│                                        │            │
│  ┌──────────────────────────────────┐ │            │
│  │  Availability Zone A              │ │            │
│  │                                   │ │            │
│  │  ┌─────────────────────────────┐ │ │            │
│  │  │ Public Subnet                │ │ │            │
│  │  │ 10.0.1.0/24                  │ │ │            │
│  │  │ • NAT Gateway                │ │ │            │
│  │  │ • Bastion Host               │ │ │            │
│  │  └─────────────────────────────┘ │ │            │
│  │                                   │ │            │
│  │  ┌─────────────────────────────┐ │ │            │
│  │  │ Private Subnet (App)         │ │ │            │
│  │  │ 10.0.10.0/24                 │ │ │            │
│  │  │ • API Servers                │ │ │            │
│  │  │ • Application Load Balancer  │ │ │            │
│  │  └─────────────────────────────┘ │ │            │
│  │                                   │ │            │
│  │  ┌─────────────────────────────┐ │ │            │
│  │  │ Private Subnet (Data)        │ │ │            │
│  │  │ 10.0.20.0/24                 │ │ │            │
│  │  │ • PostgreSQL Primary         │ │ │            │
│  │  │ • Redis Cache                │ │ │            │
│  │  └─────────────────────────────┘ │ │            │
│  └───────────────────────────────────┘ │            │
│                                        │            │
│  ┌──────────────────────────────────┐ │            │
│  │  Availability Zone B              │ │            │
│  │  (Same structure for HA)          │ │            │
│  └──────────────────────────────────┘ │            │
│                                        │            │
│  ┌──────────────────────────────────┐ │            │
│  │  Security Groups                  │ │            │
│  │  • ALB-SG: 443,80 from Internet   │ │            │
│  │  • App-SG: 5000 from ALB-SG       │ │            │
│  │  • DB-SG: 5432 from App-SG        │ │            │
│  │  • Bastion-SG: 22 from VPN        │ │            │
│  └──────────────────────────────────┘ │            │
└────────────────────────────────────────┘            │
                                                      │
                   ┌──────────────────────────────────┘
                   │  DR Replication
                   │  • Database replication
                   │  • Backup storage
                   │  • Standby infrastructure
                   └──────────────────────────────────
```

---

### CI/CD Pipeline

Automated, secure deployment pipeline with quality gates.

```
┌─────────────────────────────────────────────────────────────────┐
│                        CI/CD PIPELINE                            │
└─────────────────────────────────────────────────────────────────┘

┌──────────┐
│Developer │
└────┬─────┘
     │
     │ 1. git push
     ▼
┌─────────────────┐
│  Git Repository │
│  (GitHub/GitLab)│
└────┬────────────┘
     │
     │ 2. Webhook trigger
     ▼
┌──────────────────────────────────────────────────────────┐
│                   CI Pipeline (GitHub Actions / Jenkins)  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Stage 1: Build                                          │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Checkout code                                 │     │
│  │ • Install dependencies (npm ci)                │     │
│  │ • Build application                             │     │
│  │ • Version tagging                               │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 2: Code Quality                                   │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Linting (ESLint)                             │     │
│  │ • Code formatting (Prettier)                   │     │
│  │ • Code complexity analysis                     │     │
│  │ • Duplicate detection                          │     │
│  │ Quality Gate: Must pass                         │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 3: Security Scanning                              │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Dependency vulnerability scan (npm audit)    │     │
│  │ • SAST (Snyk, SonarQube)                       │     │
│  │ • Secret detection (GitGuardian)               │     │
│  │ • License compliance                            │     │
│  │ Security Gate: No critical/high vulnerabilities│     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 4: Testing                                        │
│  ┌────────────────────────────────────────────────┘     │
│  │ • Unit tests (Jest) - Coverage >70%            │     │
│  │ • Integration tests                             │     │
│  │ • API contract tests                            │     │
│  │ • Coverage report generation                    │     │
│  │ Test Gate: All tests must pass                  │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 5: Build Artifacts                                │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Docker image build                           │     │
│  │ • Image scanning (Trivy, Clair)               │     │
│  │ • Sign image (Cosign)                          │     │
│  │ • Push to registry (ECR, Docker Hub)           │     │
│  └────────────────────────────────────────────────┘     │
└───────────────────────┬──────────────────────────────────┘
                        │
                        │ Artifacts ready
                        ▼
┌──────────────────────────────────────────────────────────┐
│                   CD Pipeline (ArgoCD / Spinnaker)        │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Stage 6: Deploy to Staging                              │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Deploy to staging environment                │     │
│  │ • Run smoke tests                               │     │
│  │ • Database migrations (with rollback)          │     │
│  │ • Integration tests                             │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 7: Automated Testing (Staging)                    │
│  ┌────────────────────────────────────────────────┐     │
│  │ • E2E tests (Cypress, Playwright)              │     │
│  │ • Performance tests (k6, JMeter)               │     │
│  │ • Security tests (DAST - OWASP ZAP)            │     │
│  │ • Load tests                                    │     │
│  │ Gate: All tests pass + performance SLA met      │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 8: Manual Approval (Production)                   │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Deployment approval required                 │     │
│  │ • Change ticket validation                      │     │
│  │ • Rollback plan verified                        │     │
│  │ • Approvers: Tech Lead + DevOps                 │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 9: Production Deployment                          │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Blue-Green deployment                         │     │
│  │ • Canary release (10% → 50% → 100%)            │     │
│  │ • Health checks monitoring                      │     │
│  │ • Automated rollback on failure                 │     │
│  └────────────────────────────────────────────────┘     │
│                         │                                 │
│                         ▼                                 │
│  Stage 10: Post-Deployment                               │
│  ┌────────────────────────────────────────────────┐     │
│  │ • Smoke tests in production                    │     │
│  │ • Monitor metrics (5 min)                      │     │
│  │ • Alert stakeholders                            │     │
│  │ • Update documentation                          │     │
│  └────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

#### Pipeline Quality Gates

| Stage | Gate Criteria | Action on Failure |
|-------|---------------|-------------------|
| Code Quality | Lint pass, No code smells | Block merge |
| Security Scan | No critical/high vulnerabilities | Block deployment |
| Unit Tests | >70% coverage, All pass | Block deployment |
| Integration Tests | All pass | Block staging deployment |
| Performance Tests | Meet SLA (p95 < 500ms) | Block production |
| Manual Approval | Approved by 2+ reviewers | Hold deployment |

---

### Infrastructure as Code

```
Infrastructure Stack:

infrastructure/
├── terraform/                 # Infrastructure provisioning
│   ├── environments/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   ├── modules/
│   │   ├── vpc/
│   │   ├── compute/
│   │   ├── database/
│   │   └── monitoring/
│   └── main.tf
│
├── kubernetes/                # Container orchestration
│   ├── deployments/
│   │   ├── api-deployment.yaml
│   │   └── frontend-deployment.yaml
│   ├── services/
│   ├── configmaps/
│   └── secrets/
│
├── ansible/                   # Configuration management
│   ├── playbooks/
│   ├── roles/
│   └── inventory/
│
└── docker/                    # Containerization
    ├── Dockerfile.api
    ├── Dockerfile.frontend
    └── docker-compose.yml
```

---

## Disaster Recovery & Business Continuity

### Business Continuity Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                  BUSINESS CONTINUITY PLAN                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Recovery Objectives:                                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  RTO (Recovery Time Objective):      < 1 hour          │    │
│  │  RPO (Recovery Point Objective):     < 15 minutes      │    │
│  │  MTTR (Mean Time To Recovery):       < 30 minutes      │    │
│  │  Target Availability:                99.9% (8.76 hrs)  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Backup Strategy

#### Backup Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BACKUP INFRASTRUCTURE                        │
└─────────────────────────────────────────────────────────────────┘

Primary Data Center (Region 1)
┌────────────────────────────────────────┐
│  Production Database                   │
│  ┌──────────────────────────────────┐ │
│  │  PostgreSQL Primary              │ │
│  │  • Continuous WAL archiving      │ │
│  │  • Point-in-time recovery (PITR)│ │
│  └──────────┬───────────────────────┘ │
└─────────────┼──────────────────────────┘
              │
              │ Real-time replication
              ▼
┌─────────────────────────────────────────────────────────┐
│               BACKUP LAYERS                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Layer 1: Hot Standby (Synchronous Replication)         │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Real-time replication (streaming)           │    │
│  │  • RPO: ~0 seconds                             │    │
│  │  • RTO: < 5 minutes                            │    │
│  │  • Location: Same region, different AZ         │    │
│  │  • Automatic failover enabled                  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Layer 2: Automated Snapshots                           │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Full backup: Daily at 02:00 UTC             │    │
│  │  • Incremental: Every 6 hours                  │    │
│  │  • Retention: 30 days                          │    │
│  │  • Storage: Encrypted S3 (different region)    │    │
│  │  • RPO: < 6 hours                              │    │
│  │  • RTO: < 1 hour                               │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Layer 3: Long-term Archive                             │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Weekly full backups                         │    │
│  │  • Retention: 7 years (compliance)             │    │
│  │  • Storage: Glacier / Cold storage             │    │
│  │  • Encryption: AES-256                         │    │
│  │  • Immutable backups (WORM)                    │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Layer 4: Disaster Recovery (Asynchronous Replication)  │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Cross-region replication                    │    │
│  │  • RPO: < 15 minutes                           │    │
│  │  • RTO: < 1 hour                               │    │
│  │  • Location: Secondary region (geo-redundant)  │    │
│  │  • Manual failover (planned)                   │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

#### Backup Schedule Matrix

| Backup Type | Frequency | Retention | Storage Location | Encryption | Tested |
|-------------|-----------|-----------|------------------|------------|---------|
| **Hot Standby** | Real-time | N/A (live) | Same region, diff AZ | TLS | Monthly |
| **Automated Snapshot** | Daily | 30 days | S3 (cross-region) | AES-256 | Weekly |
| **Incremental** | 6 hours | 7 days | S3 (cross-region) | AES-256 | Weekly |
| **Weekly Full** | Weekly | 7 years | Glacier | AES-256 | Quarterly |
| **Transaction Logs** | Continuous | 30 days | S3 | AES-256 | Daily |
| **Application Config** | On change | 90 days | Git + S3 | AES-256 | On deploy |

#### Backup Validation Process

```
Automated Backup Testing (Weekly):

1. Select random backup ────> Restore to test environment
                                      │
                                      ▼
2. Verify data integrity ────> Run consistency checks
                                      │
                                      ▼
3. Test application ──────────> Connect app to restored DB
                                      │
                                      ▼
4. Validate functionality ────> Run test suite
                                      │
                                      ▼
5. Document results ──────────> Update backup success log
                                      │
                                      ▼
6. Alert on failure ──────────> Notify DevOps team
```

---

### Recovery Procedures

#### Disaster Recovery Scenarios

| Scenario | Impact | Recovery Procedure | RTO | RPO |
|----------|--------|-------------------|-----|-----|
| **Single Server Failure** | Low | Auto-failover to standby | < 5 min | 0 |
| **Database Corruption** | Medium | Restore from latest snapshot | < 30 min | < 6 hrs |
| **Availability Zone Failure** | Medium | Failover to another AZ | < 15 min | < 15 min |
| **Region Failure** | High | Activate DR site | < 1 hour | < 15 min |
| **Data Center Disaster** | Severe | Full DR activation | < 4 hours | < 1 hour |
| **Ransomware Attack** | Critical | Restore from immutable backup | < 2 hours | < 24 hours |
| **Human Error (Delete)** | Variable | Point-in-time recovery | < 1 hour | Minimal |

#### Recovery Workflow

```
Incident Detected
       │
       ▼
┌──────────────────┐
│ Alert Generated  │
│ • Automated      │
│ • Manual report  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│ Assess Impact            │
│ • Scope of failure       │
│ • Affected systems       │
│ • Data loss estimation   │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Activate DRP             │
│ • Notify stakeholders    │
│ • Assemble recovery team │
│ • Begin documentation    │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Execute Recovery         │
│ ┌────────────────────┐   │
│ │ 1. Stop services   │   │
│ │ 2. Restore backup  │   │
│ │ 3. Verify integrity│   │
│ │ 4. Test connection │   │
│ │ 5. Restart services│   │
│ │ 6. Smoke tests     │   │
│ └────────────────────┘   │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Validation               │
│ • Data consistency       │
│ • Application functional │
│ • Performance check      │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Resume Operations        │
│ • Gradual traffic ramp   │
│ • Monitor closely        │
│ • User communication     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Post-Incident Review     │
│ • Root cause analysis    │
│ • Lessons learned        │
│ • Update procedures      │
│ • Preventive measures    │
└──────────────────────────┘
```

---

### Business Continuity Plan

#### Critical Business Functions

| Function | RTO | RPO | Recovery Priority | Alternative Process |
|----------|-----|-----|------------------|---------------------|
| User Authentication | 15 min | 0 | P1 - Critical | N/A - System dependent |
| Order Placement | 1 hour | 15 min | P1 - Critical | Manual order taking (phone) |
| Payment Processing | 1 hour | 0 | P1 - Critical | Offline payment recording |
| Food Catalog Browse | 4 hours | 6 hours | P2 - High | Cached static catalog |
| Order History | 24 hours | 24 hours | P3 - Medium | Email confirmations |
| User Registration | 24 hours | 24 hours | P4 - Low | Queue for later processing |

#### Continuity Testing Schedule

```
Testing Frequency:

┌────────────────────────────────────────────────────────┐
│  Monthly:                                              │
│  • Backup restoration test                            │
│  • Failover to hot standby                            │
│  • Application recovery drill                         │
├────────────────────────────────────────────────────────┤
│  Quarterly:                                            │
│  • Full DR site activation                            │
│  • Cross-region failover                              │
│  • Long-term backup restoration                       │
│  • Load balancer failover                             │
├────────────────────────────────────────────────────────┤
│  Annually:                                             │
│  • Complete disaster simulation                       │
│  • Multi-component failure                            │
│  • Communication plan validation                      │
│  • Third-party recovery service test                  │
└────────────────────────────────────────────────────────┘
```

---

## Compliance & Audit Framework

### Compliance Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLIANCE FRAMEWORK                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │     GDPR     │  │    SOC 2     │  │  ISO 27001   │         │
│  │   (EU Data)  │  │  (Security)  │  │  (InfoSec)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                ┌───────────▼───────────┐                        │
│                │  Unified Compliance    │                        │
│                │  Control Framework     │                        │
│                └───────────┬───────────┘                        │
│                            │                                     │
│              ┌─────────────┴─────────────┐                      │
│              │                           │                      │
│     ┌────────▼────────┐         ┌───────▼────────┐            │
│     │  Technical      │         │  Administrative│            │
│     │  Controls       │         │  Controls      │            │
│     └─────────────────┘         └────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Audit Logging Architecture

#### Comprehensive Audit Trail

```
┌─────────────────────────────────────────────────────────────────┐
│                      AUDIT LOGGING SYSTEM                        │
└─────────────────────────────────────────────────────────────────┘

Application Layer
┌────────────────────────────────────────┐
│  Audit Events Generated:               │
│  ┌──────────────────────────────────┐ │
│  │ • User authentication            │ │
│  │ • Data access (read/write)       │ │
│  │ • Permission changes             │ │
│  │ • Configuration updates          │ │
│  │ • API calls                      │ │
│  │ • Failed access attempts         │ │
│  │ • Admin actions                  │ │
│  └──────────┬───────────────────────┘ │
└─────────────┼──────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Audit Log Middleware                   │
│  ┌───────────────────────────────────┐ │
│  │  Capture context:                 │ │
│  │  • User ID & IP address           │ │
│  │  • Timestamp (UTC)                │ │
│  │  • Action performed               │ │
│  │  • Resource accessed              │ │
│  │  • Result (success/failure)       │ │
│  │  • Before/After state             │ │
│  │  • Request/Response data          │ │
│  └───────────────┬───────────────────┘ │
└──────────────────┼──────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│  Log Enrichment & Formatting             │
│  • Add correlation ID                    │
│  • Add session ID                        │
│  • Structure as JSON                     │
│  • Add geolocation data                  │
│  • Classify sensitivity level            │
└───────────────┬──────────────────────────┘
                │
                ▼
┌──────────────────────────────────────────┐
│  Log Storage (Immutable)                 │
│  ┌────────────────────────────────────┐ │
│  │  Primary: Elasticsearch            │ │
│  │  • Real-time indexing              │ │
│  │  • Retention: 90 days              │ │
│  │  • Searchable                      │ │
│  │                                    │ │
│  │  Archive: S3 (append-only)         │ │
│  │  • Compressed & encrypted          │ │
│  │  • Retention: 7 years              │ │
│  │  • Immutable (WORM)                │ │
│  │  • Tamper-proof                    │ │
│  └────────────────────────────────────┘ │
└───────────────┬──────────────────────────┘
                │
                ▼
┌──────────────────────────────────────────┐
│  Audit Analytics & Reporting             │
│  • Suspicious activity detection         │
│  • Compliance reporting                  │
│  • Trend analysis                        │
│  • Automated alerts                      │
└──────────────────────────────────────────┘
```

#### Audit Event Schema

```javascript
{
  "event_id": "evt_20260211_abc123",
  "timestamp": "2026-02-11T14:30:00.000Z",
  "event_type": "DATA_ACCESS",
  "severity": "INFO",
  "actor": {
    "user_id": "usr_123",
    "email": "user@example.com",
    "role": "customer",
    "ip_address": "203.0.113.42",
    "user_agent": "Mozilla/5.0...",
    "session_id": "sess_xyz789"
  },
  "action": {
    "type": "READ",
    "resource": "orders",
    "resource_id": "ord_456",
    "endpoint": "/api/orders/456",
    "method": "GET"
  },
  "result": {
    "status": "SUCCESS",
    "http_code": 200,
    "duration_ms": 45
  },
  "context": {
    "correlation_id": "corr_def456",
    "trace_id": "trace_ghi789",
    "environment": "production",
    "region": "us-east-1"
  },
  "data_classification": "CONFIDENTIAL",
  "retention_class": "LONG_TERM",
  "compliance_tags": ["GDPR", "SOC2"]
}
```

#### Auditable Events

| Event Category | Examples | Retention | Real-time Alert |
|----------------|----------|-----------|-----------------|
| **Authentication** | Login, logout, password reset, MFA | 7 years | Failed attempts |
| **Authorization** | Permission grants, role changes | 7 years | Privilege escalation |
| **Data Access** | View, create, update, delete | 7 years | Bulk access |
| **Configuration** | System settings, security config | 7 years | All changes |
| **Administrative** | User management, system admin | 7 years | All actions |
| **Security Events** | Firewall blocks, intrusion attempts | 7 years | All events |
| **Compliance** | Data export, deletion requests | 7 years | All events |

---

### Compliance Requirements

#### GDPR Compliance

```
┌─────────────────────────────────────────────────────────────────┐
│                  GDPR COMPLIANCE CONTROLS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Right to Access (Art. 15)                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Implementation:                                        │    │
│  │  • GET /api/users/:id/data-export                      │    │
│  │  • Generate comprehensive data report                   │    │
│  │  • Include all personal data                           │    │
│  │  • Response within 30 days                             │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Right to Rectification (Art. 16)                               │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Implementation:                                        │    │
│  │  • PUT /api/users/:id                                  │    │
│  │  • Allow users to update their data                    │    │
│  │  • Audit log all changes                               │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Right to Erasure (Art. 17)                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Implementation:                                        │    │
│  │  • DELETE /api/users/:id/gdpr-delete                   │    │
│  │  • Anonymize data (keep order history)                 │    │
│  │  • Delete identifiable information                      │    │
│  │  • Retain transaction logs (7 years - legal)           │    │
│  │  • Cascade deletion where appropriate                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Right to Data Portability (Art. 20)                            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Implementation:                                        │    │
│  │  • Export in machine-readable format (JSON/CSV)        │    │
│  │  • Include all user-provided data                       │    │
│  │  • Structured and commonly used format                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Right to Object (Art. 21)                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Implementation:                                        │    │
│  │  • Marketing opt-out option                            │    │
│  │  • Profiling restrictions                               │    │
│  │  • Purpose-specific consent                            │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Data Protection Impact Assessment (Art. 35)                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • Risk assessment completed                           │    │
│  │  • Privacy by design implemented                       │    │
│  │  • Regular DPIA reviews                                │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Breach Notification (Art. 33-34)                               │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • Detection within 24 hours                           │    │
│  │  • Authority notification within 72 hours              │    │
│  │  • User notification if high risk                      │    │
│  │  • Incident response plan documented                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### SOC 2 Type II Controls

| Control Domain | Control | Implementation | Evidence |
|----------------|---------|----------------|----------|
| **CC6.1 - Logical Access** | User authentication | JWT, MFA, password policies | Auth logs, config files |
| **CC6.2 - User Access** | Authorization controls | RBAC, least privilege | Access matrix, audit logs |
| **CC6.3 - Access Removal** | Timely deprovisioning | Automated user removal | Deactivation logs |
| **CC6.6 - Encryption** | Data protection | TLS 1.3, AES-256, bcrypt | SSL cert, encryption config |
| **CC6.7 - Access Restriction** | Network segmentation | Security groups, firewalls | Network diagrams, rules |
| **CC7.2 - Change Detection** | System monitoring | IDS/IPS, file integrity | Monitoring dashboards |
| **CC7.3 - Incident Response** | Security incidents | IR plan, escalation | Incident reports |
| **CC8.1 - Change Management** | Change control | Approval workflow, testing | Change tickets, test results |
| **CC9.2 - Risk Assessment** | Periodic assessment | Annual risk reviews | Risk register |

---

###Data Privacy & GDPR

#### Data Subject Rights Implementation

```
User Data Management Portal:

┌─────────────────────────────────────────┐
│  User Privacy Dashboard                 │
├─────────────────────────────────────────┤
│                                          │
│  📊 My Data                              │
│  ├─ View all collected data             │
│  ├─ Download data (JSON/CSV)            │
│  └─ Data usage transparency             │
│                                          │
│  ✏️  Update Information                  │
│  ├─ Edit profile                        │
│  ├─ Update preferences                  │
│  └─ Correct inaccuracies                │
│                                          │
│  🚫 Consent Management                   │
│  ├─ Marketing communications (ON/OFF)   │
│  ├─ Analytics tracking (ON/OFF)         │
│  ├─ Third-party sharing (ON/OFF)        │
│  └─ Cookie preferences                  │
│                                          │
│  🗑️  Delete My Account                   │
│  ├─ Request data deletion               │
│  ├─ Export before deletion              │
│  └─ Confirmation required               │
│                                          │
│  📄 Privacy Information                  │
│  ├─ Privacy policy                      │
│  ├─ Data processing activities          │
│  └─ Contact DPO                         │
│                                          │
└─────────────────────────────────────────┘
```

#### Data Retention Policy

| Data Type | Retention Period | Reason | Deletion Method |
|-----------|------------------|--------|-----------------|
| User account data | Until account deletion | Service provision | Hard delete + anonymization |
| Order history | 7 years after order | Tax/legal compliance | Archive after 2 years |
| Payment information | Not stored (tokenized) | PCI compliance | N/A (tokens only) |
| Session logs | 90 days | Security analysis | Automated purge |
| Audit logs | 7 years | Compliance | Archived to cold storage |
| Analytics data | 2 years | Business analysis | Aggregated & anonymized |
| Backup data | 30 days (operational) | Disaster recovery | Automatic rotation |
| backup data (archival) | 7 years | Compliance | Encrypted cold storage |

---

## Risk Management

### Risk Assessment Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│                    RISK ASSESSMENT MATRIX                        │
│                                                                  │
│                           LIKELIHOOD                             │
│                  Rare  Unlikely  Possible  Likely  Certain      │
│                    1      2        3        4        5           │
│                  ────────────────────────────────────           │
│  IMPACT       │                                                  │
│               │                                                  │
│  Catastrophic │   M      H        E        E        E           │
│      5        │                                                  │
│               │                                                  │
│  Major        │   L      M        H        E        E           │
│      4        │                                                  │
│               │                                                  │
│  Moderate     │   L      M        M        H        E           │
│      3        │                                                  │
│               │                                                  │
│  Minor        │   L      L        M        M        H           │
│      2        │                                                  │
│               │                                                  │
│  Negligible   │   L      L        L        M        M           │
│      1        │                                                  │
│                                                                  │
│  Legend:  L = Low Risk    M = Medium Risk    H = High Risk      │
│           E = Extreme Risk                                       │
└─────────────────────────────────────────────────────────────────┘
```

#### Identified Risks & Mitigation

| Risk ID | Risk Description | Likelihood | Impact | Risk Level | Mitigation Strategy | Owner |
|---------|-----------------|------------|--------|------------|---------------------|-------|
| R-001 | Database breach | 2 - Unlikely | 5 - Catastrophic | **HIGH** | Encryption, access controls, monitoring | Security Team |
| R-002 | DDoS attack | 4 - Likely | 3 - Moderate | **HIGH** | WAF, rate limiting, CDN | DevOps |
| R-003 | Data loss | 2 - Unlikely | 5 - Catastrophic | **HIGH** | Backups, replication, DR plan | DevOps |
| R-004 | Unauthorized access | 3 - Possible | 4 - Major | **HIGH** | MFA, RBAC, audit logging | Security Team |
| R-005 | SQL Injection | 2 - Unlikely | 4 - Major | **MEDIUM** | Parameterized queries, WAF | Dev Team |
| R-006 | API abuse | 4 - Likely | 2 - Minor | **MEDIUM** | Rate limiting, API keys | Dev Team |
| R-007 | Insider threat | 2 - Unlikely | 4 - Major | **MEDIUM** | Access controls, audit logs | Security Team |
| R-008 | Third-party failure | 3 - Possible | 3 - Moderate | **MEDIUM** | Vendor SLAs, redundancy | DevOps |
| R-009 | Compliance violation | 2 - Unlikely | 4 - Major | **MEDIUM** | Regular audits, training | Compliance |
| R-010 | Service outage | 3 - Possible | 4 - Major | **HIGH** | HA architecture, monitoring | DevOps |

---

### Threat Modeling

#### STRIDE Threat Model

```
┌─────────────────────────────────────────────────────────────────┐
│                      STRIDE ANALYSIS                             │
├──────────────┬──────────────────────────────────────────────────┤
│  Threat      │  Identified Threats & Controls                   │
├──────────────┼──────────────────────────────────────────────────┤
│  Spoofing    │  Threats:                                        │
│  Identity    │  • Fake user accounts                            │
│              │  • Session hijacking                             │
│              │  • Token theft                                   │
│              │  Controls:                                       │
│              │  ✓ JWT with short expiration                     │
│              │  ✓ MFA (planned)                                │
│              │  ✓ HTTPS only                                    │
│              │  ✓ IP-based anomaly detection                    │
├──────────────┼──────────────────────────────────────────────────┤
│  Tampering   │  Threats:                                        │
│  with Data   │  • Database manipulation                         │
│              │  • Request tampering                             │
│              │  • Log alteration                                │
│              │  Controls:                                       │
│              │  ✓ Parameterized queries                        │
│              │  ✓ Input validation                             │
│              │  ✓ Immutable audit logs                         │
│              │  ✓ Database integrity constraints               │
├──────────────┼──────────────────────────────────────────────────┤
│  Repudiation │  Threats:                                        │
│              │  • Deny performing action                        │
│              │  • Claim unauthorized access                     │
│              │  Controls:                                       │
│              │  ✓ Comprehensive audit logging                   │
│              │  ✓ Digital signatures (JWT)                     │
│              │  ✓ Non-repudiation logs                         │
│              │  ✓ Timestamp all transactions                    │
├──────────────┼──────────────────────────────────────────────────┤
│  Information │  Threats:                                        │
│  Disclosure  │  • Sensitive data exposure                       │
│              │  • Man-in-the-middle attacks                     │
│              │  • Database leaks                                │
│              │  Controls:                                       │
│              │  ✓ TLS 1.3 encryption                           │
│              │  ✓ Database encryption                          │
│              │  ✓ Secrets management                           │
│              │  ✓ Least privilege access                       │
├──────────────┼──────────────────────────────────────────────────┤
│  Denial of   │  Threats:                                        │
│  Service     │  • DDoS attacks                                  │
│              │  • Resource exhaustion                           │
│              │  • Database connection pool exhaustion           │
│              │  Controls:                                       │
│              │  ✓ Rate limiting                                │
│              │  ✓ WAF / DDoS protection                        │
│              │  ✓ Connection pooling                           │
│              │  ✓ Auto-scaling                                 │
├──────────────┼──────────────────────────────────────────────────┤
│  Elevation   │  Threats:                                        │
│  of          │  • Privilege escalation                          │
│  Privilege   │  • Unauthorized admin access                     │
│              │  • Broken access control                         │
│              │  Controls:                                       │
│              │  ✓ RBAC implementation                          │
│              │  ✓ Principle of least privilege                 │
│              │  ✓ Authorization checks                         │
│              │  ✓ Admin action logging                         │
└──────────────┴──────────────────────────────────────────────────┘
```

---

### Security Controls

#### Control Effectiveness Tracking

| Control ID | Control Name | Type | Status | Effectiveness | Last Tested | Next Review |
|------------|-------------|------|--------|---------------|-------------|-------------|
| SC-001 | TLS Encryption | Preventive | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-002 | JWT Authentication | Preventive | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-003 | Input Validation | Preventive | 🔄 Partial | Medium | 2026-02-01 | 2026-03-01 |
| SC-004 | Audit Logging | Detective | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-005 | Database Backups | Corrective | ✅ Active | High | 2026-02-10 | 2026-03-10 |
| SC-006 | Rate Limiting | Preventive | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-007 | RBAC | Preventive | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-008 | WAF | Preventive | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-009 | IDS/IPS | Detective | ⏳ Planned | N/A | N/A | 2026-03-01 |
| SC-010 | Vulnerability Scanning | Detective | ⏳ Planned | N/A | N/A | 2026-03-01 |

---

## Access Control & Identity Management

### Identity Management Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  IDENTITY MANAGEMENT SYSTEM                      │
└─────────────────────────────────────────────────────────────────┘

User Registration & Onboarding
┌────────────────────────────────┐
│  1. User Registration          │
│     • Email validation         │
│     • Password strength check  │
│     • CAPTCHA verification     │
│     • Terms acceptance         │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│  2. Account Verification       │
│     • Email confirmation       │
│     • Phone verification (opt) │
│     • Identity documents (opt) │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│  3. Profile Setup              │
│     • Basic information        │
│     • Preferences              │
│     • Privacy settings         │
│     • MFA enrollment (future)  │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│  4. Role Assignment            │
│     • Default: Customer        │
│     • Chef: Upon application   │
│     • Admin: Manual approval   │
└────────────────────────────────┘

Access Management Lifecycle
┌────────────────────────────────────────────────────┐
│  User Access Lifecycle                             │
│                                                     │
│  Request → Review → Approve → Provision → Monitor  │
│     ↑                                        │      │
│     └────────────── Revoke ──────────────────┘      │
│                                                     │
│  Automated Reviews:                                │
│  • Quarterly access reviews                       │
│  • Inactive user deactivation (90 days)           │
│  • Privilege escalation monitoring                │
└────────────────────────────────────────────────────┘
```

### Access Control Matrix

```
┌─────────────────────────────────────────────────────────────────┐
│              DETAILED ACCESS CONTROL MATRIX                      │
├────────────┬────────┬────────┬────────┬────────┬────────────────┤
│  Resource  │ Public │Customer│  Chef  │  Admin │  System        │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ USERS                                                            │
│ /register  │   W    │   -    │   -    │   -    │   -            │
│ /login     │   W    │   -    │   -    │   -    │   -            │
│ /:id       │   -    │  R(own)│  R(own)│  R,W   │   -            │
│ /list      │   -    │   -    │   -    │  R     │   -            │
│ /delete    │   -    │  D(own)│  D(own)│  D     │   -            │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ FOOD ITEMS                                                       │
│ /list      │   R    │   R    │   R    │  R     │   -            │
│ /:id       │   R    │   R    │   R    │  R,W,D │   -            │
│ /create    │   -    │   -    │   W    │  W     │   -            │
│ /update    │   -    │   -    │  W(own)│  W     │   -            │
│ /delete    │   -    │   -    │  D(own)│  D     │   -            │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ ORDERS                                                           │
│ /create    │   -    │   W    │   -    │  W     │   -            │
│ /:id       │   -    │  R(own)│ R(assoc│  R     │   -            │
│ /list      │   -    │  R(own)│ R(assoc│  R     │   -            │
│ /update    │   -    │   -    │ W(stat)│  W     │   -            │
│ /cancel    │   -    │  W(own)│   -    │  W     │   -            │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ SETTINGS                                                         │
│ /app       │   -    │   -    │   -    │  R,W   │   -            │
│ /security  │   -    │   -    │   -    │  R,W   │  R,W           │
├────────────┼────────┼────────┼────────┼────────┼────────────────┤
│ REPORTS                                                          │
│ /dashboard │   -    │  R(own)│  R(own)│  R     │   -            │
│ /analytics │   -    │   -    │  R(own)│  R     │   -            │
│ /audit     │   -    │   -    │   -    │  R     │  R,W           │
└────────────┴────────┴────────┴────────┴────────┴────────────────┘

Legend:
  R = Read    W = Write    D = Delete
  (own) = Own resources only
  (assoc) = Associated resources
  (stat) = Status updates only
  - = No access
```

---

## Incident Response

### Incident Response Plan

```
┌─────────────────────────────────────────────────────────────────┐
│                 INCIDENT RESPONSE LIFECYCLE                      │
└─────────────────────────────────────────────────────────────────┘

1. PREPARATION
┌──────────────────────────────────────────┐
│ • IR team identified & trained           │
│ • Tools & resources ready                │
│ • Contact lists maintained               │
│ • Playbooks documented                   │
│ • Regular drills conducted               │
└────────────┬─────────────────────────────┘
             │
             ▼
2. DETECTION & ANALYSIS
┌──────────────────────────────────────────┐
│ • Automated monitoring alerts            │
│ • User reports                           │
│ • Anomaly detection                      │
│ • Log analysis                           │
│                                          │
│ Incident Classification:                │
│ • P1: Critical (< 15 min response)       │
│ • P2: High (< 1 hour)                    │
│ • P3: Medium (< 4 hours)                 │
│ • P4: Low (< 24 hours)                   │
└────────────┬─────────────────────────────┘
             │
             ▼
3. CONTAINMENT
┌──────────────────────────────────────────┐
│ Short-term:                              │
│ • Isolate affected systems               │
│ • Block malicious IPs                    │
│ • Disable compromised accounts           │
│                                          │
│ Long-term:                               │
│ • Patch vulnerabilities                  │
│ • Update security controls               │
│ • Implement additional monitoring        │
└────────────┬─────────────────────────────┘
             │
             ▼
4. ERADICATION
┌──────────────────────────────────────────┐
│ • Remove malware/threats                 │
│ • Close security gaps                    │
│ • Reset compromised credentials          │
│ • Update security rules                  │
└────────────┬─────────────────────────────┘
             │
             ▼
5. RECOVERY
┌──────────────────────────────────────────┐
│ • Restore from clean backups             │
│ • Verify system integrity                │
│ • Gradual service restoration            │
│ • Enhanced monitoring                    │
│ • User communication                     │
└────────────┬─────────────────────────────┘
             │
             ▼
6. LESSONS LEARNED
┌──────────────────────────────────────────┐
│ • Post-incident review (within 48 hrs)   │
│ • Root cause analysis                    │
│ • Timeline documentation                 │
│ • Update IR procedures                   │
│ • Preventive measures                    │
│ • Training updates                       │
└──────────────────────────────────────────┘
```

### Incident Response Team

| Role | Responsibilities | Contact | Backup |
|------|-----------------|---------|--------|
| **Incident Commander** | Overall coordination, communication | On-call rotation | CTO |
| **Security Lead** | Security analysis, threat assessment | Security Team | Senior Security Engineer |
| **DevOps Lead** | System recovery, infrastructure | DevOps Team | Senior DevOps Engineer |
| **Communications Lead** | Stakeholder communication | Product Manager | Marketing Director |
| **Legal Counsel** | Legal implications, compliance | Legal Team | External Counsel |

### Escalation Matrix

```
Severity Levels & Escalation:

P1 - CRITICAL (Data Breach, System-wide Outage)
├─ Detection → Immediate alert
├─ 0-15 min: Incident Commander notified
├─ 15-30 min: Executive team notified
├─ 30-60 min: Board notification (if needed)
└─ Continuous updates every 30 minutes

P2 - HIGH (Partial Outage, Security Incident)
├─ Detection → Alert within 15 min
├─ 0-1 hour: Incident Commander assigned
├─ 1-4 hours: Management notified
└─ Updates every 2 hours

P3 - MEDIUM (Performance Degradation)
├─ Detection → Alert within 1 hour
├─ 0-4 hours: Team assigned
└─ Daily updates

P4 - LOW (Minor Issues)
├─ Detection → Logged
├─ 0-24 hours: Reviewed
└─ Included in weekly reports
```

---

## Change Management

### Change Management Process

```
┌─────────────────────────────────────────────────────────────────┐
│                  CHANGE MANAGEMENT WORKFLOW                      │
└─────────────────────────────────────────────────────────────────┘

1. CHANGE REQUEST
┌──────────────────────────────────────┐
│ • Requester submits change ticket   │
│ • Description & justification       │
│ • Impact assessment                 │
│ • Rollback plan required            │
└────────────┬─────────────────────────┘
             │
             ▼
2. CLASSIFICATION
┌──────────────────────────────────────┐
│ Standard Change                      │
│ • Pre-approved changes               │
│ • Low risk, well-documented          │
│ • Examples: Code deployments,        │
│   config updates                     │
│ Approval: Automated                  │
│                                      │
│ Normal Change                        │
│ • Medium risk                        │
│ • Examples: Feature releases,        │
│   minor infrastructure changes       │
│ Approval: Change Advisory Board      │
│                                      │
│ Emergency Change                     │
│ • Critical fixes                     │
│ • Security patches                   │
│ • System outage resolution           │
│ Approval: Emergency CAB              │
└────────────┬─────────────────────────┘
             │
             ▼
3. REVIEW & APPROVAL
┌──────────────────────────────────────┐
│ Change Advisory Board (CAB):        │
│ • Technical Lead                     │
│ • DevOps Lead                        │
│ • Security Representative            │
│ • Product Owner                      │
│                                      │
│ Review Criteria:                     │
│ ✓ Technical feasibility              │
│ ✓ Security impact                    │
│ ✓ Resource availability              │
│ ✓ Testing completeness               │
│ ✓ Rollback plan                      │
└────────────┬─────────────────────────┘
             │
             ▼
4. SCHEDULING
┌──────────────────────────────────────┐
│ Change Windows:                      │
│ • Low impact: Business hours         │
│ • Medium impact: After hours         │
│ • High impact: Maintenance window    │
│                                      │
│ Blackout Periods:                    │
│ • Peak business periods              │
│ • Holiday seasons                    │
│ • During other major changes         │
└────────────┬─────────────────────────┘
             │
             ▼
5. IMPLEMENTATION
┌──────────────────────────────────────┐
│ • Execute change in staging first    │
│ • Validation testing                 │
│ • Production deployment              │
│ • Monitoring & verification          │
│ • Documentation update               │
└────────────┬─────────────────────────┘
             │
             ├─ SUCCESS → Continue
             │
             └─ FAILURE → Rollback
                    │
                    ▼
                ┌────────────────────┐
                │ Automatic Rollback │
                │ • Restore previous │
                │ • Notify team      │
                │ • Incident report  │
                └────────────────────┘
             │
             ▼
6. POST-IMPLEMENTATION REVIEW
┌──────────────────────────────────────┐
│ • Verify change objectives met       │
│ • Document lessons learned           │
│ • Update change records              │
│ • Close change ticket                │
└──────────────────────────────────────┘
```

### Change Risk Assessment

| Change Type | Examples | Risk | Testing Required | Approval |
|-------------|----------|------|------------------|----------|
| **Low Risk** | Documentation, UI text | Low | Code review | Auto-approved |
| **Medium Risk** | New features, minor DB changes | Medium | Full test suite | CAB approval |
| **High Risk** | Architecture changes, major migrations | High | Full testing + staging | CAB + Executive |
| **Emergency** | Security patches, critical fixes | Variable | Minimal (post-fix testing) | Emergency CAB |

---

## Capacity Planning

### Capacity Planning Framework

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPACITY PLANNING CYCLE                       │
└─────────────────────────────────────────────────────────────────┘

1. BASELINE MEASUREMENT
┌──────────────────────────────────────┐
│ Current Capacity Metrics:            │
│ • CPU utilization                    │
│ • Memory usage                       │
│ • Network bandwidth                  │
│ • Storage (DB & files)               │
│ • API request rate                   │
│ • Concurrent users                   │
│ • Database connections               │
│ • Response times                     │
└────────────┬─────────────────────────┘
             │
             ▼
2. GROWTH PROJECTION
┌──────────────────────────────────────┐
│ Historical Analysis:                 │
│ • User growth rate                   │
│ • Transaction volume trends          │
│ • Seasonal patterns                  │
│ • Feature adoption rates             │
│                                      │
│ Forecasting:                         │
│ • 3-month projections                │
│ • 6-month projections                │
│ • 12-month projections               │
└────────────┬─────────────────────────┘
             │
             ▼
3. CAPACITY REQUIREMENTS
┌──────────────────────────────────────┐
│ Infrastructure Sizing:               │
│ • Compute resources                  │
│ • Storage requirements               │
│ • Network bandwidth                  │
│ • Database capacity                  │
│                                      │
│ Include headroom:                    │
│ • 30% buffer for normal operations   │
│ • 50% for peak periods               │
└────────────┬─────────────────────────┘
             │
             ▼
4. IMPLEMENTATION
┌──────────────────────────────────────┐
│ • Procure resources                  │
│ • Scale infrastructure               │
│ • Configure auto-scaling             │
│ • Update monitoring thresholds       │
└────────────┬─────────────────────────┘
             │
             ▼
5. MONITORING & ADJUSTMENT
┌──────────────────────────────────────┐
│ • Continuous monitoring              │
│ • Monthly review meetings            │
│ • Adjust forecasts                   │
│ • Optimize resource usage            │
└──────────────────────────────────────┘
```

### Capacity Metrics & Thresholds

| Resource | Current Usage | Warning Threshold | Critical Threshold | Auto-Scale Trigger |
|----------|---------------|-------------------|--------------------|--------------------|
| **CPU** | 45% avg | 70% | 85% | 75% for 5 min |
| **Memory** | 60% avg | 80% | 90% | 85% for 5 min |
| **Database Connections** | 12/20 | 16/20 (80%) | 19/20 (95%) | 15/20 |
| **Disk I/O** | 40% | 70% | 85% | 75% sustained |
| **Network Bandwidth** | 200 Mbps | 700 Mbps | 900 Mbps | 750 Mbps |
| **Database Size** | 5 GB | 50 GB | 80 GB | N/A (planned expansion) |
| **API Request Rate** | 50 req/s | 400 req/s | 480 req/s | 350 req/s |

### Growth Projections

```
Year 1 Capacity Planning (2026):

Q1 (Current):
├─ Users: 1,000
├─ Orders/day: 100
├─ DB Size: 5 GB
├─ API req/s: 50
└─ Servers: 2

Q2 (Projected):
├─ Users: 2,500 (+150%)
├─ Orders/day: 300 (+200%)
├─ DB Size: 15 GB (+200%)
├─ API req/s: 125 (+150%)
└─ Servers: 3 (+1)

Q3 (Projected):
├─ Users: 5,000 (+100%)
├─ Orders/day: 700 (+133%)
├─ DB Size: 35 GB (+133%)
├─ API req/s: 250 (+100%)
└─ Servers: 5 (+2)

Q4 (Projected):
├─ Users: 10,000 (+100%)
├─ Orders/day: 1,500 (+114%)
├─ DB Size: 75 GB (+114%)
├─ API req/s: 500 (+100%)
└─ Servers: 8 (+3)
```

---

## Non-Functional Requirements

Non-functional requirements define the quality attributes, performance characteristics, and constraints of the CookNest system.

### Performance Requirements

| Requirement | Target | Current Status | Priority |
|-------------|--------|----------------|----------|
| API Response Time | < 500ms (95th percentile) | Not measured | High |
| Page Load Time | < 3 seconds | Not measured | High |
| Database Query Time | < 100ms | Not measured | Medium |
| Concurrent Users | Support 100+ | Not tested | Medium |
| Transaction Throughput | 50 orders/minute | Not tested | Low |

#### Performance Targets

1. **API Endpoints**
   - GET /api/foods: < 200ms
   - POST /api/orders: < 500ms
   - GET /api/orders/:id: < 150ms
   - POST /api/users/login: < 300ms

2. **Database Operations**
   - Simple SELECT queries: < 50ms
   - Complex JOIN queries: < 100ms
   - INSERT operations: < 75ms
   - Transaction completion: < 200ms

3. **Frontend Performance**
   - First Contentful Paint (FCP): < 1.5s
   - Time to Interactive (TTI): < 3.5s
   - Largest Contentful Paint (LCP): < 2.5s

---

### Scalability Requirements

| Aspect | Current Capacity | Target Capacity | Scaling Strategy |
|--------|-----------------|-----------------|------------------|
| Concurrent Connections | ~20 (DB pool) | 1,000+ | Connection pooling, load balancing |
| Database Size | Unlimited | < 100GB first year | Pagination, archiving |
| API Requests/sec | Not tested | 500+ | Horizontal scaling, caching |
| File Storage | Not implemented | 50GB | Cloud storage (S3) |

---

### Availability Requirements

| Metric | Target | Implementation |
|--------|--------|----------------|
| Uptime | 99.5% (target) | Health checks, auto-restart |
| Recovery Time Objective (RTO) | < 1 hour | Database backups, deployment automation |
| Recovery Point Objective (RPO) | < 15 minutes | Continuous backups |
| Planned Downtime | < 4 hours/month | Blue-green deployments |

---

### Security Requirements

| Requirement | Implementation Status | Priority |
|-------------|----------------------|----------|
| Authentication | Planned (JWT) | Critical |
| Password Hashing | Planned (bcrypt) | Critical |
| SQL Injection Prevention | Implemented (parameterized queries) | Critical |
| XSS Prevention | Planned (input sanitization) | High |
| CSRF Protection | Not implemented | High |
| HTTPS/TLS | Planned for production | High |
| Rate Limiting | Not implemented | Medium |
| API Key Management | Not implemented | Medium |
| Data Encryption at Rest | Not implemented | Medium |

---

### Reliability Requirements

1. **Error Handling**
   - All API endpoints must handle errors gracefully
   - Standardized error response format
   - Logging all errors with context

2. **Data Integrity**
   - Database transactions for multi-step operations
   - Foreign key constraints enforced
   - Validation at multiple layers (client, server, database)

3. **Fault Tolerance**
   - Database connection retry logic
   - Graceful degradation when services unavailable
   - Circuit breaker pattern for external services

---

### Maintainability Requirements

| Aspect | Requirement | Current Status |
|--------|-------------|----------------|
| Code Documentation | JSDoc comments for public methods | Partial |
| API Documentation | OpenAPI/Swagger spec | Not implemented |
| Code Coverage | > 70% | No tests implemented |
| Dependency Updates | Monthly review | Manual |
| Code Linting | ESLint configuration | Not configured |
| Git Workflow | Feature branches, PR reviews | To be defined |

---

### Usability Requirements

1. **User Interface**
   - Responsive design (mobile, tablet, desktop)
   - Accessibility (WCAG 2.1 Level AA)
   - Consistent design language
   - < 3 clicks to complete primary actions

2. **API Usability**
   - RESTful conventions
   - Clear error messages
   - Consistent response formats
   - API versioning

3. **Developer Experience**
   - Clear project structure
   - Environment setup documentation
   - Local development in < 10 minutes

---

### Compatibility Requirements

| Component | Supported Versions/Browsers |
|-----------|----------------------------|
| Node.js | 16.x, 18.x, 20.x |
| PostgreSQL | 12+, 13+, 14+, 15+ |
| Browsers | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Mobile Browsers | iOS Safari 14+, Chrome Mobile 90+ |

---

### Compliance Requirements

1. **Data Privacy**
   - GDPR compliance (for EU users)
   - Right to erasure implementation
   - Data export functionality
   - Privacy policy

2. **Data Retention**
   - User data: Retained until account deletion
   - Order history: Retained for 7 years (tax purposes)
   - Logs: Retained for 90 days
   - Backups: Retained for 30 days

3. **Audit Trail**
   - Log all data modifications
   - Track user actions
   - Immutable audit logs

---

### Monitoring Requirements

| Metric | Collection Frequency | Alert Threshold |
|--------|---------------------|-----------------|
| API Response Time | Real-time | > 1 second |
| Error Rate | Real-time | > 1% |
| Database Connection Pool | Every minute | > 80% utilization |
| Disk Space | Every 5 minutes | > 85% full |
| Memory Usage | Every minute | > 90% |
| CPU Usage | Every minute | > 85% (sustained) |

---

## Monitoring and Observability

A comprehensive monitoring and observability strategy for CookNest to ensure system health, performance, and reliability.

### Observability Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                    OBSERVABILITY                             │
│                                                              │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │    METRICS    │  │     LOGS      │  │    TRACES     │  │
│  │               │  │               │  │               │  │
│  │ • Performance │  │ • Events      │  │ • Request     │  │
│  │ • Usage       │  │ • Errors      │  │   Flow        │  │
│  │ • Resources   │  │ • Audit Trail │  │ • Latency     │  │
│  └───────────────┘  └───────────────┘  └───────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Metrics Collection

#### Application Metrics

| Metric Category | Specific Metrics | Tool |
|----------------|------------------|------|
| **HTTP Requests** | Request count, response time, status codes | Express middleware |
| **Business Metrics** | Orders created, users registered, revenue | Custom counters |
| **Database** | Query duration, connection pool usage, slow queries | pg instrumentation |
| **System** | CPU, memory, disk I/O | Node.js process metrics |

#### Implementation: Prometheus + Grafana

```javascript
// Example: Express middleware for metrics
const promClient = require('prom-client');

// Request duration histogram
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

// Request counter
const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Database query duration
const dbQueryDuration = new promClient.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries',
  labelNames: ['query_type', 'table']
});

// Active connections
const dbConnectionsActive = new promClient.Gauge({
  name: 'db_connections_active',
  help: 'Number of active database connections'
});
```

---

### Logging Strategy

#### Log Levels

| Level | Usage | Examples |
|-------|-------|----------|
| **ERROR** | Application errors requiring attention | Database connection failures, unhandled exceptions |
| **WARN** | Warnings about potential issues | Deprecated API usage, high response times |
| **INFO** | Important business events | User registration, order creation, payment processing |
| **DEBUG** | Detailed diagnostic information | Request/response payloads, query parameters |
| **TRACE** | Very detailed diagnostic information | Function entry/exit, variable values |

#### Structured Logging with Winston

```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cooknest-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Usage example
logger.info('Order created', {
  orderId: 123,
  userId: 456,
  totalAmount: 25.99,
  itemCount: 3
});
```

#### Log Aggregation

```
Application Instances
    │
    ├── Instance 1 → Logs
    ├── Instance 2 → Logs
    └── Instance 3 → Logs
            │
            ▼
    Log Aggregation Layer
    (Fluentd / Logstash)
            │
            ▼
    Search & Analysis
    (Elasticsearch / Loki)
            │
            ▼
    Visualization
    (Kibana / Grafana)
```

---

### Distributed Tracing

#### Request Tracing Flow

```
Frontend Request
    │ trace_id: abc-123
    ▼
API Gateway
    │ span_id: 1
    ├── User Service (span_id: 1.1)
    ├── Food Service (span_id: 1.2)
    │   └── Database Query (span_id: 1.2.1)
    └── Order Service (span_id: 1.3)
        ├── Database Query (span_id: 1.3.1)
        └── Payment Service (span_id: 1.3.2)
```

#### Implementation: OpenTelemetry

```javascript
// tracing.js
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');

const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PgInstrumentation()
  ]
});
```

---

### Health Checks

#### Endpoint: GET /health

```javascript
// healthCheck.js
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: await checkDatabase(),
      memory: checkMemory(),
      disk: await checkDiskSpace()
    }
  };
  
  const isHealthy = Object.values(health.checks)
    .every(check => check.status === 'healthy');
  
  res.status(isHealthy ? 200 : 503).json(health);
});

async function checkDatabase() {
  try {
    await db.query('SELECT 1');
    return { status: 'healthy', latency: '<10ms' };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

function checkMemory() {
  const used = process.memoryUsage();
  const heapPercentage = (used.heapUsed / used.heapTotal) * 100;
  return {
    status: heapPercentage < 90 ? 'healthy' : 'unhealthy',
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    percentage: `${heapPercentage.toFixed(2)}%`
  };
}
```

---

### Alert Configuration

#### Critical Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| Service Down | Health check fails 3+ times | Page on-call engineer |
| High Error Rate | > 5% of requests fail | Notify team channel |
| Database Unavailable | Connection failures | Page on-call + rollback |
| High Latency | p95 > 2 seconds | Notify team |
| Disk Space Critical | > 90% full | Auto-scale + notify |

#### Warning Alerts

| Alert | Condition | Action |
|-------|-----------|--------|
| Elevated Error Rate | > 1% of requests fail | Log to monitoring channel |
| Slow Queries | Query > 500ms | Log for optimization |
| Memory High | > 85% usage | Monitor closely |
| Connection Pool High | > 80% utilized | Consider scaling |

---

### Monitoring Dashboard Layout

```
┌────────────────────────────────────────────────────────────┐
│                    CookNest Dashboard                       │
├────────────────────────────────────────────────────────────┤
│  System Health: ● Healthy    Uptime: 99.8%                 │
├─────────────────────────┬──────────────────────────────────┤
│  Request Rate           │  Response Time (p95)             │
│  [Graph: 125 req/min]   │  [Graph: 245ms]                  │
├─────────────────────────┼──────────────────────────────────┤
│  Error Rate             │  Database Connections            │
│  [Graph: 0.5%]          │  [Graph: 12/20]                  │
├─────────────────────────┴──────────────────────────────────┤
│  Top Endpoints by Volume                                   │
│  1. GET /api/foods          - 50 req/min                   │
│  2. POST /api/orders        - 15 req/min                   │
│  3. GET /api/orders/:id     - 25 req/min                   │
├────────────────────────────────────────────────────────────┤
│  Slow Queries (>100ms)                                     │
│  • SELECT * FROM orders WHERE user_id = $1  - 150ms        │
│  • <Add index recommendation>                              │
├────────────────────────────────────────────────────────────┤
│  Recent Errors                                             │
│  • 500 Error - UserController.register (2 occurrences)     │
│  • View Details →                                          │
└────────────────────────────────────────────────────────────┘
```

---

### Monitoring Stack Recommendation

| Component | Recommended Tool | Purpose | Priority |
|-----------|-----------------|---------|----------|
| Metrics | Prometheus + Grafana | Time-series metrics and visualization | High |
| Logging | Winston + ELK Stack | Structured logging and search | High |
| Tracing | OpenTelemetry + Jaeger | Distributed request tracing | Medium |
| APM | New Relic / DataDog | Application performance monitoring | Medium |
| Uptime | UptimeRobot | External uptime monitoring | High |
| Errors | Sentry | Error tracking and alerting | High |

---

## Deployment Architecture

### Development Environment

```
┌────────────────────┐
│   Developer        │
│   Workstation      │
│                    │
│  ┌──────────────┐  │
│  │   React      │  │
│  │   Dev Server │  │
│  │   :3000      │  │
│  └──────────────┘  │
│                    │
│  ┌──────────────┐  │
│  │   Node.js    │  │
│  │   Express    │  │
│  │   :5000      │  │
│  └──────────────┘  │
│                    │
│  ┌──────────────┐  │
│  │  PostgreSQL  │  │
│  │   :5432      │  │
│  └──────────────┘  │
└────────────────────┘
```

### Production Deployment (Recommended)

```
                    Internet
                       │
                       ▼
              ┌────────────────┐
              │  Load Balancer │
              │   (Nginx/ALB)  │
              └────────┬───────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌──────────────┐            ┌──────────────┐
│  Web Server  │            │  Web Server  │
│   (Nginx)    │            │   (Nginx)    │
│  Static      │            │  Static      │
│  React App   │            │  React App   │
└──────┬───────┘            └──────┬───────┘
       │                            │
       └──────────┬─────────────────┘
                  │
                  ▼
          ┌───────────────┐
          │ API Gateway   │
          │  (Optional)   │
          └───────┬───────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
    ▼                           ▼
┌────────────┐          ┌────────────┐
│  Node.js   │          │  Node.js   │
│  Express   │          │  Express   │
│  App #1    │          │  App #2    │
└─────┬──────┘          └─────┬──────┘
      │                       │
      └───────────┬───────────┘
                  │
                  ▼
        ┌──────────────────┐
        │   PostgreSQL     │
        │   (Primary)      │
        │                  │
        │   ┌──────────┐   │
        │   │ Replica  │   │
        │   │(Read-only)│  │
        │   └──────────┘   │
        └──────────────────┘
```

### Deployment Options

#### Option 1: Traditional Hosting
- **Frontend**: Static hosting (Netlify, Vercel, S3 + CloudFront)
- **Backend**: VPS (DigitalOcean, Linode, AWS EC2)
- **Database**: Managed PostgreSQL (AWS RDS, DigitalOcean)

#### Option 2: Containerized (Docker)
```yaml
services:
  frontend:
    - React app build
  backend:
    - Node.js Express app
  database:
    - PostgreSQL container
```

#### Option 3: Platform-as-a-Service
- **Frontend**: Vercel / Netlify
- **Backend**: Heroku / Railway / Render
- **Database**: Heroku Postgres / Supabase

---

## Scalability Considerations

### Current Architecture Limitations
- Single server instance
- Stateful sessions (if implemented)
- Direct database connections

### Horizontal Scaling Strategy

#### 1. Application Layer Scaling
```
Load Balancer
    │
    ├── Backend Instance 1
    ├── Backend Instance 2
    ├── Backend Instance 3
    └── Backend Instance N
```

**Requirements**:
- Stateless application design
- Session management via Redis/JWT
- Connection pooling optimization

#### 2. Database Scaling

##### Read Replicas
```
Primary DB (Write)
    │
    ├── Replica 1 (Read)
    ├── Replica 2 (Read)
    └── Replica N (Read)
```

##### Sharding Strategy (Future)
- Shard by user_id for users and orders
- Geographical sharding for regional deployment

#### 3. Caching Strategy

```
Application Layer
    │
    ├── Cache Layer (Redis)
    │   ├── Food items catalog
    │   ├── User sessions
    │   └── Frequently accessed data
    │
    └── Database Layer
```

**Cache Candidates**:
- Food items list (TTL: 5-10 minutes)
- User profiles (TTL: 30 minutes)
- Search results (TTL: 5 minutes)

#### 4. Performance Optimization

##### Database Optimization
```sql
-- Indexing strategy
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_food_items_name ON food_items(name);
```

##### API Optimization
- Implement pagination for list endpoints
- Add ETag caching headers
- Compress responses (gzip)
- Implement GraphQL for flexible queries (optional)

#### 5. Monitoring & Observability

**Metrics to Track**:
- API response times
- Database query performance
- Error rates
- Active users
- Order completion rate

**Tools**:
- Application: PM2, New Relic, DataDog
- Database: pg_stat_statements
- Logging: Winston, ELK Stack
- Uptime: UptimeRobot, Pingdom

---

## Future Enhancements

### Phase 1: Core Improvements
- [ ] Add comprehensive error handling
- [ ] Implement JWT authentication
- [ ] Add input validation middleware
- [ ] Set up environment configuration
- [ ] Add API documentation (Swagger/OpenAPI)

### Phase 2: Features
- [ ] Real-time order tracking (WebSockets)
- [ ] Email notifications (SendGrid/Nodemailer)
- [ ] File uploads (food images)
- [ ] Advanced search and filtering
- [ ] Rating and review system

### Phase 3: Scalability
- [ ] Implement caching layer (Redis)
- [ ] Add rate limiting
- [ ] Set up CI/CD pipeline
- [ ] Containerize with Docker
- [ ] Implement microservices (optional)

### Phase 4: Analytics
- [ ] User behavior tracking
- [ ] Order analytics dashboard
- [ ] Performance monitoring
- [ ] A/B testing framework

---

## Appendix

### Database Connection Configuration

```javascript
// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
```

### Environment Variables Template

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cooknest
DB_USER=postgres
DB_PASSWORD=your_password

# Application Configuration
NODE_ENV=development
PORT=5000

# Security
JWT_SECRET=your_jwt_secret_key
BCRYPT_ROUNDS=10

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## Glossary

### Architecture Terms

| Term | Definition |
|------|------------|
| **C4 Model** | A hierarchical set of software architecture diagrams for context, containers, components, and code |
| **Container** | A separately runnable/deployable unit that executes code or stores data |
| **Component** | A grouping of related functionality encapsulated behind a well-defined interface |
| **Layered Architecture** | An architectural pattern organizing code into horizontal layers with specific responsibilities |
| **Repository Pattern** | A design pattern that mediates between the domain and data mapping layers |
| **Service Layer** | Layer containing business logic and coordinating application activities |

### Technical Terms

| Term | Definition |
|------|------------|
| **ACID** | Atomicity, Consistency, Isolation, Durability - properties of database transactions |
| **API** | Application Programming Interface - methods for communication between software components |
| **CORS** | Cross-Origin Resource Sharing - mechanism allowing restricted resources to be requested from another domain |
| **JWT** | JSON Web Token - compact, URL-safe means of representing claims between two parties |
| **ORM** | Object-Relational Mapping - technique for converting data between incompatible systems |
| **REST** | Representational State Transfer - architectural style for distributed hypermedia systems |
| **SPA** | Single-Page Application - web application that loads a single HTML page and dynamically updates |

### Database Terms

| Term | Definition |
|------|------------|
| **Connection Pool** | Cache of database connections maintained for reuse |
| **Foreign Key** | Column referencing the primary key of another table |
| **Index** | Data structure improving the speed of data retrieval |
| **Primary Key** | Unique identifier for a table record |
| **Transaction** | Unit of work performed against a database treated as a single operation |
| **Normalization** | Process of organizing data to minimize redundancy |

### Monitoring Terms

| Term | Definition |
|------|------------|
| **APM** | Application Performance Monitoring - monitoring software performance and availability |
| **Distributed Tracing** | Method for tracking requests across multiple services |
| **Metrics** | Quantitative measurements of system behavior over time |
| **Observability** | Measure of how well system internal states can be inferred from external outputs |
| **p95/p99** | 95th/99th percentile - 95%/99% of requests complete within this time |
| **SLA** | Service Level Agreement - commitment between service provider and client |
| **SLO** | Service Level Objective - target value for a service level metric |

---

## Quick Reference Guide

### Architecture Patterns Used

```
Pattern                     | Location              | Purpose
----------------------------|----------------------|---------------------------
Layered Architecture        | Backend structure     | Separation of concerns
Repository Pattern          | Data access layer     | Abstract data operations
MVC (simplified)            | Controllers/Services  | Request handling
Connection Pooling          | Database config       | Resource management
RESTful API                 | API endpoints         | Client-server communication
```

### Key Design Decisions

1. **Three-tier architecture** for clear separation of concerns
2. **PostgreSQL** for ACID compliance and relational data integrity
3. **No ORM** (currently) for performance and simplicity
4. **Express.js** for flexibility and ecosystem
5. **React** for component-based UI development
6. **RESTful API** over GraphQL for simplicity

### Component Interaction Summary

```
Request Flow:
Routes → Controllers → Services → Repositories → Database

Data Flow:
Database → Repositories → Services → Controllers → Response

Cross-Cutting Concerns:
- Logging: All layers
- Error Handling: Controllers, Services, Repositories
- Validation: Controllers, Services
- Authentication: Middleware (future)
```

### File Organization

```
backend/src/
├── routes/         → API endpoint definitions
├── controllers/    → Request/response handling
├── services/       → Business logic
├── repositories/   → Data access
└── config/         → Configuration (DB, etc.)
```

### API Endpoint Summary

```
Users:
POST   /api/users/register    - Register new user
POST   /api/users/login       - Authenticate user
GET    /api/users/:id         - Get user details

Foods:
GET    /api/foods             - List all food items
GET    /api/foods/:id         - Get specific food item
GET    /api/foods/search?q=   - Search food items

Orders:
POST   /api/orders            - Create new order
GET    /api/orders/:id        - Get order details
GET    /api/orders/user/:id   - Get user's orders
```

### Database Schema Quick Reference

```sql
-- Core Tables
users (id, name, email, password)
food_items (id, name, description, price)
orders (id, user_id, total_amount, created_at)
order_items (id, order_id, food_item_id, quantity, food_name, food_price)

-- Key Relationships
orders.user_id → users.id
order_items.order_id → orders.id
order_items.food_item_id → food_items.id
```

---

## Implementation Checklists

### Pre-Production Checklist

#### Security
- [ ] Implement JWT authentication
- [ ] Hash passwords with bcrypt
- [ ] Add input validation middleware
- [ ] Implement rate limiting
- [ ] Enable HTTPS/TLS
- [ ] Set up CORS properly
- [ ] Sanitize user inputs
- [ ] Add CSRF protection
- [ ] Implement security headers (helmet.js)
- [ ] Set up environment variables

#### Performance
- [ ] Add database indexes
- [ ] Implement caching strategy
- [ ] Optimize database queries
- [ ] Enable response compression
- [ ] Add pagination to list endpoints
- [ ] Optimize bundle size (frontend)
- [ ] Implement lazy loading
- [ ] Set up CDN for static assets

#### Monitoring & Logging
- [ ] Set up structured logging (Winston)
- [ ] Configure error tracking (Sentry)
- [ ] Implement health check endpoints
- [ ] Set up metrics collection (Prometheus)
- [ ] Create monitoring dashboards (Grafana)
- [ ] Configure alerts
- [ ] Set up uptime monitoring
- [ ] Implement distributed tracing

#### Testing
- [ ] Write unit tests (target >70% coverage)
- [ ] Write integration tests
- [ ] Perform load testing
- [ ] Conduct security testing
- [ ] Test error scenarios
- [ ] Test edge cases
- [ ] Perform user acceptance testing

#### Documentation
- [ ] Complete API documentation (Swagger/OpenAPI)
- [ ] Document deployment process
- [ ] Create runbooks for common issues
- [ ] Document environment setup
- [ ] Write user documentation
- [ ] Document database schema
- [ ] Create architecture diagrams

#### Infrastructure
- [ ] Set up CI/CD pipeline
- [ ] Configure production environment
- [ ] Set up database backups
- [ ] Implement disaster recovery plan
- [ ] Configure auto-scaling
- [ ] Set up load balancer
- [ ] Configure firewall rules
- [ ] Set up SSL certificates

---

## Common Patterns & Best Practices

### Error Handling Pattern

```javascript
// Controller layer
try {
  const result = await userService.createUser(userData);
  res.status(201).json({ success: true, data: result });
} catch (error) {
  logger.error('User creation failed', { error: error.message, userData });
  
  if (error.code === 'DUPLICATE_EMAIL') {
    return res.status(409).json({ 
      success: false, 
      error: 'Email already exists' 
    });
  }
  
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
}
```

### Database Transaction Pattern

```javascript
// Service layer
async function createOrderWithItems(orderData) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const order = await client.query(
      'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
      [orderData.userId, orderData.total]
    );
    
    for (const item of orderData.items) {
      await client.query(
        'INSERT INTO order_items (order_id, food_item_id, quantity) VALUES ($1, $2, $3)',
        [order.rows[0].id, item.foodId, item.quantity]
      );
    }
    
    await client.query('COMMIT');
    return order.rows[0];
    
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
```

### Validation Pattern

```javascript
// Middleware
const validateOrder = (req, res, next) => {
  const { items, userId } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ 
      error: 'Items array is required' 
    });
  }
  
  if (!userId || typeof userId !== 'number') {
    return res.status(400).json({ 
      error: 'Valid user ID is required' 
    });
  }
  
  next();
};
```

---

## Troubleshooting Guide

### Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Database connection timeout | Pool exhausted | Increase pool size or check for connection leaks |
| Slow query performance | Missing indexes | Add indexes on frequently queried columns |
| High memory usage | Memory leaks | Use heap snapshots to identify leaks |
| CORS errors | Incorrect CORS config | Verify CORS_ORIGIN environment variable |
| 500 errors on startup | Missing env variables | Check .env file configuration |
| Authentication failures | Incorrect JWT secret | Verify JWT_SECRET environment variable |

### Debug Checklist

1. **Check Logs**
   - Application logs: `logs/combined.log`
   - Error logs: `logs/error.log`
   - Database logs: PostgreSQL logs

2. **Verify Environment**
   - Database connection: `psql -U user -d cooknest`
   - Environment variables: `printenv | grep DB_`
   - Node version: `node --version`

3. **Test Components**
   - Database: `SELECT 1` query
   - API health: `curl http://localhost:5000/health`
   - Frontend: Check browser console

4. **Monitor Resources**
   - CPU usage: `top` or `htop`
   - Memory: `free -m`
   - Disk space: `df -h`
   - Database connections: `SELECT * FROM pg_stat_activity`

---

## References & Further Reading

### Official Documentation

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev/)
- [pg (node-postgres) Documentation](https://node-postgres.com/)

### Architecture & Design Patterns

- [C4 Model](https://c4model.com/) - Software architecture diagrams
- [Martin Fowler - Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/)
- [The Twelve-Factor App](https://12factor.net/) - Methodology for building SaaS applications
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [Microservices Patterns](https://microservices.io/patterns/index.html)

### Best Practices

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [PostgreSQL Performance Optimization](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

### Monitoring & Observability

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [OpenTelemetry](https://opentelemetry.io/)
- [The Three Pillars of Observability](https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html)

### DevOps & Deployment

- [Docker Documentation](https://docs.docker.com/)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

### Security

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## Appendix: Diagram Legend

### C4 Model Notation

```
Person          → External user or actor
System          → Software system boundary
Container       → Deployable unit (app, database, etc.)
Component       → Grouping of related functionality
Relationship    → Interaction between elements
```

### Flow Diagram Symbols

```
Rectangle       → Process or action
Diamond         → Decision point
Cylinder        → Database
Arrows          → Data flow direction
Dashed line     → Optional or async flow
```

---

## Document Changelog

### Version 1.1 - February 11, 2026
- Added comprehensive C4 model diagrams (Context, Container, Component)
- Added detailed Data Flow Diagrams (DFD)
- Added Architecture Decision Records (ADRs)
- Added Non-Functional Requirements section
- Enhanced Monitoring and Observability section
- Added Glossary and Quick Reference Guide
- Added Implementation Checklists
- Added Troubleshooting Guide
- Added References and Further Reading

### Version 1.0 - February 11, 2026
- Initial system architecture documentation
- Basic architecture patterns
- Technology stack overview
- Data architecture and API design
- Security considerations
- Deployment and scalability planning

---

**Document Version**: 1.1  
**Last Updated**: February 11, 2026  
**Author**: System Architecture Team  
**Reviewers**: Development Team  
**Next Review Date**: May 11, 2026
