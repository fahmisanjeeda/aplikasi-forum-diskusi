import { FiMessageSquare } from 'react-icons/fi';
import CommentItem from './CommentItem';

function CommentList({
  comments = [],
  authUserId = null,
  onUpVoteComment,
  onDownVoteComment,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
        <FiMessageSquare className="w-5 h-5 text-blue-600" />
        <span>Komentar ({comments.length})</span>
      </h3>

      {comments.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
          Belum ada komentar untuk diskusi ini. Jadilah yang pertama berkomentar!
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authUserId={authUserId}
              onUpVote={onUpVoteComment}
              onDownVote={onDownVoteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
