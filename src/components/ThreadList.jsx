import { FiMessageSquare } from 'react-icons/fi';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  if (threads.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <FiMessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-700">Tidak ada diskusi</h3>
        <p className="text-sm text-slate-500 mt-1">
          Belum ada diskusi pada kategori ini atau belum ada diskusi yang dibuat.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

export default ThreadList;
