Here's the updated README reflecting your new professional structure:

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
- Jest/Vitest for comprehensive testing
- Nodemon for live server reload.
- Concurrently to run client & server together.

---

## Project Structure (Modern Monorepo Style)

```plaintext
carrentalhub/
│
├── client/                  # Frontend React Application
│   ├── src/
│   │   ├── component/       # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── utils/           # Helper functions
│   │   ├── Axios/           # API client configuration
│   │   ├── App.jsx          # Main app layout
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
├── server/                  # Backend API
│   ├── controllers/         # Request handlers
│   ├── engine/              
│   │   ├── db_storage/      # JSON database files
│   │   ├── uploadedImages/  # Uploaded car images
│   │   └── Agents/          # Business logic modules
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express app entry point
│
├── tests/                   # Comprehensive test suite
│   ├── frontend/            # React component tests
│   └── backend/             # API and unit tests
│
├── package.json             # Root scripts & dev tools
├── .gitignore              # Professional git exclusion rules
└── README.md

```

---

## architectur:
 # HEADER

Logo : Show brand and return to homepage

Search Bar : Let users find rentals fast filtered by city name

CTA Button (List Property) : Encourage users to post a rental

Login / Account : User profile, saved listings, messages

AI chatbot : reach support using AI

Language Selector : Choose site language if needed
✔ using the i18next Lib
✔ whole app becomes RTL automatically whenlang is Arabic

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

---

## Key Features Implemented

- ✅ **Professional Project Structure** with separated client/server
- ✅ **Comprehensive Testing Suite** for both frontend and backend
- ✅ **Secure File Upload** with proper static file serving
- ✅ **Modern Development Workflow** with hot reloading
- ✅ **Production-Ready Configuration** with optimized builds
- ✅ **Clean Git Management** with proper `.gitignore` rules

---

## License

This project is licensed under the MIT License.