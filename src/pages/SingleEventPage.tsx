import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster, toast } from "react-hot-toast";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLock,
  FaUsers,
  FaShareAlt,
  FaTicketAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Types
interface Event {
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurring: boolean;
  recurringType: string;
  location: string;
  address: string;
  privacy: string;
  imageUrl: File | null;
  maxAttendance: string;
}

interface InviteFormData {
  inviteEmails: string;
  inviteMessage?: string;
}

const isEventCreator = false;

// Email validation schema
const inviteSchema = yup.object().shape({
  inviteEmails: yup
    .string()
    .required("Email addresses are required")
    .test("valid-emails", "Invalid email format", (value) => {
      if (!value) return false;
      const emails = value.split(",").map((email) => email.trim());
      return emails.every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }),
  inviteMessage: yup.string().optional(),
});

const SingleEventPage: React.FC = () => {
  // State for registration and sharing
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);

  const event: Event = {
    title: "Global Innovation Summit 2024",
    description:
      "Join us for a groundbreaking three-day conference exploring the latest trends in technology, entrepreneurship, and global innovation. Top industry leaders, startups, and visionaries will share insights, network, and collaborate on solving the world's most pressing challenges.",
    eventType: "conference",
    startDate: "2024-09-15",
    startTime: "09:00",
    endDate: "2024-09-17",
    endTime: "17:00",
    recurring: false,
    recurringType: "none",
    location: "San Francisco Tech Center",
    address: "1 Innovation Way, San Francisco, CA 94105, United States",
    privacy: "public",
    imageUrl: null,
    maxAttendance: "500",
  };

  // Invite form handler with Yup validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: yupResolver(inviteSchema),
  });

  // Registration handler
  const handleRegister = () => {
    setIsRegistered((prev) => {
      return !prev;
    });
    if (isRegistered) {
      toast.error("Successfully unregistered from the event!");
    } else {
      toast.success("Successfully registered for the event!");
    }
  };

  // Share handler
  const handleShare = () => {
    setShowShareModal(true);
  };

  // Social media share functions
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
    );
    toast.success("Event shared on Facebook");
    setShowShareModal(false);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Check out this event: ${event.title}`);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
    );
    toast.success("Event shared on Twitter");
    setShowShareModal(false);
  };

  // Invite submission handler
  const onSubmitInvites = (data: InviteFormData) => {
    const emailList = data.inviteEmails.split(",").map((email) => email.trim());

    // In a real app, this would send invites via backend
    console.log("Sending invites to:", emailList);
    console.log("Invite message:", data.inviteMessage);

    // Reset form and close modal
    reset();
    setShowInviteModal(false);

    toast.success("Invites sent successfully!");
  };

  // Helper function to format date
  const formatDate = (dateString: string, timeString: string): string => {
    const date = new Date(`${dateString}T${timeString}`);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Determine event duration
  const getEventDuration = (): string => {
    const start = new Date(`${event.startDate}T${event.startTime}`);
    const end = new Date(`${event.endDate}T${event.endTime}`);

    const diffMs = end.getTime() - start.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);

    return diffHrs < 24
      ? `${diffHrs.toFixed(1)} hours`
      : `${Math.floor(diffHrs / 24)} days`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#10B981",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "white",
            },
          },
        }}
      />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white rounded-xl p-6 w-96 transform transition-transform duration-300 scale-100">
            <h2 className="text-xl font-bold mb-4">Share Event</h2>
            <div className="flex justify-between space-x-2">
              <button
                onClick={shareOnFacebook}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Facebook
              </button>
              <button
                onClick={shareOnTwitter}
                className="flex-1 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                Twitter
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                  setShowShareModal(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Copy Link
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="animation fixed inset-0 bg-black/60 z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white rounded-xl p-6 w-96 transform transition-transform duration-300 scale-100">
            <h2 className="text-xl font-bold mb-4">Invite Attendees</h2>
            <form onSubmit={handleSubmit(onSubmitInvites)}>
              <div className="mb-4">
                <textarea
                  placeholder="Enter email addresses (comma-separated)"
                  className={`w-full border rounded-lg p-2 mb-1 h-24 ${
                    errors.inviteEmails ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("inviteEmails")}
                />
                {errors.inviteEmails && (
                  <p className="text-red-500 text-sm">
                    {errors.inviteEmails.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Optional invite message"
                  className="w-full border border-gray-300 rounded-lg p-2 h-24"
                  {...register("inviteMessage")}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" /> Send Invites
              </button>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4">
          <Link
            to="/events"
            className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
          >
            &larr; Back to Events
          </Link>
        </div>
        <div className="relative mb-8">
          <div className="h-48 md:h-96 w-full overflow-hidden rounded-xl">
            <img
              src={
                event.imageUrl
                  ? URL.createObjectURL(event.imageUrl)
                  : "/images/event-1.png"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.privacy === "private" && (
              <div className="absolute top-4 right-4 bg-gray-800 text-white text-sm px-3 py-1 rounded-full flex items-center">
                <FaLock className="mr-2" />
                Private Event
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Event Info */}
            <div className="md:col-span-2 order-2 md:order-1">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </h1>
                  <span className="bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded-full">
                    {event.eventType.charAt(0).toUpperCase() +
                      event.eventType.slice(1)}
                  </span>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  {/* Conditional rendering based on user role */}
                  {!isEventCreator ? (
                    <>
                      <button
                        onClick={handleRegister}
                        className={`flex-1 md:flex-none ${
                          isRegistered
                            ? "bg-green-500 text-white"
                            : "bg-pink-600 text-white hover:bg-pink-700"
                        } px-4 py-2 rounded-lg flex items-center justify-center`}
                      >
                        <FaTicketAlt className="mr-2" />
                        {isRegistered ? "Registered" : "Register"}
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex-1 md:flex-none bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                      >
                        <FaShareAlt className="mr-2" /> Share
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="flex-1 md:flex-none bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center justify-center"
                    >
                      <FaEnvelope className="mr-2" /> Invite Attendees
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="text-pink-500 mr-3 text-xl" />
                  <div>
                    <p className="font-medium">
                      {formatDate(event.startDate, event.startTime)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.startTime} - {event.endTime}
                      <span className="ml-2 block md:inline">
                        ({getEventDuration()})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="text-pink-500 mr-3 text-xl" />
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-gray-500">{event.address}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaUsers className="text-pink-500 mr-3 text-xl" />
                  <div>
                    <p className="font-medium">Max Attendance</p>
                    <p className="text-sm text-gray-500">
                      {event.maxAttendance} participants
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  About this Event
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {event.recurring && (
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Recurring Event
                  </h3>
                  <p className="text-blue-600 text-sm">
                    This is a {event.recurringType} recurring event
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="bg-gray-100 rounded-xl p-6 h-fit order-1 md:order-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Event Details
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Event Type</span>
                  <span className="font-medium">{event.eventType}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Privacy</span>
                  <span className="font-medium capitalize">
                    {event.privacy}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium">{event.startDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">End Date</span>
                  <span className="font-medium">{event.endDate}</span>
                </li>
                {event.recurring && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Recurrence</span>
                    <span className="font-medium capitalize">
                      {event.recurringType}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
