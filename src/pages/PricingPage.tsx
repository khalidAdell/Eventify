import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCrown,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const pricingPlans = [
    {
      name: "Basic",
      icon: <FaUsers className="text-gray-500" />,
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Create up to 3 events",
        "Basic event management",
        "Standard support",
        "Limited analytics",
      ],
      unavailableFeatures: [
        "Advanced reporting",
        "Team collaboration",
        "Priority support",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      icon: <FaCrown className="text-pink-500" />,
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Unlimited event creation",
        "Advanced event management",
        "Detailed analytics",
        "Team collaboration",
        "Priority support",
      ],
      unavailableFeatures: ["Enterprise integrations", "Custom branding"],
      recommended: true,
    },
    {
      name: "Enterprise",
      icon: <FaChartLine className="text-blue-500" />,
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Unlimited event creation",
        "Advanced event management",
        "Detailed analytics",
        "Team collaboration",
        "Priority support",
        "Enterprise integrations",
        "Custom branding",
        "Dedicated account manager",
      ],
      unavailableFeatures: [],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <title>Pricing - Eventify</title>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Event Management Pricing
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your event management needs. Flexible
            pricing to support your growth and simplify your event organization.
          </p>

          <div className="flex justify-center mt-8">
            <div className="bg-gray-200 rounded-full p-1 flex items-center">
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly
                <span className="text-xs bg-green-500 text-white ml-2 px-2 py-1 rounded-full">
                  Save 10%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-md p-6 transform transition-all ${
                plan.recommended
                  ? "border-2 border-pink-500 scale-105"
                  : "border border-gray-200 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center mb-4">
                {plan.icon}
                <h2 className="text-xl font-bold ml-3 text-gray-800">
                  {plan.name}
                </h2>
                {plan.recommended && (
                  <span className="ml-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  $
                  {billingCycle === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
                  <span className="text-sm text-gray-500 ml-1">
                    / {billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-green-600">
                    Save 10% compared to monthly billing
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3">
                  What's Included
                </h3>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-600"
                    >
                      <FaCheckCircle className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                  {plan.unavailableFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-400 line-through"
                    >
                      <FaTimesCircle className="text-gray-300 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3 rounded-lg transition-colors ${
                  plan.recommended
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {plan.monthlyPrice === 0 ? "Get Started" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Have unique event management requirements? Our enterprise team is
              ready to create a tailored solution that fits your specific needs.
            </p>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
