import { useState } from "react";
import {
  FaCalendarPlus,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface Day {
  day: number;
  currentMonth: boolean;
  today?: boolean;
  events: Event[];
  reminders: Reminder[];
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  status: string;
  image: string;
}

interface Reminder {
  id: number;
  title: string;
  date: string;
  time: string;
  priority: string;
}
const Dashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | string>(null);
  const [dateError, setDateError] = useState("");
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Prepare presentation slides",
      date: "March 24, 2025",
      time: "09:00 AM",
      priority: "high",
    },
    {
      id: 2,
      title: "Call conference venue",
      date: "March 26, 2025",
      time: "02:00 PM",
      priority: "medium",
    },
  ]);
  const [newReminder, setNewReminder] = useState({
    title: "",
    time: "",
    priority: "medium",
  });

  const storedUser = localStorage.getItem("user");

  const userData = {
    name: storedUser ? JSON.parse(storedUser).name : "User",
    stats: {
      upcoming: 8,
      completed: 12,
      participants: 156,
    },
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Technology Conference",
      date: "March 25, 2025",
      time: "10:00 AM",
      location: "Cairo International Convention Center",
      participants: 42,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "April 2, 2025",
      time: "2:30 PM",
      location: "Online",
      participants: 28,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
    {
      id: 3,
      title: "Entrepreneurs Meetup",
      date: "April 10, 2025",
      time: "4:00 PM",
      location: "Hyatt Regency Hotel",
      participants: 35,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
    {
      id: 4,
      title: "New Products Exhibition",
      date: "April 18, 2025",
      time: "11:00 AM",
      location: "International Exhibition Hall",
      participants: 50,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
  ];

  const handleDateClick = (day: Day, month: number, year: number): void => {
    if (!day.currentMonth) return;

    const selectedDate = new Date(year, month, day.day);
    const currentDate = new Date();

    // Reset time to 00:00:00 for both dates to compare only the date part
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      setDateError("Cannot select a date in the past.");
      return;
    }

    const dateString = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setDateError("");
    setSelectedDate(dateString);
    setShowReminderForm(true);
  };

  const handleCreateReminder = () => {
    if (!newReminder.title || !newReminder.time) return;

    if (!selectedDate) return;

    const reminder = {
      id: reminders.length + 1,
      title: newReminder.title,
      date: selectedDate,
      time: newReminder.time,
      priority: newReminder.priority,
    };

    setReminders([...reminders, reminder]);
    setNewReminder({ title: "", time: "", priority: "medium" });
    setShowReminderForm(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Add days from previous month to fill the first week
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        events: [],
        reminders: [],
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      // Check if there are events on this day
      const events = upcomingEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      // Check if there are reminders on this day
      const dayReminders = reminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        return (
          reminderDate.getDate() === i &&
          reminderDate.getMonth() === month &&
          reminderDate.getFullYear() === year
        );
      });

      days.push({
        day: i,
        currentMonth: true,
        today:
          new Date().getDate() === i &&
          new Date().getMonth() === month &&
          new Date().getFullYear() === year,
        events: events,
        reminders: dayReminders,
      });
    }

    // Add days from next month to complete the last week
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        events: [],
        reminders: [],
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <title>Dashboard - Eventify</title>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-grow lg:max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={"/images/hero.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 capitalize">
                  Welcome, {userData.name}
                </h1>
                <p className="text-gray-600">Have a great day!</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-pink-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {userData.stats.upcoming}
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {userData.stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed Events</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {userData.stats.participants}
                </div>
                <div className="text-sm text-gray-600">Participants</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <Link
                to={"/create-event"}
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-colors shadow-sm"
              >
                <FaCalendarPlus className="text-lg" />
                <span>Create New Event</span>
              </Link>

              <Link
                to={"/my-events"}
                className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <FaEye className="text-lg" />
                <span>View All Events</span>
              </Link>
            </div>
          </div>

          {/* Enhanced Calendar */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-grow relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800">Calendar</h2>
                <p className="text-yellow-600 font-medium text-sm">
                  Click any day to create Reminder
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <span className="font-medium">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 mb-2">
                {weekdays.map((day, index) => (
                  <div
                    key={index}
                    className="text-center font-medium text-gray-600 text-sm py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-16 border rounded-lg p-1 ${
                      day.currentMonth
                        ? day.today
                          ? "bg-pink-50 border-pink-300"
                          : "bg-white border-gray-200"
                        : "bg-gray-50 border-gray-100 text-gray-400"
                    } hover:border-pink-300 ${
                      day.currentMonth ? "cursor-pointer" : ""
                    } transition-colors relative`}
                    onClick={() =>
                      day.currentMonth &&
                      handleDateClick(
                        day,
                        currentMonth.getMonth(),
                        currentMonth.getFullYear()
                      )
                    }
                  >
                    <div className="text-sm font-medium">{day.day}</div>

                    {/* Event indicators */}
                    <div className="mt-1 space-y-1">
                      {day.events.length > 0 && (
                        <div className="flex flex-col gap-1">
                          {day.events.slice(0, 2).map((event, idx) => (
                            <div
                              key={idx}
                              className="h-1.5 w-full rounded-sm bg-pink-500"
                              title={event.title}
                            ></div>
                          ))}
                          {day.events.length > 2 && (
                            <div className="h-1.5 w-full rounded-sm bg-pink-500"></div>
                          )}
                        </div>
                      )}

                      {/* Reminder indicators */}
                      {day.reminders.length > 0 && (
                        <div className="flex flex-col gap-1">
                          {day.reminders.slice(0, 2).map((reminder, idx) => (
                            <div
                              key={`rem-${idx}`}
                              className="h-1.5 w-full rounded-sm bg-yellow-400"
                              title={reminder.title}
                            ></div>
                          ))}
                          {day.reminders.length > 2 && (
                            <div className="h-1.5 w-full rounded-sm bg-yellow-400"></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-red-500 text-center">{dateError}</p>
              <div className="mt-4 text-sm flex gap-4 justify-center">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-gray-600">Events</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-600">Reminders</span>
                </div>
              </div>
            </div>

            {/* Reminder Form */}
            {showReminderForm && (
              <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex items-center justify-center p-6">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-yellow-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      New Reminder
                    </h3>
                    <button
                      onClick={() => setShowReminderForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Date</div>
                    <div className="font-medium text-gray-800">
                      {selectedDate}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">
                      Reminder Title
                    </label>
                    <input
                      type="text"
                      value={newReminder.title}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="Enter reminder title"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, time: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">
                      Priority
                    </label>
                    <select
                      value={newReminder.priority}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          priority: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setShowReminderForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateReminder}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Save Reminder
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reminders Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Reminders</h2>
            <Link
              to={"/reminders"}
              className="text-yellow-600 hover:text-yellow-700 flex items-center gap-1 text-sm"
            >
              <span>View All</span>
              <FaChevronRight className="text-xs" />
            </Link>
          </div>

          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {reminder.title}
                  </h3>
                  <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-yellow-500" />
                      <span>{reminder.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-yellow-500" />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        reminder.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : reminder.priority === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {reminder.priority.charAt(0).toUpperCase() +
                        reminder.priority.slice(1)}{" "}
                      Priority
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FaCheckCircle className="text-lg" />
                  </button>
                </div>
              </div>
            ))}

            {reminders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reminders yet. Click on a date to add a reminder.
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
            <button className="text-pink-600 hover:text-pink-700 flex items-center gap-1 text-sm">
              <span>View All</span>
              <FaChevronRight className="text-xs" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Event Image */}
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={"/images/event-1.png"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                    {event.participants} participants
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FaCalendarAlt className="text-pink-500 mr-2 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FaClock className="text-pink-500 mr-2 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <FaUsers className="text-pink-500 mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {event.status === "upcoming" ? (
                        <span className="flex items-center text-sm text-yellow-600">
                          <FaClock className="mr-1" />
                          <span>Upcoming</span>
                        </span>
                      ) : (
                        <span className="flex items-center text-sm text-green-600">
                          <FaCheckCircle className="mr-1" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>

                    <button className="text-pink-600 text-sm hover:text-pink-700">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Latest Notifications
            </h2>
            <Link to={"/notifications"} className="relative block">
              <FaBell className="text-xl text-gray-600" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-600 text-xs text-white rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
              <div className="font-medium">Booking Confirmed</div>
              <div className="text-sm text-gray-600">
                Conference hall booking confirmed for "Annual Technology
                Conference"
              </div>
              <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <div className="font-medium">Meeting Reminder</div>
              <div className="text-sm text-gray-600">
                Preparation meeting for "Web Development Workshop" tomorrow at 3
                PM
              </div>
              <div className="text-xs text-gray-500 mt-1">5 hours ago</div>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
              <div className="font-medium">New Registrations</div>
              <div className="text-sm text-gray-600">
                5 new participants registered for "Entrepreneurs Meetup"
              </div>
              <div className="text-xs text-gray-500 mt-1">1 day ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
