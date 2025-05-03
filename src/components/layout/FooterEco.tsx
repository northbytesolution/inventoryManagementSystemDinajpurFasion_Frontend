

const FooterEco = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {/* Logo & Tagline */}
          <div>
            <img
              src="/bicycleStore_transparent.png"
              alt="Logo"
              className="h-12 mx-auto md:mx-0 mb-2"
            />
            <p>Quality you can trust</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-2">Newsletter</h3>
            <input
              type="email"
              placeholder="Enter email"
              className="p-2 w-full text-black border rounded"
            />
            <button className="bg-blue-500 w-full py-2 mt-2 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-blue-400">
                FB
              </a>
              <a href="#" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-sm mt-6 border-t border-gray-600 pt-4">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default FooterEco;
