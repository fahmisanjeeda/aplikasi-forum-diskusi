import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="sticky top-0 z-50">
      <LoadingBar className="h-1 bg-blue-600 shadow-sm transition-all" />
    </div>
  );
}

export default Loading;
