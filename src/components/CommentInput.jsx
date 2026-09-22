import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiSend, FiLogIn } from 'react-icons/fi';

function CommentInput({ addComment, authUser = null }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment(content);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authUser) {
    return (
      <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 text-center mb-8">
        <h4 className="font-semibold text-slate-800 mb-1">Ingin ikut berdiskusi?</h4>
        <p className="text-sm text-slate-600 mb-4">
          Silakan masuk terlebih dahulu untuk menuliskan tanggapan atau komentar Anda.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition"
        >
          <FiLogIn className="w-4 h-4" />
          <span>Masuk untuk Berkomentar</span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm">
      <h4 className="font-bold text-slate-800 text-sm mb-3">Tulis Balasan / Komentar</h4>
      <textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tuliskan komentar atau tanggapan Anda di sini..."
        required
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-blue-500/20 transition cursor-pointer disabled:cursor-not-allowed"
        >
          <FiSend className="w-4 h-4" />
          <span>{isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}</span>
        </button>
      </div>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  authUser: PropTypes.object,
};

export default CommentInput;
