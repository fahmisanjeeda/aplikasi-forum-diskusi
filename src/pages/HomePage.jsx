import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrendingUp } from 'react-icons/fi';
import {
  asyncPopulateUsersAndThreads,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from '../states/threads/action';
import CategoryFilter from '../components/CategoryFilter';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  // Combine thread with its creator user info
  const threadList = threads.map((thread) => ({
    ...thread,
    user:
      users.find((user) => user.id === thread.ownerId)
      || (authUser && authUser.id === thread.ownerId ? authUser : {}),
  }));

  // Unique categories list
  const categories = [
    ...new Set(threads.map((thread) => thread.category).filter(Boolean)),
  ];

  // Filter threads by selected category
  const filteredThreads = selectedCategory
    ? threadList.filter((thread) => thread.category === selectedCategory)
    : threadList;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero / Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FiTrendingUp className="w-7 h-7 text-blue-600" />
            <span>Diskusi Terhangat</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Temukan topik menarik, tanyakan pertanyaan, atau bagikan wawasan Anda.
          </p>
        </div>

        <Link
          to="/new"
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition flex-shrink-0"
        >
          <FiPlus className="w-4 h-4" />
          <span>Buat Diskusi</span>
        </Link>
      </div>

      {/* Category Filter Pills */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Thread List */}
      <ThreadList
        threads={filteredThreads}
        authUserId={authUser ? authUser.id : null}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    </div>
  );
}

export default HomePage;
