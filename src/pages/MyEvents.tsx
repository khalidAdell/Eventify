import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaEllipsisV,
  FaPlus,
  FaEye,
  FaPencilAlt,
  FaTrashAlt,
  FaChevronDown,
  FaLock,
  FaSortAmountDown,
  FaSortAmountUp,
  FaList,
  FaTh,
} from "react-icons/fa";
import { Event } from "../types/event";
import { Link } from "react-router-dom";

interface ActiveFilters {
  eventType: string[];
  privacy: string[];
  date: "all" | "upcoming" | "past";
}

const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // State for UI controls
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    eventType: [],
    privacy: [],
    date: "all",
  });

  useEffect(() => {
    setEvents([
      {
        id: " 1",
        title: "Tech Conference 2025",
        description:
          "Annual technology conference featuring the latest innovations and trends.",
        eventType: "conference",
        startDate: "2025-04-15",
        startTime: "09:00",
        endDate: "2025-04-17",
        endTime: "18:00",
        location: "Convention Center",
        address: "123 Tech Blvd, San Francisco, CA",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 154,
        maxAttendance: 200,
      },
      {
        id: " 2",
        title: "Leadership Workshop",
        description:
          "Interactive workshop on developing leadership skills in the modern workplace.",
        eventType: "workshop",
        startDate: "2025-05-10",
        startTime: "13:00",
        endDate: "2025-05-10",
        endTime: "17:00",
        location: "Business Center",
        address: "456 Corporate Pkwy, Chicago, IL",
        privacy: "private",
        imageUrl: "/images/event-1.png",
        attendees: 28,
        maxAttendance: 30,
      },
      {
        id: " 3",
        title: "Product Launch: XYZ",
        description:
          "Exclusive product launch event for our new line of innovative solutions.",
        eventType: "exhibition",
        startDate: "2025-06-01",
        startTime: "18:30",
        endDate: "2025-06-01",
        endTime: "21:30",
        location: "Grand Hotel Ballroom",
        address: "789 Luxury Ave, New York, NY",
        privacy: "unlisted",
        imageUrl: "/images/event-1.png",
        attendees: 85,
        maxAttendance: 120,
      },
      {
        id: " 4",
        title: "Annual Developer Meetup",
        description:
          "Networking event for developers to share ideas and collaborate on projects.",
        eventType: "meetup",
        startDate: "2025-07-22",
        startTime: "16:00",
        endDate: "2025-07-22",
        endTime: "20:00",
        location: "Tech Hub",
        address: "101 Coder Lane, Austin, TX",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 67,
        maxAttendance: 100,
      },
      {
        id: " 5",
        title: "Educational Seminar: AI Ethics",
        description:
          "Deep dive into the ethical considerations of artificial intelligence.",
        eventType: "seminar",
        startDate: "2025-08-05",
        startTime: "10:00",
        endDate: "2025-08-05",
        endTime: "16:00",
        location: "University Auditorium",
        address: "202 Academic Dr, Boston, MA",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 112,
        maxAttendance: 150,
      },
      {
        id: " 6",
        title: "Charity Fundraiser Gala",
        description:
          "Annual fundraising event supporting local community initiatives.",
        eventType: "other",
        startDate: "2025-09-18",
        startTime: "19:00",
        endDate: "2025-09-18",
        endTime: "23:00",
        location: "Riverside Gardens",
        address: "303 Charity Way, Seattle, WA",
        privacy: "unlisted",
        imageUrl: "/images/event-1.png",
        attendees: 93,
        maxAttendance: 120,
      },
    ]);
  }, []);
  // State for dropdown menu
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Toggle filter panel
  const toggleFilterPanel = (): void => {
    setFilterOpen(!filterOpen);
  };

  // Toggle dropdown menu for a specific event
  const toggleMenu = (id: string): void => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  // Toggle view mode between grid and list
  const toggleViewMode = (): void => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  // Toggle sort direction
  const toggleSortDirection = (): void => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Toggle filter selection
  const toggleFilter = (
    filterType: keyof ActiveFilters,
    value: string
  ): void => {
    setActiveFilters((prev) => {
      if (filterType === "date") {
        return { ...prev, date: value as "all" | "upcoming" | "past" };
      }

      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return { ...prev, [filterType]: currentFilters };
    });
  };

  const filteredEvents = events.filter((event) => {
    // Search query filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Event type filter
    if (
      activeFilters.eventType.length > 0 &&
      !activeFilters.eventType.includes(event.eventType)
    ) {
      return false;
    }

    // Privacy filter
    if (
      activeFilters.privacy.length > 0 &&
      !activeFilters.privacy.includes(event.privacy)
    ) {
      return false;
    }

    // Date filter
    if (activeFilters.date !== "all") {
      const today = new Date();
      const eventStartDate = new Date(event.startDate);

      if (activeFilters.date === "upcoming" && eventStartDate <= today) {
        return false;
      }

      if (activeFilters.date === "past" && eventStartDate > today) {
        return false;
      }
    }

    return true;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.startDate + "T" + a.startTime);
    const dateB = new Date(b.startDate + "T" + b.startTime);

    return sortDirection === "asc"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate attendance percentage
  const calculateAttendance = (attendees: number, capacity: number): number => {
    return Math.round((attendees / capacity) * 100);
  };

  // Get event type label
  const getEventTypeLabel = (type: string): string => {
    const types: Record<string, string> = {
      conference: "Conference",
      workshop: "Workshop",
      meetup: "Meetup",
      exhibition: "Exhibition",
      seminar: "Seminar",
      other: "Other",
    };
    return types[type] || "Event";
  };

  // Render grid view
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            <div className="relative h-48">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              {event.privacy !== "public" && (
                <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <FaLock className="mr-1" />
                  <span>
                    {event.privacy === "private" ? "Private" : "Unlisted"}
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <div className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                  {getEventTypeLabel(event.eventType)}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="font-semibold text-white text-xl truncate">
                  {event.title}
                </h3>
              </div>
            </div>

            <div className="p-4 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => toggleMenu(event.id)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <FaEllipsisV />
                </button>
                {openMenuId === event.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <Link
                        to="#view"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaEye className="mr-2" />
                        View Event
                      </Link>
                      <Link
                        to="#edit"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaPencilAlt className="mr-2" />
                        Edit Event
                      </Link>
                      <Link
                        to="#delete"
                        className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      >
                        <FaTrashAlt className="mr-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <FaCalendarAlt className="text-pink-500 mr-2 flex-shrink-0" />
                <span>{formatDate(event.startDate)}</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <FaClock className="text-pink-500 mr-2 flex-shrink-0" />
                <span>
                  {event.startTime} - {event.endTime}
                </span>
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-4">
                <FaMapMarkerAlt className="text-pink-500 mr-2 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-2">
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {event.description}
                </p>

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
          </div>
        ))}
      </div>
    );
  };

  // Render list view
  const renderListView = () => {
    return (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Event
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Date & Time
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
              >
                Attendance
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedEvents.map((event) => (
              <tr key={event.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden">
                      <img
                        className="h-10 w-10 object-cover"
                        src={event.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900 flex items-center">
                        {event.title}
                        {event.privacy !== "public" && (
                          <FaLock className="ml-2 text-gray-400 text-xs" />
                        )}
                      </div>
                      <div className="text-gray-500 flex items-center">
                        <span className="bg-pink-100 text-pink-600 text-xs px-2 py-0.5 rounded-full">
                          {getEventTypeLabel(event.eventType)}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                  <div>{formatDate(event.startDate)}</div>
                  <div className="text-gray-400">
                    {event.startTime} - {event.endTime}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">
                  {event.location}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
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
                    <span>
                      {event.attendees}/{event.maxAttendance}
                    </span>
                  </div>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(event.id)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <FaEllipsisV />
                    </button>
                    {openMenuId === event.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <Link
                            to="#view"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <FaEye className="mr-2" />
                            View Event
                          </Link>
                          <Link
                            to="#edit"
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          >
                            <FaPencilAlt className="mr-2" />
                            Edit Event
                          </Link>
                          <Link
                            to="#delete"
                            className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                          >
                            <FaTrashAlt className="mr-2" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My All Events</h1>

          <div className="flex items-center gap-3">
            <Link
              to="/create-event"
              className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              <span>Create Event</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <button
                className="flex items-center gap-2 text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                onClick={toggleFilterPanel}
              >
                <FaFilter className="text-gray-500" />
                <span>Filter</span>
                <FaChevronDown className="text-xs text-gray-500" />
              </button>

              <button
                className="flex items-center gap-2 text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                onClick={toggleSortDirection}
              >
                {sortDirection === "desc" ? (
                  <FaSortAmountDown className="text-gray-500" />
                ) : (
                  <FaSortAmountUp className="text-gray-500" />
                )}
                <span>Date</span>
              </button>

              <button
                className="flex items-center gap-2 text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                onClick={toggleViewMode}
              >
                {viewMode === "grid" ? (
                  <FaList className="text-gray-500" />
                ) : (
                  <FaTh className="text-gray-500" />
                )}
                <span className="hidden sm:inline">
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </span>
              </button>
            </div>
          </div>

          {filterOpen && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Event Type</h3>
                  <div className="space-y-2">
                    {[
                      "conference",
                      "workshop",
                      "meetup",
                      "exhibition",
                      "seminar",
                      "other",
                    ].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-pink-500 focus:ring-pink-500 mr-2"
                          checked={activeFilters.eventType.includes(type)}
                          onChange={() => toggleFilter("eventType", type)}
                        />
                        <span className="text-gray-700">
                          {getEventTypeLabel(type)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Privacy</h3>
                  <div className="space-y-2">
                    {["public", "private", "unlisted"].map((privacy) => (
                      <label key={privacy} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-pink-500 focus:ring-pink-500 mr-2"
                          checked={activeFilters.privacy.includes(privacy)}
                          onChange={() => toggleFilter("privacy", privacy)}
                        />
                        <span className="text-gray-700 capitalize">
                          {privacy}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Date</h3>
                  <div className="space-y-2">
                    {["all", "upcoming", "past"].map((dateFilter) => (
                      <label key={dateFilter} className="flex items-center">
                        <input
                          type="radio"
                          className="text-pink-500 focus:ring-pink-500 mr-2"
                          checked={activeFilters.date === dateFilter}
                          onChange={() => toggleFilter("date", dateFilter)}
                        />
                        <span className="text-gray-700 capitalize">
                          {dateFilter}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="text-gray-600 text-sm">
            Showing {sortedEvents.length}{" "}
            {sortedEvents.length === 1 ? "event" : "events"}
          </div>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-gray-500 mb-2 text-6xl">
              <FaCalendarAlt className="mx-auto opacity-20" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No events found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Link
              to="/create-event"
              className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              <span>Create New Event</span>
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          renderGridView()
        ) : (
          renderListView()
        )}
      </div>
    </div>
  );
};

export default MyEvents;
