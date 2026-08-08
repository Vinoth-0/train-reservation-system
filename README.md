# 🚆 Smart Train Reservation System

A full-stack train ticket booking application with user authentication, train search, ticket booking, and an admin dashboard for managing trains — built as a portfolio project.

---

## 🛠️ Tech Stack

**Backend**
- Java 17, Spring Boot
- Spring Data JPA / Hibernate
- MySQL
- JWT (JSON Web Token) authentication
- Maven

**Frontend**
- React 19 + Vite
- React Router DOM
- Axios
- CSS Modules
- Blue/gold theme with glassmorphism UI, light & dark mode support

---

## ✨ Features

- **User Authentication** — Register, login, and JWT-secured sessions
- **Train Search** — Search trains by route and view journey details
- **Ticket Booking** — Book tickets and view seat availability
- **My Bookings** — View and manage your own bookings
- **Profile Management** — View and update user profile
- **Admin Dashboard** — Add, edit, and remove trains (admin-only access)
- **Protected Routes** — Role-based route protection on the frontend
- **Responsive UI** — Light/dark mode with a custom blue/gold glassmorphism design

---

## 📂 Project Structure

```
Train Reservation/
├── backend/                 # Spring Boot REST API
│   └── src/main/java/...
├── frontend/                 # React + Vite client
│   └── src/
│       ├── components/       # Navbar, Footer, TrainCard, BookingCard
│       ├── pages/             # Home, Login, Register, SearchTrain, BookTicket,
│       │                       # MyBookings, Profile, AdminDashboard, etc.
│       └── services/          # API service layer (Axios)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a MySQL database (or let it auto-create via `createDatabaseIfNotExist=true`).
3. Set your database credentials as environment variables (do **not** hardcode them):
   ```bash
   export DB_USERNAME=root
   export DB_PASSWORD=your_password_here
   ```
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
5. The backend will start on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will start on `http://localhost:5173` (default Vite port).

---

## 🔐 Environment Variables

| Variable      | Description                  |
|---------------|-------------------------------|
| `DB_USERNAME` | MySQL database username       |
| `DB_PASSWORD` | MySQL database password       |

---

## 📌 Notes

This project was built as a personal portfolio piece to demonstrate full-stack development skills — REST API design, JWT authentication, relational database modeling, and a React frontend with role-based access control.

---

## 👤 Author

**Vinoth Kumar A**
[GitHub](https://github.com/vinoth-0)
