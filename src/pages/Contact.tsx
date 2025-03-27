import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement actual form submission logic
      alert("Message sent successfully!");
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <title>Contact - Eventify</title>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Company Details */}
              <div className="bg-pink-50 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-pink-100 rounded-full p-3">
                  <FaMapMarkerAlt className="text-pink-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Our Address</h3>
                  <p className="text-gray-600">
                    123 Event Plaza, Business District, Cairo, Egypt
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <FaPhone className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone Number</h3>
                  <p className="text-gray-600">+20 (123) 456-7890</p>
                  <p className="text-gray-600">+20 (987) 654-3210</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <FaEnvelope className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Address</h3>
                  <p className="text-gray-600">support@eventmanager.com</p>
                  <p className="text-gray-600">contact@eventmanager.com</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 flex justify-center space-x-6">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaFacebook className="text-3xl" />
                </a>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <FaTwitter className="text-3xl" />
                </a>
                <a
                  href="#"
                  className="text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <FaInstagram className="text-3xl" />
                </a>
                <a
                  href="#"
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.name
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-pink-200"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.email
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-pink-200"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 ${
                      formErrors.phone
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-pink-200"
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Subject Input */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    formErrors.subject
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                  placeholder="Enter message subject"
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    formErrors.message
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-pink-200"
                  }`}
                  placeholder="Write your message here..."
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
