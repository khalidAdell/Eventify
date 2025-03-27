import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUsers,
  FaBell,
  FaSearch,
  FaCalendarDay,
  FaPlayCircle,
} from "react-icons/fa";
import EventCard from "../components/ui/EventCard";
import { useEffect, useState } from "react";
import { Event } from "../types/event";

const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  useEffect(() => {
    setUpcomingEvents([
      {
        id: "1",
        title: "Web Development Summit",
        description:
          "Join us for the latest in web development technologies and trends.",
        eventType: "conference",
        startDate: "2025-04-15",
        startTime: "09:00",
        endDate: "2025-04-17",
        endTime: "17:00",
        location: "Tech Center",
        address: "123 Innovation St, San Francisco, CA",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 50,
        maxAttendance: 500,
      },
      {
        id: "2",
        title: "UX Design Workshop",
        description:
          "Hands-on workshop focusing on user experience design principles.",
        eventType: "workshop",
        startDate: "2025-04-10",
        startTime: "14:00",
        endDate: "2025-04-10",
        endTime: "18:00",
        location: "Design Studio",
        address: "456 Creative Ave, New York, NY",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 3,
        maxAttendance: 30,
      },
      {
        id: "3",
        title: "React Developer Meetup",
        description:
          "Monthly meetup for React developers to share knowledge and network.",
        eventType: "meetup",
        startDate: "2025-04-05",
        startTime: "18:30",
        endDate: "2025-04-05",
        endTime: "21:00",
        location: "Startup Hub",
        address: "789 Tech Blvd, Austin, TX",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 10,
        maxAttendance: 100,
      },
    ]);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Events with
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent block sm:inline">
                Eventify
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mx-auto lg:mx-0 max-w-2xl lg:pr-12">
              Create, manage, and share unforgettable experiences. Perfect for
              personal gatherings, professional conferences, and everything in
              between.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-pink-600 text-white rounded-xl text-base sm:text-lg font-semibold hover:bg-pink-700 transition-all 
                    flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-200"
              >
                <FaCalendarCheck className="w-5 h-5" />
                Start Free Trial
              </Link>
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-pink-200 text-pink-600 rounded-xl font-semibold hover:border-pink-300 
                            transition-all flex items-center justify-center gap-2"
              >
                <FaPlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats Counter */}
            <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 pt-6 sm:pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-pink-100 rounded-lg">
                  <FaUsers className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">50K+</p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Active Users
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-pink-100 rounded-lg">
                  <FaCalendarDay className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold">120K+</p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Events Created
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 px-4 sm:px-12 lg:px-0">
            <div className="relative rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all overflow-hidden">
              {/* Responsive image handling */}
              <img
                src="/images/hero.png"
                alt="Event Management Dashboard"
                className="w-full h-auto"
                loading="lazy"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink-100 rounded-full opacity-70"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-rose-100 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16">
            Why Choose Eventify?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-pink-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Collaborative Planning
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Invite team members, assign tasks, and manage permissions
                seamlessly
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-pink-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <FaBell className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Smart Reminders
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Automated notifications and reminders for all participants
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1 sm:max-w-md mx-auto lg:max-w-none">
              <div className="bg-pink-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <FaSearch className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Advanced Search
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Quickly find events, participants, or resources with powerful
                search
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
          Upcoming Events
        </h2>

        {/* Desktop - 3 columns, Tablet - 2 columns, Mobile - 1 column with scroll */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Mobile scroll view */}
        <div className="sm:hidden overflow-x-auto pb-6">
          <div className="flex space-x-4 w-max">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* View all events button */}
        <div className="mt-8 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-pink-600 font-medium hover:text-pink-700 transition-colors"
          >
            View All Events
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Newsletter subscription - added to improve mobile experience */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive notifications about upcoming events and special
            offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
