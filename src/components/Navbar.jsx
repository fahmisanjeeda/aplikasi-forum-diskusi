import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMessageSquare, FiAward, FiPlus, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navbar() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <FiMessageSquare className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Ruang<span className="text-blue-600">Diskusi</span></span>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition"
              >
                Threads
              </Link>
              <Link
                to="/leaderboards"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition flex items-center space-x-1.5"
              >
                <FiAward className="w-4 h-4 text-amber-500" />
                <span>Leaderboards</span>
              </Link>
            </nav>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-3">
            {authUser ? (
              <>
                <Link
                  to="/new"
                  className="hidden sm:inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm shadow-blue-600/20 transition"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Buat Diskusi</span>
                </Link>

                <div className="flex items-center space-x-3 pl-2 sm:border-l sm:border-slate-200">
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 bg-slate-100"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{authUser.name}</p>
                    <p className="text-xs text-slate-500">{authUser.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onLogout}
                    title="Keluar"
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  >
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-1.5 text-slate-700 hover:text-blue-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg shadow-sm transition"
                >
                  <FiUserPlus className="w-4 h-4" />
                  <span>Daftar</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
