import { useState, useEffect } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { Event } from "../types/event";
import EventCard from "../components/ui/EventCard";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Event types from your form
  const eventTypes = [
    { id: "conference", label: "Conference" },
    { id: "workshop", label: "Workshop" },
    { id: "meetup", label: "Meetup" },
    { id: "exhibition", label: "Exhibition" },
    { id: "seminar", label: "Seminar" },
    { id: "other", label: "Other" },
  ];

  // Mock data for events
  useEffect(() => {
    // In a real app, this would be an API call
    const mockEvents: Event[] = [
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
      {
        id: "4",
        title: "AI in Business Seminar",
        description:
          "Learn how AI is transforming business operations and strategy.",
        eventType: "seminar",
        startDate: "2025-04-20",
        startTime: "10:00",
        endDate: "2025-04-20",
        endTime: "15:00",
        location: "Business Center",
        address: "101 Enterprise Dr, Chicago, IL",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 15,
        maxAttendance: 150,
      },
      {
        id: "5",
        title: "Tech Startup Exhibition",
        description: "Showcase of innovative tech startups and their products.",
        eventType: "exhibition",
        startDate: "2025-05-02",
        startTime: "10:00",
        endDate: "2025-05-04",
        endTime: "18:00",
        location: "Convention Center",
        address: "555 Expo St, Seattle, WA",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 100,
        maxAttendance: 1000,
      },
      {
        id: "6",
        title: "Cybersecurity Conference",
        description: "The latest trends and best practices in cybersecurity.",
        eventType: "conference",
        startDate: "2025-05-15",
        startTime: "09:00",
        endDate: "2025-05-17",
        endTime: "17:00",
        location: "Security Institute",
        address: "222 Secure St, Washington, DC",
        privacy: "public",
        imageUrl: "/images/event-1.png",
        attendees: 40,
        maxAttendance: 400,
      },
    ];

    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  // Filter events based on selected type and search term
  useEffect(() => {
    let filtered = events;

    // Filter by event type
    if (selectedType) {
      filtered = filtered.filter((event) => event.eventType === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term)
      );
    }

    // Only show public events
    filtered = filtered.filter((event) => event.privacy === "public");

    setFilteredEvents(filtered);
  }, [events, selectedType, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <title>Events - Eventify</title>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Upcoming Events
          </h1>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center"
              >
                <FaFilter className="mr-2" />
                <span>Filter</span>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 py-2">
                  <div className="px-4 py-2 font-semibold text-gray-700 border-b">
                    Event Type
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setSelectedType("");
                        setIsFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                        selectedType === "" ? "bg-pink-50 text-pink-600" : ""
                      }`}
                    >
                      All Types
                    </button>
                    {eventTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.id);
                          setIsFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                          selectedType === type.id
                            ? "bg-pink-50 text-pink-600"
                            : ""
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedType && (
          <div className="mb-6 flex items-center">
            <span className="text-gray-600">Filtered by:</span>
            <span className="ml-2 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm flex items-center">
              {eventTypes.find((t) => t.id === selectedType)?.label}
              <button
                onClick={() => setSelectedType("")}
                className="ml-2 text-pink-700 hover:text-pink-800"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
