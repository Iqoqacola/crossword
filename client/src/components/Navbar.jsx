import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/admin/dashboard"
              className="flex-shrink-0 flex items-center gap-2"
            >
              <span className="text-xl font-black tracking-tight text-slate-900 hidden sm:block">
                Crossword<span className="text-indigo-600">Admin</span>
              </span>
            </Link>

            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link
                to="/admin/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/admin/dashboard")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/create"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/admin/create")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                }`}
              >
                Buat Baru
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Administrator
            </span>
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
