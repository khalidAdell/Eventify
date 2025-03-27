import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import CreateEventForm from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import Events from "./pages/Events";
import SingleEventPage from "./pages/SingleEventPage";
import RemindersPage from "./pages/RemindersPage";
import NotificationsPage from "./pages/NotificationsPage";
import ContactPage from "./pages/Contact";
import PricingPage from "./pages/PricingPage";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./api/useAuth";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
const ProtectedAuth = () => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main className="min-h-screen mt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<Events />} />
          <Route path="event" element={<SingleEventPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="pricing" element={<PricingPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-event" element={<CreateEventForm />} />
            <Route path="my-events" element={<MyEvents />} />
            <Route path="reminders" element={<RemindersPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
        </Route>

        {/* Authentication Routes */}
        <Route element={<ProtectedAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
