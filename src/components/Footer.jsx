import { FiHeart } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
        <p className="flex items-center justify-center gap-1">
          Dibuat dengan <FiHeart className="w-4 h-4 text-rose-500 fill-rose-500 inline" /> untuk Submission Dicoding React Expert
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Aplikasi Forum Diskusi &bull; Dicoding Forum API
        </p>
      </div>
    </footer>
  );
}

export default Footer;
