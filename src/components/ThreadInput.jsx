import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    try {
      await addThread({
        title: title.trim(),
        category: category.trim(),
        body: body.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="space-y-5">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-1.5">
            Judul Diskusi <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Apa yang ingin Anda diskusikan?"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-1.5">
            Kategori / Tag <span className="text-slate-400 font-normal text-xs">(Opsional)</span>
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Contoh: react, redux, general"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Body Textarea */}
        <div>
          <label htmlFor="body" className="block text-sm font-bold text-slate-700 mb-1.5">
            Konten / Isi Diskusi <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="body"
            rows={7}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Jelaskan topik diskusi Anda secara detail..."
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !body.trim()}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer disabled:cursor-not-allowed"
          >
            <FiSend className="w-4 h-4" />
            <span>{isSubmitting ? 'Menerbitkan...' : 'Terbitkan Diskusi'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
