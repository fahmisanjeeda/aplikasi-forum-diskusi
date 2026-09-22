import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    threadDetailError = null,
    authUser = null,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const onAddComment = (content) => {
    return dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  if (threadDetailError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <FiAlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Diskusi Tidak Ditemukan</h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
          {threadDetailError || 'Thread yang Anda cari tidak ditemukan atau telah dihapus.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    );
  }

  if (!threadDetail) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded-lg w-3/4 mx-auto" />
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
          <div className="h-48 bg-slate-200 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Diskusi</span>
        </Link>
      </div>

      {/* Main Thread Content */}
      <ThreadDetail
        {...threadDetail}
        authUserId={authUser ? authUser.id : null}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />

      {/* Add Comment Input */}
      <CommentInput
        addComment={onAddComment}
        authUser={authUser}
      />

      {/* Comment List */}
      <CommentList
        comments={threadDetail.comments}
        authUserId={authUser ? authUser.id : null}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
      />
    </div>
  );
}

export default DetailPage;
