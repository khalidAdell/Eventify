import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaImage,
  FaLock,
  FaTag,
  FaChevronRight,
  FaChevronLeft,
  FaPlus,
  FaVideo,
  FaRegSave,
  FaEye,
  FaTimes,
} from "react-icons/fa";

const CreateEventForm = () => {
  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
    templateId: "default",
  });

  // State for rich text editor controls
  const [richTextControls, setRichTextControls] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    { id: "conference", label: "مؤتمر" },
    { id: "workshop", label: "ورشة عمل" },
    { id: "meetup", label: "لقاء" },
    { id: "exhibition", label: "معرض" },
    { id: "seminar", label: "ندوة" },
    { id: "other", label: "أخرى" },
  ];

  // Template options
  const templates = [
    { id: "default", label: "القالب الافتراضي" },
    { id: "business", label: "قالب الأعمال" },
    { id: "education", label: "قالب تعليمي" },
    { id: "social", label: "قالب اجتماعي" },
  ];

  // Progress indicators
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
              {step === 1 && "المعلومات الأساسية"}
              {step === 2 && "التفاصيل الزمنية"}
              {step === 3 && "الموقع"}
              {step === 4 && "الإعدادات"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Rich text editor buttons
  const renderRichTextControls = () => {
    return (
      <div className="flex border-b border-gray-300 pb-2 mb-2">
        <button
          type="button"
          onClick={() =>
            setRichTextControls({
              ...richTextControls,
              bold: !richTextControls.bold,
            })
          }
          className={`p-2 mr-1 rounded ${
            richTextControls.bold ? "bg-gray-200" : ""
          }`}
        >
          <span className="font-bold">ع</span>
        </button>
        <button
          type="button"
          onClick={() =>
            setRichTextControls({
              ...richTextControls,
              italic: !richTextControls.italic,
            })
          }
          className={`p-2 mr-1 rounded ${
            richTextControls.italic ? "bg-gray-200" : ""
          }`}
        >
          <span className="italic">ع</span>
        </button>
        <button
          type="button"
          onClick={() =>
            setRichTextControls({
              ...richTextControls,
              underline: !richTextControls.underline,
            })
          }
          className={`p-2 mr-1 rounded ${
            richTextControls.underline ? "bg-gray-200" : ""
          }`}
        >
          <span className="underline">ع</span>
        </button>
        <div className="border-r border-gray-300 mx-2"></div>
        <button type="button" className="p-2 mr-1 rounded">
          <FaImage className="text-gray-600" />
        </button>
        <button type="button" className="p-2 mr-1 rounded">
          <FaVideo className="text-gray-600" />
        </button>
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
              المعلومات الأساسية
            </h2>

            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">
                عنوان الفعالية*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="أدخل عنوان الفعالية..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 mb-2">
                وصف الفعالية*
              </label>
              {renderRichTextControls()}
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="اكتب وصفًا تفصيليًا للفعالية..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent min-h-32"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="eventType" className="block text-gray-700 mb-2">
                نوع الفعالية*
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              التفاصيل الزمنية
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-gray-700 mb-2">
                  تاريخ البدء*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="startTime" className="block text-gray-700 mb-2">
                  وقت البدء*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-gray-700 mb-2">
                  تاريخ الانتهاء*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endTime" className="block text-gray-700 mb-2">
                  وقت الانتهاء*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                <label htmlFor="recurring" className="mr-2 text-gray-700">
                  فعالية متكررة
                </label>
              </div>

              {formData.recurring && (
                <div>
                  <label
                    htmlFor="recurringType"
                    className="block text-gray-700 mb-2"
                  >
                    نمط التكرار
                  </label>
                  <select
                    id="recurringType"
                    name="recurringType"
                    value={formData.recurringType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                    <option value="custom">مخصص</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">الموقع</h2>

            <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">الخريطة التفاعلية</h3>
                <button
                  type="button"
                  className="text-pink-600 text-sm hover:underline"
                >
                  تحديد على الخريطة
                </button>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                <img
                  src="/api/placeholder/400/250"
                  alt="خريطة تفاعلية"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-700 mb-2">
                اسم الموقع*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="مثال: فندق حياة ريجنسي، قاعة المؤتمرات"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700 mb-2">
                العنوان التفصيلي*
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="العنوان الكامل للموقع..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="text-pink-500 ml-2" />
              <span>
                يمكنك أيضًا استخدام "الموقع الحالي" أو اختيار من المواقع
                المحفوظة مسبقًا
              </span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">الإعدادات</h2>

            <div>
              <label className="block text-gray-700 mb-2">
                خصوصية الفعالية*
              </label>
              <div className="space-y-3">
                <label
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    formData.privacy === "public"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={formData.privacy === "public"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      formData.privacy === "public"
                        ? "border-pink-500"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.privacy === "public" && (
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">عام</div>
                    <div className="text-sm text-gray-600">
                      الفعالية مرئية للجميع ويمكن لأي شخص التسجيل
                    </div>
                  </div>
                </label>

                <label
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    formData.privacy === "private"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    checked={formData.privacy === "private"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      formData.privacy === "private"
                        ? "border-pink-500"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.privacy === "private" && (
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">خاص</div>
                    <div className="text-sm text-gray-600">
                      الفعالية مرئية فقط للمدعوين
                    </div>
                  </div>
                </label>

                <label
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    formData.privacy === "unlisted"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="privacy"
                    value="unlisted"
                    checked={formData.privacy === "unlisted"}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      formData.privacy === "unlisted"
                        ? "border-pink-500"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.privacy === "unlisted" && (
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">غير مدرج</div>
                    <div className="text-sm text-gray-600">
                      الفعالية مرئية فقط لمن يملك الرابط
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">صورة الفعالية</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                <FaImage className="text-4xl text-gray-400 mb-2" />
                <div className="text-sm text-gray-600 mb-3">
                  اسحب وأفلت الصورة هنا أو
                </div>
                <button
                  type="button"
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
                >
                  تحميل صورة
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="templateId" className="block text-gray-700 mb-2">
                قالب الفعالية
              </label>
              <select
                id="templateId"
                name="templateId"
                value={formData.templateId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            src="/api/placeholder/400/160"
            alt="صورة الفعالية"
            className="w-full h-full object-cover"
          />
          {formData.privacy === "private" && (
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <FaLock className="mr-1" />
              <span>خاص</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-xl mb-2">
            {formData.title || "عنوان الفعالية"}
          </h3>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaCalendarAlt className="text-pink-500 ml-2 flex-shrink-0" />
            <span>
              {formData.startDate
                ? new Date(formData.startDate).toLocaleDateString("ar-SA")
                : "التاريخ"}
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaClock className="text-pink-500 ml-2 flex-shrink-0" />
            <span>{formData.startTime || "الوقت"}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-3">
            <FaMapMarkerAlt className="text-pink-500 ml-2 flex-shrink-0" />
            <span>{formData.location || "الموقع"}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 mb-3">
            <p className="text-gray-600 text-sm line-clamp-3">
              {formData.description || "وصف الفعالية سيظهر هنا..."}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
              {eventTypes.find((t) => t.id === formData.eventType)?.label ||
                "نوع الفعالية"}
            </span>

            <button className="text-pink-600 text-sm hover:text-pink-700 flex items-center">
              <span>تفاصيل</span>
              <FaChevronLeft className="mr-1 text-xs" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            إنشاء فعالية جديدة
          </h1>
          <div className="flex gap-2">
            <button className="bg-white text-gray-600 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FaTimes />
              <span>إلغاء</span>
            </button>
            <button className="bg-white text-gray-600 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FaRegSave />
              <span>حفظ كمسودة</span>
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
                    <FaChevronRight className="text-sm" />
                    <span>السابق</span>
                  </button>
                )}

                <div className="mr-auto">
                  {currentStep < 4 && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>التالي</span>
                      <FaChevronLeft className="text-sm" />
                    </button>
                  )}
                  {currentStep >= 4 && (
                    <button
                      type="submit"
                      className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                      <span>إنشاء الفعالية</span>
                      <FaPlus className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">معاينة</h2>
              <div className="text-sm text-gray-600 flex items-center">
                <FaEye className="ml-1" />
                <span>معاينة حية</span>
              </div>
            </div>

            {renderPreview()}

            <div className="mt-6 text-sm text-gray-600">
              <p className="flex items-center">
                <FaInfoCircle className="ml-1 text-pink-500" />
                <span>هذه معاينة لكيفية ظهور الفعالية للمستخدمين.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// For missing icon
const FaInfoCircle = (props) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
  </svg>
);

export default CreateEventForm;
