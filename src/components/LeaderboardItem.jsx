import { FiAward } from 'react-icons/fi';

function LeaderboardItem({ rank, user = {}, score = 0 }) {
  // Badge styling based on rank
  const getRankBadge = (pos) => {
    if (pos === 1) {
      return (
        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-bold text-sm flex items-center justify-center border border-amber-300">
          <FiAward className="w-4 h-4 fill-amber-500" />
        </span>
      );
    }
    if (pos === 2) {
      return (
        <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-sm flex items-center justify-center border border-slate-300">
          2
        </span>
      );
    }
    if (pos === 3) {
      return (
        <span className="w-8 h-8 rounded-full bg-amber-700/10 text-amber-700 font-bold text-sm flex items-center justify-center border border-amber-700/30">
          3
        </span>
      );
    }
    return (
      <span className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 font-semibold text-xs flex items-center justify-center">
        {pos}
      </span>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex-shrink-0">{getRankBadge(rank)}</div>
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`}
          alt={user.name || 'User'}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100"
        />
        <div>
          <p className="font-bold text-slate-800 text-sm">{user.name || 'Pengguna'}</p>
          <p className="text-xs text-slate-400">{user.email || 'Pengguna Terdaftar'}</p>
        </div>
      </div>

      <div className="text-right">
        <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 font-extrabold text-sm rounded-lg border border-blue-100">
          <span>{score}</span>
          <span className="text-xs font-normal text-blue-500">pts</span>
        </span>
      </div>
    </div>
  );
}

export default LeaderboardItem;
