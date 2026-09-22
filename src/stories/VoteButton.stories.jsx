import VoteButton from '../components/VoteButton';

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: ['user-3'],
    authUserId: null,
    onUpVote: () => console.log('Upvote clicked'),
    onDownVote: () => console.log('Downvote clicked'),
  },
};

export const Upvoted = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
    authUserId: 'user-1',
    onUpVote: () => console.log('Upvote clicked'),
    onDownVote: () => console.log('Downvote clicked'),
  },
};

export const Downvoted = {
  args: {
    upVotesBy: [],
    downVotesBy: ['user-1'],
    authUserId: 'user-1',
    onUpVote: () => console.log('Upvote clicked'),
    onDownVote: () => console.log('Downvote clicked'),
  },
};

