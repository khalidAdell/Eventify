import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaLock,
  FaTag,
  FaChevronRight,
  FaChevronLeft,
  FaPlus,
  FaRegSave,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import LocationStep from "../components/event-steps/LocationStep";
import SettingStep from "../components/event-steps/SettingStep";
import { FormData } from "../types/event";

const CreateEventForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    eventType: "conference",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    recurring: false,
    recurringType: "none",
    location: "",
    address: "",
    privacy: "public",
    image: null,
    maxAttendance: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Event types
  const eventTypes = [
    { id: "conference", label: "Conference" },
    { id: "workshop", label: "Workshop" },
    { id: "meetup", label: "Meetup" },
    { id: "exhibition", label: "Exhibition" },
    { id: "seminar", label: "Seminar" },
    { id: "other", label: "Other" },
  ];

  const renderProgressBar = () => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-pink-600 h-2 rounded-full"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>
    );
  };

  const renderStepIndicators = () => {
    return (
      <div className="flex justify-between mx-auto w-full max-w-xl mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? "bg-pink-600 text-white"
                  : step < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? "✓" : step}
            </div>
            <div className="text-xs mt-1 text-gray-600">
              {step === 1 && "Basic Info"}
              {step === 2 && "Date & Time"}
              {step === 3 && "Location"}
              {step === 4 && "Settings"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render form steps
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Basic Information
            </h2>

            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Event Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Event Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a detailed description of the event..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent min-h-32"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="eventType" className="block text-gray-700 mb-2">
                Event Type*
              </label>
              <div className="grid grid-cols-3 gap-3">
                {eventTypes.map((type) => (
                  <label
                    key={type.id}
                    className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                      formData.eventType === type.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="eventType"
                      value={type.id}
                      checked={formData.eventType === type.id}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <FaTag
                      className={`mr-2 ${
                        formData.eventType === type.id
                          ? "text-pink-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="maxAttendance"
                className="block text-gray-700 mb-2"
              >
                Max Attendance*
              </label>
              <input
                type="text"
                id="maxAttendance"
                name="maxAttendance"
                value={formData.maxAttendance}
                onChange={handleInputChange}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.currentTarget;
                  target.value = target.value.replace(/\D/g, ""); // Remove non-numeric characters
                }}
                placeholder="Enter maximum number of attendees..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Date & Time Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-gray-700 mb-2">
                  Start Date*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="startTime" className="block text-gray-700 mb-2">
                  Start Time*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-gray-700 mb-2">
                  End Date*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endTime" className="block text-gray-700 mb-2">
                  End Time*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="recurring"
                  name="recurring"
                  checked={formData.recurring}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="recurring" className="ml-2 text-gray-700">
                  Recurring Event
                </label>
              </div>

              {formData.recurring && (
                <div>
                  <label
                    htmlFor="recurringType"
                    className="block text-gray-700 mb-2"
                  >
                    Recurrence Pattern
                  </label>
                  <select
                    id="recurringType"
                    name="recurringType"
                    value={formData.recurringType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <LocationStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );

      case 4:
        return (
          <SettingStep
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        );

      default:
        return null;
    }
  };

  // Live preview
  const renderPreview = () => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-40 bg-gray-200">
          <img
            src={
              formData.image
                ? URL.createObjectURL(formData.image)
                : "/images/event-1.png"
            }
            alt="Event Image"
            className="w-full h-full object-cover"
          />
          {formData.privacy === "private" && (
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <FaLock className="mr-1" />
              <span>Private</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-xl mb-2">
            {formData.title || "Event Title"}
          </h3>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaCalendarAlt className="text-pink-500 mr-2 flex-shrink-0" />
            <span>
              {formData.startDate
                ? new Date(formData.startDate).toLocaleDateString()
                : "Date"}
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaClock className="text-pink-500 mr-2 flex-shrink-0" />
            <span>{formData.startTime || "Time"}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-3">
            <FaMapMarkerAlt className="text-pink-500 mr-2 flex-shrink-0" />
            <span>{formData.location || "Location"}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 mb-3">
            <p className="text-gray-600 text-sm line-clamp-3">
              {formData.description || "Event description will appear here..."}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
              {eventTypes.find((t) => t.id === formData.eventType)?.label ||
                "Event Type"}
            </span>

            <button className="text-pink-600 text-sm hover:text-pink-700 flex items-center">
              <span>Details</span>
              <FaChevronRight className="ml-1 text-xs" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create New Event</h1>
          <div className="flex gap-2">
            <button className="bg-white text-gray-600 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FaTimes />
              <span>Cancel</span>
            </button>
            <button className="bg-white text-gray-600 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FaRegSave />
              <span>Save as Draft</span>
            </button>
          </div>
        </div>

        {renderProgressBar()}
        {renderStepIndicators()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <form className="space-y-6">
              {renderFormStep()}

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-white text-gray-600 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <FaChevronLeft className="text-sm" />
                    <span>Previous</span>
                  </button>
                )}

                <div className="ml-auto">
                  {currentStep < 4 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>Next</span>
                      <FaChevronRight className="text-sm" />
                    </button>
                  )}
                  {currentStep >= 4 && (
                    <button
                      type="submit"
                      className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>Create Event</span>
                      <FaPlus className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Preview</h2>
              <div className="text-sm text-gray-600 flex items-center">
                <FaEye className="mr-1" />
                <span>Live Preview</span>
              </div>
            </div>

            {renderPreview()}

            <div className="mt-6 text-sm text-gray-600">
              <p className="flex items-center">
                <span>
                  This is a preview of how the event will appear to users.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
