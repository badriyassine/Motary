# Motary Cars - Complete Car Dealership Application

A full-stack car dealership application built with React, Node.js, Express, and MongoDB.

## Features

### Frontend Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Framer Motion animations
- **Car Catalog**: Browse cars with advanced search and filtering
- **User Authentication**: Login, register, and profile management
- **Order Management**: Place orders and track order status
- **Admin Dashboard**: Complete admin panel for managing cars and orders
- **Real-time Notifications**: Notification system for users and admins
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Backend Features

- **RESTful API**: Complete API with authentication and authorization
- **User Management**: User registration, login, and profile management
- **Car Management**: CRUD operations for car inventory
- **Order System**: Order creation, status tracking, and management
- **Notification System**: Real-time notifications for users
- **File Upload**: Image upload for cars with Multer
- **Security**: JWT authentication and password hashing

## Tech Stack

### Frontend

- React 19.1.1
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Date-fns

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Bcrypt for password hashing
- CORS enabled

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to the backend directory:

```bash
cd Motary-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/motary
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd Motary
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### For Users

1. **Browse Cars**: Visit the Cars page to see all available vehicles
2. **Search & Filter**: Use the search bar and filters to find specific cars
3. **View Details**: Click "See More" to view detailed car information
4. **Place Orders**: Click "Buy Now" to place an order for a car
5. **Track Orders**: Visit your Profile to see order history and status
6. **Manage Account**: Update profile information and manage account settings

### For Admins

1. **Login**: Use admin credentials to access the dashboard
2. **Manage Cars**: Add, edit, or delete cars from the inventory
3. **View Orders**: Monitor all customer orders and their status
4. **Update Order Status**: Change order status and add notes
5. **View Analytics**: See dashboard statistics and revenue

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password/:token` - Password reset

### Cars

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `GET /api/cars/search` - Search cars with filters
- `POST /api/cars` - Create car (Admin only)
- `PUT /api/cars/:id` - Update car (Admin only)
- `DELETE /api/cars/:id` - Delete car (Admin only)

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `DELETE /api/orders/:id` - Delete order (Admin only)

### Notifications

- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `GET /api/notifications/unread-count` - Get unread count
- `POST /api/notifications` - Create notification (Admin only)
- `DELETE /api/notifications/:id` - Delete notification

## Database Schema

### User

- firstName, lastName, phone, email, password
- role (user/admin)
- resetPasswordToken, resetPasswordExpires

### Car

- name, description, price
- gearbox, doors, fullOptions, inStock
- condition, type, fuel, year
- images, createdBy

### Order

- car (reference), user (reference)
- buyerInfo (firstName, lastName, phone, email)
- totalPrice, status, notes
- timestamps

### Notification

- user (reference), title, message
- type, read, data, actionUrl
- timestamps

## Features Implemented

✅ **Complete Authentication System**

- User registration and login
- Password reset functionality
- JWT token-based authentication
- Role-based access control

✅ **Advanced Car Management**

- Car CRUD operations
- Image upload and management
- Search and filtering system
- Category-based browsing

✅ **Order Management System**

- Order creation and tracking
- Status management
- Order history for users
- Admin order management

✅ **Notification System**

- Real-time notifications
- Notification center UI
- Unread count tracking
- Admin notification creation

✅ **Admin Dashboard**

- Complete admin panel
- Statistics and analytics
- Car and order management
- User-friendly interface

✅ **Responsive Design**

- Mobile-first approach
- Beautiful animations
- Consistent UI/UX
- Cross-browser compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.
