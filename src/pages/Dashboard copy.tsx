import { useState } from "react";
import {
  FaCalendarPlus,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaFileImport,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeView, setActiveView] = useState("month"); // "month" or "week"

  // Dummy user data
  const userData = {
    name: "محمد أحمد",
    image: "/api/placeholder/48/48",
    stats: {
      upcoming: 8,
      completed: 12,
      participants: 156,
    },
  };

  // Dummy events data
  const upcomingEvents = [
    {
      id: 1,
      title: "مؤتمر التكنولوجيا السنوي",
      date: "25 مارس 2025",
      time: "10:00 صباحًا",
      location: "مركز القاهرة للمؤتمرات",
      participants: 42,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
    {
      id: 2,
      title: "ورشة عمل تطوير الويب",
      date: "2 أبريل 2025",
      time: "2:30 مساءً",
      location: "عبر الإنترنت",
      participants: 28,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
    {
      id: 3,
      title: "لقاء رواد الأعمال",
      date: "10 أبريل 2025",
      time: "4:00 مساءً",
      location: "فندق حياة ريجنسي",
      participants: 35,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
    {
      id: 4,
      title: "معرض المنتجات الجديدة",
      date: "18 أبريل 2025",
      time: "11:00 صباحًا",
      location: "قاعة المعارض الدولية",
      participants: 50,
      status: "upcoming",
      image: "/api/placeholder/80/60",
    },
  ];

  // Calendar generation functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    // Add days from previous month to fill the first week
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        events: [],
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      // Check if there are events on this day
      const events = upcomingEvents.filter((event) => {
        const eventDate = new Date(
          event.date.replace(/(\d+)\s(\w+)\s(\d+)/, "$3-$2-$1")
        );
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      days.push({
        day: i,
        currentMonth: true,
        today:
          new Date().getDate() === i &&
          new Date().getMonth() === month &&
          new Date().getFullYear() === year,
        events: events,
      });
    }

    // Add days from next month to complete the last week
    const daysNeeded = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        day: i,
        currentMonth: false,
        events: [],
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  const weekdays = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Card & Quick Actions */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-grow lg:max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={userData.image}
                  alt="الصورة الشخصية"
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  مرحبًا، {userData.name}
                </h1>
                <p className="text-gray-600">نتمنى لك يومًا سعيدًا</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-pink-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {userData.stats.upcoming}
                </div>
                <div className="text-sm text-gray-600">الفعاليات القادمة</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {userData.stats.completed}
                </div>
                <div className="text-sm text-gray-600">الفعاليات المنتهية</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {userData.stats.participants}
                </div>
                <div className="text-sm text-gray-600">المشاركين</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                إجراءات سريعة
              </h2>
              <Link
                to={"/create-event"}
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition-colors shadow-sm"
              >
                <FaCalendarPlus className="text-lg" />
                <span>إنشاء فعالية جديدة</span>
              </Link>
              <button className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors">
                <FaFileImport className="text-lg" />
                <span>استيراد من التقويم</span>
              </button>
              <button className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors">
                <FaEye className="text-lg" />
                <span>عرض جميع الفعاليات</span>
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-md p-6 flex-grow">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-800">التقويم</h2>
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setActiveView("month")}
                    className={`px-3 py-1 text-sm ${
                      activeView === "month"
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    شهري
                  </button>
                  <button
                    onClick={() => setActiveView("week")}
                    className={`px-3 py-1 text-sm ${
                      activeView === "week"
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    أسبوعي
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
                <span className="font-medium">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 mb-2">
                {weekdays.map((day, index) => (
                  <div
                    key={index}
                    className="text-center font-medium text-gray-600 text-sm py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square border rounded-lg p-1 ${
                      day.currentMonth
                        ? day.today
                          ? "bg-pink-50 border-pink-300"
                          : "bg-white border-gray-200"
                        : "bg-gray-50 border-gray-100 text-gray-400"
                    } hover:border-pink-300 cursor-pointer transition-colors relative`}
                  >
                    <div className="text-sm font-medium">{day.day}</div>

                    {/* Event indicators */}
                    {day.events.length > 0 && (
                      <div className="absolute bottom-1 right-1 left-1 flex justify-center">
                        <div className="flex gap-1">
                          {day.events.slice(0, 2).map((event, idx) => (
                            <div
                              key={idx}
                              className="w-2 h-2 rounded-full bg-pink-500"
                            ></div>
                          ))}
                          {day.events.length > 2 && (
                            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                انقر على أي تاريخ لإنشاء فعالية جديدة
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              الفعاليات القريبة
            </h2>
            <button className="text-pink-600 hover:text-pink-700 flex items-center gap-1 text-sm">
              <span>عرض الكل</span>
              <FaChevronLeft className="text-xs" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Event Image */}
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                    {event.participants} مشارك
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                    {event.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FaCalendarAlt className="text-pink-500 ml-2 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <FaClock className="text-pink-500 ml-2 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <FaUsers className="text-pink-500 ml-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {event.status === "upcoming" ? (
                        <span className="flex items-center text-sm text-yellow-600">
                          <FaClock className="mr-1" />
                          <span>قريبًا</span>
                        </span>
                      ) : (
                        <span className="flex items-center text-sm text-green-600">
                          <FaCheckCircle className="mr-1" />
                          <span>منتهي</span>
                        </span>
                      )}
                    </div>

                    <button className="text-pink-600 text-sm hover:text-pink-700">
                      تفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">آخر التنبيهات</h2>
            <div className="relative">
              <FaBell className="text-xl text-gray-600" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-600 text-xs text-white rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-r-4 border-blue-400 rounded-lg">
              <div className="font-medium">تم تأكيد الحجز</div>
              <div className="text-sm text-gray-600">
                تم تأكيد حجز قاعة المؤتمرات لفعالية "مؤتمر التكنولوجيا السنوي"
              </div>
              <div className="text-xs text-gray-500 mt-1">منذ ساعتين</div>
            </div>

            <div className="p-4 bg-yellow-50 border-r-4 border-yellow-400 rounded-lg">
              <div className="font-medium">تذكير بموعد</div>
              <div className="text-sm text-gray-600">
                لديك اجتماع للتحضير لفعالية "ورشة عمل تطوير الويب" غدًا الساعة 3
                مساءً
              </div>
              <div className="text-xs text-gray-500 mt-1">منذ 5 ساعات</div>
            </div>

            <div className="p-4 bg-green-50 border-r-4 border-green-400 rounded-lg">
              <div className="font-medium">تسجيل جديد</div>
              <div className="text-sm text-gray-600">
                سجل 5 مشاركين جدد في فعالية "لقاء رواد الأعمال"
              </div>
              <div className="text-xs text-gray-500 mt-1">منذ يوم واحد</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
