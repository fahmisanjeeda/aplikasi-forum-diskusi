import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FiMessageSquare, FiHash } from 'react-icons/fi';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy = [],
  downVotesBy = [],
  totalComments = 0,
  user = {},
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  // Truncate body for snippet if needed
  const bodySnippet = body.length > 200 ? `${body.substring(0, 200)}...` : body;

  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100 transition duration-200">
      {/* Thread Header: Author & Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`}
            alt={user.name || 'Author'}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 bg-slate-100"
          />
          <div>
            <span className="text-sm font-semibold text-slate-800">{user.name || 'Pengguna Anonim'}</span>
            <span className="text-xs text-slate-400 ml-2">&bull; {postedAt(createdAt)}</span>
          </div>
        </div>

        {category && (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
            <FiHash className="w-3 h-3 text-slate-400" />
            <span>{category}</span>
          </span>
        )}
      </div>

      {/* Thread Title & Snippet */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition mb-2">
          <Link to={`/threads/${id}`} className="line-clamp-2">
            {title}
          </Link>
        </h2>
        <div className="text-sm text-slate-600 line-clamp-3 prose prose-sm max-w-none">
          {parse(bodySnippet)}
        </div>
      </div>

      {/* Thread Footer: Votes & Comments */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />

        <Link
          to={`/threads/${id}`}
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition"
        >
          <FiMessageSquare className="w-4 h-4" />
          <span>{totalComments} Komentar</span>
        </Link>
      </div>
    </article>
  );
}

export default ThreadItem;
