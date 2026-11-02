# StudioSpace – Creative Studio Rental Platform

**StudioSpace** is a full-stack web application that connects creative professionals with studio owners. It allows users to discover, explore, book, and manage creative spaces for photography, music production, podcast recording, and other creative activities.

The platform also enables studio owners to list their spaces, manage their listings, and handle bookings through a simple and user-friendly interface.

---

## Live Demo

- **Frontend:** Coming Soon
- **Backend API:** Coming Soon
- **Client Repository:** Add your GitHub repository URL
- **Server Repository:** Add your GitHub repository URL

---

## Project Overview

Finding a suitable creative workspace can be challenging for photographers, musicians, podcasters, and other creative professionals.

StudioSpace aims to simplify this process by providing a centralized platform where users can discover available studios, view detailed information, check pricing, and submit booking requests.

Studio owners can also manage their studio listings and provide workspace opportunities to other creators.

## Key Features

### 1. User Authentication

- User registration and login.
- Email and password authentication.
- Google and GitHub authentication support.
- Persistent authentication sessions using Better Auth.
- Protected backend API endpoints.

### 2. Studio Discovery

- Browse all available studio listings.
- Explore featured studios on the homepage.
- Search studios by title and location.
- Filter studios by category and hourly rate.
- View detailed studio information.

### 3. Studio Management

- Add new studio listings.
- Update existing studio information.
- Delete personal studio listings.
- Manage studio details, pricing, amenities, and images.
- Automatically associate studio listings with the authenticated owner.

### 4. Booking Management

- Submit studio booking requests.
- Select booking dates and time slots.
- Calculate booking duration and total price.
- Prevent overlapping pending or confirmed bookings.
- View personal booking history.
- Cancel pending bookings.

### 5. User Interface

- Responsive design for different screen sizes.
- Light and dark theme support.
- Interactive hero slider.
- Featured studio cards.
- Creative studio categories.
- How It Works section.
- Toast notifications.
- Loading and empty states.
- Custom error handling.

---

## Technology Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- next-themes

### Backend

- Node.js
- Express.js
- JavaScript
- MongoDB
- Better Auth
- MongoDB Node.js Driver

### Authentication & Security

- Better Auth
- HTTP Cookie-based sessions
- CORS configuration
- Protected API routes
- Owner-based authorization
- Request validation

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas
- npm

---

## Application Pages

| Page            | Route                | Description                                                     |
| --------------- | -------------------- | --------------------------------------------------------------- |
| Home            | `/`                  | Homepage with hero slider, featured studios, and other sections |
| Explore Studios | `/studios`           | Browse, search, and filter studios                              |
| Studio Details  | `/studios/[id]`      | View studio details and submit booking requests                 |
| Login           | `/login`             | User login                                                      |
| Register        | `/register`          | Create a new account                                            |
| Add Studio      | `/add-studio`        | Add a new studio listing                                        |
| My Listings     | `/my-listings`       | Manage personal studio listings                                 |
| Edit Studio     | `/studios/edit/[id]` | Update an existing studio                                       |
| My Bookings     | `/my-bookings`       | View and manage personal bookings                               |

---

## Project Structure

### Frontend

```text
studiospace/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── add-studio/
│   │   ├── login/
│   │   ├── register/
│   │   ├── my-listings/
│   │   ├── my-bookings/
│   │   ├── studios/
│   │   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── [id]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── auth-client.ts
├── package.json
└── README.md
```

### Backend

```text
studiospace-server/
├── index.js
├── db.js
├── auth.js
├── package.json
└── .env
```

---

## Database Design

StudioSpace uses MongoDB Atlas for storing application data.

**Database Name:** `studioSpaceDB`

### Collections

**1. studios**

Stores studio listing information.

Main fields:

- `_id`
- `title`
- `category`
- `hourlyRate`
- `securityDeposit`
- `maxCapacity`
- `location`
- `imageUrl`
- `amenities`
- `overview`
- `ownerName`
- `ownerEmail`
- `createdAt`
- `updatedAt`

**2. bookings**

Stores booking information.

Main fields:

- `studioId`
- `studioTitle`
- `userId`
- `userName`
- `userEmail`
- `ownerEmail`
- `bookingDate`
- `startTime`
- `endTime`
- `totalHours`
- `hourlyRate`
- `totalPrice`
- `status`
- `createdAt`
- `cancelledAt`

**3. reviews**

Reserved for studio review and rating functionality.

Better Auth also manages its authentication-related database records.

---

## Installation and Setup

Follow these steps to run StudioSpace locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

### 1. Clone the Repositories

Clone the frontend and backend repositories separately.

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
git clone YOUR_SERVER_REPOSITORY_URL
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd studiospace
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

### 3. Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd studiospace-server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend root directory.

Add your MongoDB connection string and Better Auth secret using the environment variable names configured in your backend.

Example:

```env
mongodb_url=YOUR_MONGODB_CONNECTION_STRING
BETTER_AUTH_SECRET=YOUR_SECRET_KEY
```

Do not commit your `.env` file or expose your database credentials.

Start the backend:

```bash
npm run dev
```

The backend API will run at:

```text
http://localhost:8000
```

---

## API Endpoints

### Studio APIs

| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| GET    | `/api/studios`          | Get all studios                  |
| GET    | `/api/studios/featured` | Get featured studios             |
| GET    | `/api/studios/:id`      | Get a single studio              |
| POST   | `/api/studios`          | Create a studio                  |
| PUT    | `/api/studios/:id`      | Update an existing studio        |
| DELETE | `/api/studios/:id`      | Delete a studio                  |
| GET    | `/api/my-listings`      | Get authenticated user's studios |

### Booking APIs

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| POST   | `/api/bookings`     | Create a booking request          |
| GET    | `/api/bookings`     | Get authenticated user's bookings |
| DELETE | `/api/bookings/:id` | Cancel a pending booking          |

### Authentication APIs

Better Auth handles authentication endpoints under:

```text
/api/auth/*
```

Protected endpoints require a valid authenticated session.

---

## Security and Validation

StudioSpace implements several security measures:

- Authenticated users are required for protected operations.
- Studio creation, updating, and deletion use authenticated owner information.
- Users can only update or delete their own studio listings.
- Booking requests are associated with the authenticated user.
- Booking time conflicts are checked before saving a booking.
- Backend validation checks required fields and numeric values.
- CORS is configured to allow requests from the frontend.

---

## Booking Workflow

1. A user explores available studios.
2. The user opens a studio details page.
3. The user selects a booking date and time.
4. The application calculates the booking duration and estimated price.
5. The backend checks for overlapping pending or confirmed bookings.
6. If the requested time is available, the booking is saved.
7. The user can view the booking in My Bookings.
8. Pending bookings can be cancelled.

---

## Assignment Requirements and Project Checklist

- [ ] Next.js frontend application
- [ ] Express.js backend application
- [ ] MongoDB database integration
- [ ] User authentication with Better Auth
- [ ] Homepage with hero slider
- [ ] Featured studios section
- [ ] Explore studios page
- [ ] Studio details page
- [ ] Add studio functionality
- [ ] My studio listings page
- [x] Update studio functionality
- [x] Delete studio functionality
- [x] Booking creation
- [x] My bookings page
- [x] Booking cancellation
- [x] Responsive user interface
- [x] Light and dark theme
- [ ] Complete frontend private route protection
- [ ] Final deployment and production testing
- [ ] Verify assignment-required GitHub commit counts
- [ ] Final README and deployment links

---

## Future Improvements

- Studio reviews and rating system.
- Wishlist functionality.
- PDF booking invoices.
- Advanced studio search and filtering.
- Booking status management for studio owners.
- Dashboard analytics.
- Production deployment and performance optimization.

---

## Author

**Rafiqul Hasan**

Aspiring Full-Stack Web Developer

**Technologies:** Next.js | React | TypeScript | Node.js | Express.js | MongoDB

---

## License

This project was developed as part of a web development assignment and for educational purposes.



