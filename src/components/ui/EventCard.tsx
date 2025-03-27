import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "../../types/event";
import { Link } from "react-router-dom";

const EventCard = ({ event }: { event: Event }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAttendance = (attendees: number, capacity: number): number => {
    return Math.round((attendees / capacity) * 100);
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          {event.eventType}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-800 text-xl mb-3">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <FaCalendarAlt className="text-pink-500 mr-2 flex-shrink-0" />
            <span>{formatDate(event.startDate)}</span>
            {event.startDate !== event.endDate && (
              <span> - {formatDate(event.endDate)}</span>
            )}
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <FaClock className="text-pink-500 mr-2 flex-shrink-0" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-pink-500 mr-2 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">
            {event.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-2/3">
            <div className="text-xs text-gray-600 mb-1">Attendance</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full"
                style={{
                  width: `${calculateAttendance(
                    event.attendees,
                    event.maxAttendance
                  )}%`,
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {event.attendees}/{event.maxAttendance} registered
            </div>
          </div>

          <Link
            to="/event"
            className="text-pink-600 text-sm hover:text-pink-700 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
