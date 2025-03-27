import React, { useState } from "react";
import { FaCheckCircle, FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedEvent?: {
    title: string;
    date: string;
    time: string;
  };
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message:
        'Conference hall booking confirmed for "Annual Technology Conference"',
      timestamp: "2 hours ago",
      read: false,
      relatedEvent: {
        title: "Annual Technology Conference",
        date: "March 25, 2025",
        time: "10:00 AM",
      },
    },
    {
      id: 2,
      type: "reminder",
      title: "Meeting Reminder",
      message:
        'Preparation meeting for "Web Development Workshop" tomorrow at 3 PM',
      timestamp: "5 hours ago",
      read: false,
      relatedEvent: {
        title: "Web Development Workshop",
        date: "April 2, 2025",
        time: "2:30 PM",
      },
    },
    {
      id: 3,
      type: "registration",
      title: "New Registrations",
      message: '5 new participants registered for "Entrepreneurs Meetup"',
      timestamp: "1 day ago",
      read: true,
      relatedEvent: {
        title: "Entrepreneurs Meetup",
        date: "April 10, 2025",
        time: "4:00 PM",
      },
    },
    {
      id: 4,
      type: "update",
      title: "Event Details Updated",
      message: 'Location changed for "New Products Exhibition"',
      timestamp: "2 days ago",
      read: true,
      relatedEvent: {
        title: "New Products Exhibition",
        date: "April 18, 2025",
        time: "11:00 AM",
      },
    },
  ]);

  const [filter, setFilter] = useState<string | null>(null);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking":
        return "pink";
      case "reminder":
        return "yellow";
      case "registration":
        return "green";
      case "update":
        return "pink";
      default:
        return "gray";
    }
  };

  const filteredNotifications = filter
    ? notifications.filter((notification) => notification.type === filter)
    : notifications;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="ltr">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Notifications
              </h1>
              <p className="text-gray-600 text-sm">
                You have {notifications.filter((n) => !n.read).length} unread
                notifications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Filters */}
              <div className="flex space-x-2">
                {["booking", "reminder", "registration", "update"].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setFilter(filter === type ? null : type)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filter === type
                          ? `bg-${getNotificationColor(type)}-500 text-white`
                          : `bg-gray-100 text-gray-600 hover:bg-${getNotificationColor(
                              type
                            )}-100`
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>

              {/* Mark All as Read */}
              <button
                onClick={markAllAsRead}
                className="text-pink-600 hover:text-pink-700 flex items-center gap-1 text-sm"
              >
                <FaCheckCircle />
                <span>Mark All Read</span>
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notifications to display
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 rounded-lg relative 
                    ${
                      !notification.read
                        ? "bg-gray-50 border-pink-400"
                        : "bg-white border-gray-200"
                    }
                    hover:shadow-sm transition-all`}
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>

                  {/* Notification Content */}
                  <div
                    className={`border-l-4 border-${getNotificationColor(
                      notification.type
                    )}-400 pl-4`}
                  >
                    <div className="font-medium text-gray-800">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </div>

                    {/* Related Event Details */}
                    {notification.relatedEvent && (
                      <div className="mt-2 bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center text-gray-600 text-sm mb-1">
                          <FaCalendarAlt className="mr-2 text-pink-500" />
                          <span>{notification.relatedEvent.title}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaClock className="mr-2 text-pink-500" />
                          <span>
                            {notification.relatedEvent.date} at{" "}
                            {notification.relatedEvent.time}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-2">
                      {notification.timestamp}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
