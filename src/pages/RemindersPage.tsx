import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTrash,
  FaFilter,
  FaSearch,
} from "react-icons/fa";

interface Reminder {
  id: number;
  title: string;
  date: string;
  time: string;
  priority: string;
}

const RemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
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
    {
      id: 3,
      title: "Review project documents",
      date: "April 2, 2025",
      time: "10:30 AM",
      priority: "low",
    },
    {
      id: 4,
      title: "Team strategy meeting",
      date: "April 15, 2025",
      time: "11:00 AM",
      priority: "high",
    },
    {
      id: 5,
      title: "Client follow-up",
      date: "April 20, 2025",
      time: "03:45 PM",
      priority: "medium",
    },
  ]);

  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const handleCompleteReminder = (id: number) => {
    // In a real app, this would likely involve updating the reminder's status
    // For now, we'll just remove it
    handleDeleteReminder(id);
  };

  const filteredReminders = reminders
    .filter(
      (reminder) =>
        (filter === "all" || reminder.priority === filter) &&
        reminder.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by priority (high first), then by date
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (
        priorityOrder[a.priority as keyof typeof priorityOrder] !==
        priorityOrder[b.priority as keyof typeof priorityOrder]
      ) {
        return (
          priorityOrder[b.priority as keyof typeof priorityOrder] -
          priorityOrder[a.priority as keyof typeof priorityOrder]
        );
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            My Reminders
          </h1>

          {/* Search and Filter */}
          <div className="flex mb-6 space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search reminders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Reminders List */}
          {filteredReminders.length > 0 ? (
            <div className="space-y-4">
              {filteredReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-lg flex justify-between items-start hover:shadow-sm transition-shadow"
                >
                  <div className="flex-grow">
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
                    <button
                      onClick={() => handleCompleteReminder(reminder.id)}
                      className="p-2 text-green-400 hover:text-green-600 rounded-full hover:bg-green-50"
                      title="Mark as Complete"
                    >
                      <FaCheckCircle className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      className="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50"
                      title="Delete Reminder"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No reminders found.</p>
              <p className="text-sm mt-2">
                Create a new reminder or adjust your filters.
              </p>
            </div>
          )}

          {/* Reminder Stats */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Total Reminders</div>
              <div className="text-xl font-bold text-gray-800">
                {reminders.length}
              </div>
            </div>
            <div className="flex space-x-4">
              <div>
                <div className="text-sm text-gray-600">High Priority</div>
                <div className="text-red-600 font-bold">
                  {reminders.filter((r) => r.priority === "high").length}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Medium Priority</div>
                <div className="text-yellow-600 font-bold">
                  {reminders.filter((r) => r.priority === "medium").length}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Low Priority</div>
                <div className="text-green-600 font-bold">
                  {reminders.filter((r) => r.priority === "low").length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;
