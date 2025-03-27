const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Eventify</h3>
          <p className="text-gray-400">
            Your ultimate event management solution
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-pink-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Careers
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-pink-400">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Security
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <div className="flex flex-wrap">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg bg-gray-800 text-white flex-1"
            />
            <button className="px-4 py-2 bg-pink-600 rounded-r-lg hover:bg-pink-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
