import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineEventNote,
  MdDashboard,
  MdLogout,
  MdAccountCircle,
} from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../api/useAuth";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState<{
    name?: string;
    id?: string;
    email?: string;
  } | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggingIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [isLoggingIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUserData(null);
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Render navigation links based on authentication status
  const renderNavLinks = () => {
    if (userData) {
      return [
        { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
        { name: "Events", path: "/events", icon: MdOutlineEventNote },
        { name: "Pricing", path: "/pricing" },
        { name: "Contact", path: "/contact" },
      ];
    }

    return [
      { name: "Events", path: "/events" },
      { name: "Pricing", path: "/pricing" },
      { name: "Contact", path: "/contact" },
    ];
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-3" : "bg-white/90 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo with animation */}
        <Link to="/" className="flex items-center space-x-2 group">
          <MdOutlineEventNote className="w-8 h-8 text-pink-600 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Eventify
          </span>
        </Link>

        {/* Desktop Menu with active indicators */}
        <div className="hidden md:flex items-center space-x-8">
          {renderNavLinks().map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative font-medium transition-colors ${
                isActive(item.path)
                  ? "text-pink-600"
                  : "text-gray-700 hover:text-pink-600"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle with animation */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-pink-50 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <FaTimes className="w-6 h-6 text-pink-600" />
            ) : (
              <FaBars className="w-6 h-6 text-pink-600" />
            )}
          </button>
        </div>

        {/* Auth/User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {userData ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MdAccountCircle className="w-8 h-8 text-gray-500" />
                <span className="font-medium capitalize">
                  {userData.name || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
              >
                <MdLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 font-medium shadow-sm hover:shadow transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu with smooth animation */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {renderNavLinks().map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`py-2 font-medium transition-colors flex items-center space-x-2 ${
                isActive(item.path) ? "text-pink-600" : "text-gray-700"
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Mobile Auth/User Section */}
          <div className="pt-2 flex flex-col space-y-3">
            {userData ? (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <MdAccountCircle className="w-8 h-8 text-gray-500" />
                  <span className="font-medium">{userData.name || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="py-2.5 text-center font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <MdLogout className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2.5 text-center font-medium text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="py-2.5 text-center font-medium bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 shadow-sm transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
