import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiAward } from 'react-icons/fi';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const sortedLeaderboards = [...leaderboards].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mb-3 shadow-sm">
          <FiAward className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Klasemen Pengguna Aktif
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Pengguna paling berkontribusi dengan skor tertinggi di komunitas diskusi.
        </p>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
          <span>Pengguna</span>
          <span>Skor</span>
        </div>

        {sortedLeaderboards.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            Memuat klasemen pengguna...
          </div>
        ) : (
          <div className="space-y-2 mt-3">
            {sortedLeaderboards.map((item, index) => (
              <LeaderboardItem
                key={item.user.id}
                rank={index + 1}
                user={item.user}
                score={item.score}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardsPage;
