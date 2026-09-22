import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit3 } from 'react-icons/fi';
import { asyncAddThread } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';

function CreateThreadPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const onAddThread = async ({ title, body, category }) => {
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  if (!authUser) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <FiEdit3 className="w-6 h-6 text-blue-600" />
          <span>Buat Diskusi Baru</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Mulai percakapan baru dengan komunitas dan dapatkan tanggapan.
        </p>
      </div>

      {/* Input Form */}
      <ThreadInput addThread={onAddThread} />
    </div>
  );
}

export default CreateThreadPage;
