import parse from 'html-react-parser';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function CommentItem({
  id,
  content,
  createdAt,
  owner = {},
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 transition">
      {/* Comment Header: Author & Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={owner.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name || 'User')}`}
            alt={owner.name || 'Komentator'}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 bg-slate-100"
          />
          <div>
            <span className="text-sm font-semibold text-slate-800">{owner.name || 'Pengguna Anonim'}</span>
            <span className="text-xs text-slate-400 ml-2">&bull; {postedAt(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Comment Content */}
      <div className="prose prose-sm max-w-none text-slate-700 mb-3">
        {parse(content)}
      </div>

      {/* Comment Votes */}
      <div className="pt-2 border-t border-slate-100 flex items-center">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
      </div>
    </div>
  );
}

export default CommentItem;
