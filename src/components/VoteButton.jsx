import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

function VoteButton({
  upVotesBy = [],
  downVotesBy = [],
  authUserId = null,
  onUpVote,
  onDownVote,
}) {
  const isUpvoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownvoted = authUserId ? downVotesBy.includes(authUserId) : false;

  return (
    <div className="flex items-center space-x-1.5 text-xs text-slate-600">
      {/* Upvote Button */}
      <button
        type="button"
        onClick={onUpVote}
        className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border transition ${
          isUpvoted
            ? 'bg-blue-50 border-blue-200 text-blue-600 font-semibold shadow-sm'
            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
        }`}
        title={isUpvoted ? 'Batalkan Upvote' : 'Upvote'}
      >
        <FiThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-blue-600' : ''}`} />
        <span>{upVotesBy.length}</span>
      </button>

      {/* Downvote Button */}
      <button
        type="button"
        onClick={onDownVote}
        className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border transition ${
          isDownvoted
            ? 'bg-rose-50 border-rose-200 text-rose-600 font-semibold shadow-sm'
            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
        }`}
        title={isDownvoted ? 'Batalkan Downvote' : 'Downvote'}
      >
        <FiThumbsDown className={`w-3.5 h-3.5 ${isDownvoted ? 'fill-rose-600' : ''}`} />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default VoteButton;
