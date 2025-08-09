# CarRentalHub

A modern full-stack car rental platform built with React, Vite, Material UI, Express, and MongoDB.  
It offers a seamless car booking experience for customers and powerful management tools for rental businesses.

---

## Features

### User Experience
- Advanced Car Search – Filter by brand, model, availability dates, and price.
- Smooth Booking Process – Date pickers, location selection, and driver options.
- Interactive Map – Powered by Leaflet and React-Leaflet for location previews.
- Booking Summary & PDF Generation using jsPDF.
- Car Image Gallery with responsive UI using Material UI.
- Animated and modern interface using Framer Motion.

### Business & Admin
- Add, update, and delete cars with image upload (via Multer & Sharp).
- Manage orders and bookings.
- Secure authentication with JWT & bcrypt.
- Manage users (buyers & sellers).

---

## Tech Stack

**Frontend:**
- Vite + React 19
- Material UI for modern, responsive design.
- Leaflet for interactive maps.
- Day.js for date management.
- Framer Motion for animations.

**Backend:**
- Express 5 REST API.
- MongoDB (via Mongoose models in `Server/models`).
- Authentication: JWT + bcrypt.
- File Uploads: Multer + Sharp for image processing.

**Development Tools:**
- ESLint for code quality.
- Nodemon for live server reload.
- Concurrently to run client & server together.

---

## Project Structure

```plaintext
carrentalhub/
│
├── Server/                 # Backend API
│   ├── controllers/        # Request handlers
│   ├── engine/             # Database storage & assets
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── server.js            # Express app entry point
│
├── src/                     # Frontend (React)
│   ├── component/           # Reusable UI components
│   ├── pages/               # Page-level components
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app layout
│   └── main.jsx             # Entry point
│
├── public/                  # Static assets
├── package.json
└── vite.config.js
