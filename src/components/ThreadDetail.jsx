import parse from 'html-react-parser';
import { FiHash, FiClock } from 'react-icons/fi';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  owner = {},
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
      {/* Thread Category Tag */}
      {category && (
        <div className="mb-3">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <FiHash className="w-3.5 h-3.5" />
            <span>{category}</span>
          </span>
        </div>
      )}

      {/* Thread Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
        {title}
      </h1>

      {/* Author and Date Information */}
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-100 mb-6">
        <img
          src={owner.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name || 'User')}`}
          alt={owner.name || 'Pembuat Diskusi'}
          className="w-11 h-11 rounded-full object-cover border border-slate-200 bg-slate-100"
        />
        <div>
          <p className="text-sm font-bold text-slate-900">{owner.name || 'Pengguna Anonim'}</p>
          <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
            <FiClock className="w-3.5 h-3.5" />
            <span>Dibuat {postedAt(createdAt)}</span>
          </p>
        </div>
      </div>

      {/* Thread Body */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed mb-6">
        {parse(body)}
      </div>

      {/* Vote Action */}
      <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-medium">Beri tanggapan:</span>
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
    </article>
  );
}

export default ThreadDetail;
