import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchTrain from "./pages/SearchTrain";
import TrainDetails from "./pages/TrainDetails";
import BookTicket from "./pages/BookTicket";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AddTrain from "./pages/AddTrain";
import EditTrain from "./pages/EditTrain";
import ViewTrains from "./pages/ViewTrain";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
      }}
    >
      404 - Page Not Found
    </div>
  );
}

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.role === "ADMIN"
    ? children
    : <Navigate to="/" replace />;
}

export default function RoutesConfig() {
  const location = useLocation();

  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>

        {/* Redirect root based on login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchTrain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/train/:id"
          element={
            <ProtectedRoute>
              <TrainDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-train"
          element={
            <AdminRoute>
              <AddTrain />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-train/:id"
          element={
            <AdminRoute>
              <EditTrain />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/view-train"
          element={
            <AdminRoute>
              <ViewTrains />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}